import { PasswordUtil } from '../../../1Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../../1Shared/Infrastructure/utils/uuids.util.js'
import TaskShareEntity from '../Domain/taskShare.entity.js'

export default class TaskShareUseCases {
  constructor(taskshareRepository, usersUseCases, taskUseCases) {
    this.taskshareRepository = taskshareRepository
    this.usersUseCases = usersUseCases
    this.taskUseCases = taskUseCases
    this.uuidUtils = new UUIDUtils()
    this.passwordUtils = new PasswordUtil()
  }

  shareTask = async (taskUUID, usersUUIDS) => {
    try {
      if (!Array.isArray(usersUUIDS) || usersUUIDS.length === 0)
        return new Error(
          'Debes enviar un arreglo de usuarios con al menos 1 usuario a compartir'
        )
      await this.taskUseCases.findTask(taskUUID)
      const sharedTask = await this.shareTaskLoop(usersUUIDS, taskUUID)
      if (!Array.isArray(sharedTask) || sharedTask.length === 0)
        return new Error(
          'No se logro compartir la tarea con todos los usuarios'
        )

      return {
        Message: `Tarea:${taskUUID} compartida con ${sharedTask.length} Usuarios`,
        sharedTask,
      }
    } catch (error) {
      return new Error('No se Puedo Compartir la Tarea ')
    }
  }

  shareTaskLoop = async (usersUUIDS, taskUUID) => {
    try {
      const sharedTask = await Promise.all(
        usersUUIDS.map(async (useruuid) => {
          const user = await this.usersUseCases.findUser(useruuid)
          const taskUserShared = await this.shareTaskperUser(
            user.uuid,
            taskUUID
          )
          if (taskUserShared instanceof Error)
            throw new Error(
              'No se logro compartir la tearea con el usuario: ' + useruuid
            )
          return taskUserShared
        })
      )
        .then((task) => task)
        .catch((error) => {
          throw new Error(error.message)
        })
      return sharedTask
    } catch (error) {
      return new Error(error.message)
    }
  }

  shareTaskperUser = async (userUUID, taskUUID) => {
    try {
      const uuid = this.uuidUtils.generate()
      const taskshareEntity = new TaskShareEntity(userUUID, taskUUID, uuid)
      const taskshare = await this.taskshareRepository.createOne(
        taskshareEntity.generateTaskShare()
      )
      return taskshare
    } catch (error) {
      return error
    }
  }

  toDoResponsible = async (userUUID, taskUUID) => {
    try {
      const taskSharedRelation = await this.taskshareRepository.getRelation(
        userUUID,
        taskUUID
      )
      if (!taskSharedRelation) {
        return new Error(
          `La terea no Esta Compartida con el usuario: ${userUUID}`
        )
      }
      const userResponsible = await this.taskshareRepository.getResponsible(
        taskUUID
      )
      if (userResponsible && userResponsible.userUUID !== userUUID) {
        await this.taskshareRepository.updateResponsible(
          userResponsible.userUUID,
          false
        )
        await this.taskshareRepository.updateResponsible(userUUID, true)
        return `Se asigno correctamente como responsable al usuario: ${userUUID}`
      }
      await this.taskshareRepository.updateResponsible(userUUID, true)
      return `Se asigno correctamente como responsable al usuario: ${userUUID}`
    } catch (error) {
      return new Error(error.message)
    }
  }

  stopSharingUser = async (taskUUID, userUUID) => {
    try {
      await this.taskshareRepository.stopSharewithUser(taskUUID, userUUID)
      return `La tarea ${taskUUID} se dejo de compartir con el usuario ${userUUID}`
    } catch (error) {
      return error
    }
  }

  stopSharingTask = async (taskUUID) => {
    try {
      await this.taskshareRepository.stopShareTask(taskUUID)
      return `La tarea ${taskUUID} se dejo de compartir con todos los usuarios.`
    } catch (error) {
      return error
    }
  }

  AllUsersByTask = async (taskUUID) => {
    try {
      const sharedUsers = await this.taskshareRepository.getByTask(taskUUID)
      console.log(sharedUsers)
      if (!Array.isArray(sharedUsers) || sharedUsers.length === 0)
        return new Error(
          `No hay usuarios Compartidos para la Tarea :  ${taskUUID}`
        )
      const users = await this.resolveArrayPromises(
        sharedUsers.map(async (user) => {
          return {
            isResponsible: user.responsible,
            user: await this.usersUseCases.findUser(user.userUUID),
          }
        })
      )
      return users
    } catch (error) {
      return new Error(error)
    }
  }

  getTaskShared = async () => {
    try {
      const TasksShared = await this.taskshareRepository.getAllTasksShared()
      const TasksSharedUUID = await this.resolveArrayPromises(
        await this.getTaskSharedPromises(TasksShared)
      )
      return { Total: TasksSharedUUID.length, TasksSharedUUID }
    } catch (error) {
      return new Error('Error Inesperado')
    }
  }

  getTaskSharedPromises = async (TasksShared) => {
    try {
      const TasksDataArray = TasksShared.map(async (Task) => {
        return {
          UsersShared: Task.usersShared,
          Task: await this.taskUseCases.findTask(Task.taskUUID),
        }
      })
      return TasksDataArray
    } catch (error) {
      return new Error(error.message)
    }
  }

  resolveArrayPromises = async (ArrayPromises) => {
    try {
      const PromiseResolved = await Promise.all(ArrayPromises)
        .then((values) => values)
        .catch((e) => e)

      if (PromiseResolved instanceof Error)
        throw new Error(PromiseResolved.message)
      return PromiseResolved
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
