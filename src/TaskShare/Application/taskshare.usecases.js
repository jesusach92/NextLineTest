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

  shareMultipleUserTask = async (usersUUIDS, responsible, uuidTask) => {
    try {
      const sharedTask = usersUUIDS.map(async (useruuid) => {
        const isReponsible = useruuid === responsible
        return await this.shareTaskperUser(useruuid, isReponsible, uuidTask)
      })
      return sharedTask
    } catch (error) {
      return error
    }
  }

  shareTaskperUser = async (useruuid, isResponsible, uuidTask) => {
    try {
      const task = await this.taskUseCases.findTask(uuidTask)
      const user = await this.usersUseCases.findUser(useruuid)
      const taskshareEntity = new TaskShareEntity(user.id, task.id)
      const taskshare = await this.taskshareRepository.createOne(
        taskshareEntity
      )
      return taskshare
    } catch (error) {}
  }

  stopSharing = async (uuid) => {
    try {
      const uuidDeleted = await this.taskshareRepository.deleteOne(uuid)
      return uuidDeleted
    } catch (error) {
      return error
    }
  }

  getUsersByTask = async (uuid) => {
    try {
      const taskshare = await this.taskshareRepository.findOne(uuid)
      const taskshareWithOutPassword = this.quitPassword(taskshare)
      return taskshareWithOutPassword
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

  gettaskshares = async (params) => {
    const taskshares = await this.taskshareRepository.getAll(params)
    if (taskshares && taskshares.length > 0) {
      const tasksharesWithoutPassword = taskshares.map((e) =>
        this.quitPassword(e)
      )
      return tasksharesWithoutPassword
    }
    return taskshares
  }

  updatetaskshare = async (fields) => {
    try {
      return null
    } catch (e) {
      return e
    }
  }
}
