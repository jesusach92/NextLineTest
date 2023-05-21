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

  shareTask = async ({ usersUUIDS, responsible, uuidTask }) => {
    try {
      const task = await this.taskUseCases.findTask(uuidTask)
      if (task.isPublic) {
        const sharedTask = usersUUIDS.map(async (useruuid) => {
          const isReponsible = useruuid === responsible
          return await this.shareTaskperUser(useruuid, isReponsible, task.id)
        })
        return sharedTask
      }
      throw new Error('La tarea no es Publica')
    } catch (error) {
      return error
    }
  }

  shareTaskperUser = async (useruuid, isResponsible, taskId) => {
    try {
      const user = await this.usersUseCases.findUser(useruuid)
      const taskshareEntity = new TaskShareEntity(
        user.id,
        taskId,
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

  stopSharing = async (uuid) => {
    try {
      const uuidDeleted = await this.taskshareRepository.deleteOne(uuid)
      return uuidDeleted
    } catch (error) {
      return error
    }
  }

  toDoResponsible = async (uuid) => {
    try {
      const uuidrecover = uuid.$filter.split('=')[1]
      const { id } = await this.usersUseCases.findUser(uuidrecover)
      const sharedUsers = await this.taskshareRepository.getAll({
        $filter: `fkUser eq ${id}`
      })
      return sharedUsers
    } catch (e) {
      return e
    }
  }

  getResponsibleTask = async (uuid) => {
    try {
      const taskshare = await this.taskshareRepository.findOne(uuid)
      const { password } = taskshare
      return password
    } catch (error) {
      return error
    }
  }

  getTaskShared = async (params) => {
    const taskshares = await this.taskshareRepository.getAll(params)
    if (taskshares && taskshares.length > 0) {
      const tasksharesWithoutPassword = taskshares.map((e) =>
        this.quitPassword(e)
      )
      return tasksharesWithoutPassword
    }
    return taskshares
  }

  // updatetaskshare = async (fields) => {
  //   try {
  //     return null
  //   } catch (e) {
  //     return e
  //   }
  // }
}
