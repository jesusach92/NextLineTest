import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import TaskShareEntity from '../Domain/taskShare.entity.js'

export default class TaskShareUseCases {
  constructor(taskshareRepository, userUseCases, taskUseCases) {
    this.taskshareRepository = taskshareRepository
    this.userUseCases = userUseCases
    this.taskUseCases = taskUseCases
    this.uuidUtils = new UUIDUtils()
    this.passwordUtils = new PasswordUtil()
  }

  /**
   * Share a task with users.
   * @param {string} taskUUID - Task UUID.
   * @param {string[]} usersUUIDS - Array of user UUIDs to share the task with.
   * @returns {Object|Error} - Object with the message and shared tasks, or an Error if sharing fails.
   */
  shareTask = async (taskUUID, usersUUIDS) => {
    try {
      if (!Array.isArray(usersUUIDS) || usersUUIDS.length === 0)
        return new Error(
          'You must provide an array of users with at least 1 user to share with'
        )
      await this.taskUseCases.findTask(taskUUID)
      const sharedTask = await this.shareTaskLoop(usersUUIDS, taskUUID)
      if (!Array.isArray(sharedTask) || sharedTask.length === 0)
        return new Error('Failed to share the task with all users')

      return {
        Message: `Task:${taskUUID} shared with ${sharedTask.length} users`,
        sharedTask,
      }
    } catch (error) {
      return new Error('Failed to share the task')
    }
  }

  /**
   * Share the task with multiple users in a loop.
   * @param {string[]} usersUUIDS - Array of user UUIDs.
   * @param {string} taskUUID - Task UUID.
   * @returns {Promise<Object[]|Error>} - Array of shared tasks or an Error if sharing fails.
   */
  shareTaskLoop = async (usersUUIDS, taskUUID) => {
    try {
      const sharedTask = await Promise.all(
        usersUUIDS.map(async (useruuid) => {
          const user = await this.userUseCases.findUser(useruuid)
          const taskUserShared = await this.shareTaskperUser(
            user.uuid,
            taskUUID
          )
          if (taskUserShared instanceof Error)
            throw new Error(
              'Failed to share the task with the user: ' + useruuid
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

  /**
   * Share the task with a user.
   * @param {string} userUUID - User UUID.
   * @param {string} taskUUID - Task UUID.
   * @returns {Object|Error} - Shared task object or an Error if sharing fails.
   */
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

  /**
   * Assign a user as the responsible for a task.
   * @param {string} userUUID - User UUID.
   * @param {string} taskUUID - Task UUID.
   * @returns {string|Error} - Success message or an Error if the assignment fails.
   */
  toDoResponsible = async (userUUID, taskUUID) => {
    try {
      const taskSharedRelation = await this.taskshareRepository.getRelation(
        userUUID,
        taskUUID
      )
      if (!taskSharedRelation) {
        return new Error(`The task is not shared with the user: ${userUUID}`)
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
        return `Successfully assigned user ${userUUID} as responsible`
      }
      await this.taskshareRepository.updateResponsible(userUUID, true)
      return `Successfully assigned user ${userUUID} as responsible`
    } catch (error) {
      return new Error(error.message)
    }
  }

  /**
   * Stop sharing a task with a user.
   * @param {string} taskUUID - Task UUID.
   * @param {string} userUUID - User UUID.
   * @returns {string|Error} - Success message or an Error if stopping the sharing fails.
   */
  stopSharingUser = async (taskUUID, userUUID) => {
    try {
      await this.taskshareRepository.stopSharewithUser(taskUUID, userUUID)
      return `Task ${taskUUID} is no longer shared with the user ${userUUID}`
    } catch (error) {
      return error
    }
  }

  /**
   * Stop sharing a task with all users.
   * @param {string} taskUUID - Task UUID.
   * @returns {string|Error} - Success message or an Error if stopping the sharing fails.
   */
  stopSharingTask = async (taskUUID) => {
    try {
      await this.taskshareRepository.stopShareTask(taskUUID)
      return `Task ${taskUUID} is no longer shared with all users.`
    } catch (error) {
      return error
    }
  }

  /**
   * Get all users shared with a task.
   * @param {string} taskUUID - Task UUID.
   * @returns {Object[]|Error} - Array of shared users or an Error if there are no shared users.
   */
  AllUsersByTask = async (taskUUID) => {
    try {
      const sharedUsers = await this.taskshareRepository.getByTask(taskUUID)
      console.log(sharedUsers)
      if (!Array.isArray(sharedUsers) || sharedUsers.length === 0)
        return new Error(`There are no shared users for the task: ${taskUUID}`)
      const users = await this.resolveArrayPromises(
        sharedUsers.map(async (user) => {
          return {
            isResponsible: user.responsible,
            user: await this.userUseCases.findUser(user.userUUID),
          }
        })
      )
      return users
    } catch (error) {
      return new Error(error)
    }
  }

  /**
   * Get all shared tasks.
   * @returns {Object|Error} - Object containing the total count and array of shared task UUIDs, or an Error if retrieval fails.
   */
  getTaskShared = async () => {
    try {
      const TasksShared = await this.taskshareRepository.getAllTasksShared()
      const TasksSharedUUID = await this.resolveArrayPromises(
        await this.getTaskSharedPromises(TasksShared)
      )
      return { Total: TasksSharedUUID.length, TasksSharedUUID }
    } catch (error) {
      return new Error('Unexpected error')
    }
  }

  /**
   * Generate an array of promises to fetch task and user data for shared tasks.
   * @param {Object[]} TasksShared - Array of shared tasks.
   * @returns {Promise<Object[]|Error>} - Array of promises for task and user data, or an Error if retrieval fails.
   */
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

  /**
   * Resolve an array of promises.
   * @param {Promise[]} ArrayPromises - Array of promises to resolve.
   * @returns {Promise<any[]|Error>} - Resolved array of promises or an Error if resolution fails.
   */
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
