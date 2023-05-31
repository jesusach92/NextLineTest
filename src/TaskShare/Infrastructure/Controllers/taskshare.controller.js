export default class TaskShareController {
  constructor(TaskShareUseCases) {
    this.taskshareUseCases = TaskShareUseCases
  }

  /**
   * Shares a task with specified users.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  shareTask = async (req, res, next) => {
    const { taskUUID, usersUUIDS, responsible } = req.body
    const taskShared = await this.taskshareUseCases.shareTask(
      taskUUID,
      usersUUIDS
    )
    if (taskShared instanceof Error)
      return res.status(400).json(taskShared.message)
    if (!responsible) return res.status(201).json(taskShared)
    req.taskShared = taskShared
    next()
  }

  /**
   * Sets a user as responsible for a task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  toDoResponsible = async (req, res) => {
    const { responsible, taskUUID } = req.body
    const userResponsible = await this.taskshareUseCases.toDoResponsible(
      responsible,
      taskUUID
    )
    if (userResponsible instanceof Error)
      return res.status(400).json(userResponsible.message)
    res.status(200).json({ userResponsible, ...req.taskShared })
  }

  /**
   * Stops sharing a task with a specific user.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  stopSharingUser = async (req, res) => {
    const useruuidDeleted = await this.taskshareUseCases.stopSharingUser(
      req.params.task,
      req.params.user
    )
    if (useruuidDeleted instanceof Error)
      return res.status(400).json(useruuidDeleted.message)
    return res.status(200).json(useruuidDeleted)
  }

  /**
   * Stops sharing a task with all users.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  stopSharingAllUser = async (req, res) => {
    const useruuidDeleted = await this.taskshareUseCases.stopSharingTask(
      req.params.task
    )
    return res.status(200).json(useruuidDeleted)
  }

  /**
   * Retrieves all shared tasks.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  getSharedTasks = async (req, res) => {
    const TasksShared = await this.taskshareUseCases.getTaskShared()
    if (TasksShared instanceof Error)
      return res.status(404).json('Failed to retrieve shared tasks')
    return res.status(200).json(TasksShared)
  }

  /**
   * Retrieves all users shared for a specific task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  getAllUsersShared = async (req, res) => {
    const UsersSharedByTask = await this.taskshareUseCases.AllUsersByTask(
      req.params.id
    )
    if (UsersSharedByTask instanceof Error)
      return res.status(404).json('No shared users found for this task')
    res.status(200).json(UsersSharedByTask)
  }
}
