import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import { TaskShareEntity } from '../Domain/taskShare.entity.js'

export class TaskShareUseCases {
  constructor(taskshareRepository, usersUseCases, taskUseCases) {
    this.taskshareRepository = taskshareRepository
    this.usersUseCases = usersUseCases
    this.taskUseCases = taskUseCases
    this.uuidUtils = new UUIDUtils()
    this.passwordUtils = new PasswordUtil()
  }

  getTaskShared = async (params) => {
    try {
      const TasksShared = await this.taskshareRepository.getAllTasksIDS(params)
      const TasksSharedUUID = await this.resolveArrayPromises(
        await this.getTaskSharedPromises(TasksShared)
      )
      return { Total: TasksSharedUUID.length, TasksSharedUUID }
    } catch (error) {
      return new Error('Error Inesperado')
    }
  }

  shareTask = async ({ usersUUIDS, UserResponsible, task }) => {
    try {
      const foundTask = await this.taskUseCases.findTask(task)
      const sharedTask = await this.getSharedTaskResolved(
        usersUUIDS,
        UserResponsible,
        foundTask
      )
      if (Array.isArray(sharedTask) && sharedTask.length > 0)
        return {
          Message: `Tarea:${task} compartida con ${sharedTask.length} Usuarios`,
          sharedTask
        }
      return new Error("No se compartio correcamente la terea")
    } catch (error) {
      return new Error('No se Puedo Compartir la Tarea ')
    }
  }

  getTaskSharedPromises = async (TasksShared) => {
    try {
      const TasksDataArray = TasksShared.map(async (Task) => {
        return await this.taskUseCases.findTask(Task.taskUUID)
      })
      return TasksDataArray
    } catch (error) {
      return new Error('Error Inesperado')
    }
  }

  resolveArrayPromises = async (ArrayPromises) => {
    try {
      const PromiseResolved = await Promise.all(ArrayPromises)
        .then((values) => values)
        .catch((e) => e)

      if (PromiseResolved instanceof Error) throw new Error('Error Inesperado')
      return PromiseResolved
    } catch (error) {
      throw new Error('Error Inesperado')
    }
  }

  getSharedTaskResolved = async (usersUUIDSArray, UserResponsible, Task) => {
    try {
      const sharedTaskPromises = usersUUIDSArray.map(async (useruuid) => {
        const user = await this.usersUseCases.findUser(useruuid)
        const isReponsible = useruuid === UserResponsible
        const taskUserShared = await this.shareTaskperUser(
          user.uuid,
          isReponsible,
          Task.uuid
        )
        if (taskUserShared instanceof Error)
          throw new Error(
            'No se logro compartir la tearea con el usuario: ' + useruuid
          )
        return taskUserShared
      })
      return await this.resolveArrayPromises(sharedTaskPromises)
    } catch (error) {
      console.log('sharedTaskPromises')
      return new Error('No se logro compartir la tarea')
    }
  }

  shareTaskperUser = async (userUUID, isResponsible, taskUUID) => {
    try {
      const taskshareEntity = this.generateEntity(
        userUUID,
        taskUUID,
        isResponsible
      )
      const taskshare = await this.taskshareRepository.createOne(
        taskshareEntity
      )
      return taskshare
    } catch (error) {
      return error
    }
  }

  generateEntity = (userUUID, taskUUID, isResponsible) => {
    const uuid = this.uuidUtils.generate()
    const taskshareEntity = new TaskShareEntity(
      userUUID,
      taskUUID,
      isResponsible,
      uuid
    )
    return taskshareEntity.generateTaskShare()
  }

  stopSharing = async (uuid) => {
    try {
      const uuidDeleted = await this.taskshareRepository.deleteOne(uuid)
      return uuidDeleted
    } catch (error) {
      return error
    }
  }

  toDoResponsible = async ({ uuid }) => {
    try {
      const taskSharedRelation = await this.taskshareRepository.getOne(uuid)
      if (!taskSharedRelation) {
        return new Error('La terea no Esta Compartida')
      }
      const sharedUsers = await this.AllUsersByTask(taskSharedRelation.taskUUID)

      if (!Array.isArray(sharedUsers) && sharedUsers.length === 0) {
        return new Error('No hay usuarios Compartidos')
      }
      const responsible = this.findResponsible(sharedUsers)
      if (responsible.uuid !== uuid) {
        await this.taskshareRepository.updateOne(responsible.id, false)
        await this.taskshareRepository.updateOne(taskSharedRelation.id, true)
        return taskSharedRelation
      }
      return sharedUsers
    } catch (e) {
      return new Error('Error Desconocido')
    }
  }

  findResponsible = (sharedUsers) => {
    return sharedUsers.find((user) => {
      return user.responsible === 1
    })
  }

  AllUsersByTask = async (uuid) => {
    try {
      const sharedUsers = await this.taskshareRepository.getByTask(uuid)
      return sharedUsers
    } catch (error) {
      return new Error('Error Inesperado')
    }
  }
}
