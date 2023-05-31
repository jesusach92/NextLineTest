export default class TaskMiddleweres {
  constructor(
    tagtaskUseCases,
    taskshareUseCases,
    commentUseCases,
    fileUseCases,
    fileTaskUseCases
  ) {
    this.tagtaskUseCases = tagtaskUseCases
    this.taskshareUseCases = taskshareUseCases
    this.commentUseCases = commentUseCases
    this.fileUseCases = fileUseCases
    this.fileTaskUseCases = fileTaskUseCases
  }

  /**
   * Shares a task with multiple users.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  sharedUsersTaskMiddlewere = async (req, res, next) => {
    const { uuid } = req.task
    const taskUUID = uuid
    const { usersUUIDS = null } = req.body
    const usersShared = await this.taskshareUseCases.shareTask(
      taskUUID,
      usersUUIDS
    )
    if (usersShared instanceof Error) {
      req.task = { ...req.task, users: usersShared.message }
      next()
    }
    req.task = { ...req.task, usersShared }
    next()
  }

  /**
   * Assigns tags to a task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  tagsTaskMiddlewere = async (req, res, next) => {
    const taskUUID = req.task.uuid
    const { tags } = req.body
    const tagtask = await this.tagtaskUseCases.assignTagstoTask({
      taskUUID,
      tags,
    })
    if (tagtask instanceof Error) {
      req.task = { ...req.task, tagtask: tagtask.message }
      next()
    }
    req.task = { ...req.task, tagtask }
    next()
  }

  /**
   * Creates a comment for a task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  commentsTaskMiddlewere = async (req, res, next) => {
    const { comment = null } = req.body
    const taskUUID = req.task.uuid
    const { userUUID } = req.userSession
    const newcomment = await this.commentUseCases.createcomment({
      taskUUID,
      userUUID,
      comment,
    })

    if (newcomment instanceof Error) {
      req.task = { ...req.task, comment: newcomment.message }
      next()
    }
    req.task = { ...req.task, comment: newcomment }
    next()
  }

  /**
   * Uploads files for a task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  filesTaskMiddlewere = async (req, res, next) => {
    const File = await this.fileUseCases.uploadFile(req)
    if (File instanceof Error) {
      req.task = { ...req.task, File: File.message }
      next()
    }
    const fileTask = await this.fileTaskUseCases.assingFile({
      fileUUID: File.uuid,
      taskUUID: req.task.uuid,
    })
    req.task = { ...req.task, File: { Assing: fileTask, File } }
    next()
  }

  /**
   * Retrieves shared users for multiple tasks.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  getSharedUsersTaskMiddlewere = async (req, res, next) => {
    const tasks = req.tasks
    const usersShared = await this.taskshareUseCases.getTaskShared()
    if (usersShared instanceof Error) {
      req.task = { ...req.task, users: usersShared.message }
      next()
    }
    const tasksWithUsers = usersShared.TasksSharedUUID

    for (let i = 0; i < tasks.length; i++) {
      const task1 = tasks[i].uuid
      const task2Index = tasksWithUsers.findIndex(
        (task) => task.Task.uuid === task1
      )
      if (task2Index !== -1) {
        tasks[i].usersShared = tasksWithUsers[task2Index].UsersShared
      } else {
        tasks[i].usersShared = 0
        tasksWithUsers.push({ UsersShared: 0, Task: tasks[i].task })
      }
    }

    req.task = { Total: tasksWithUsers.length, tasksWithUsers }
    next()
  }

  /**
   * Retrieves file format for multiple tasks.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  getFilesTaskMiddlewere = async (req, res, next) => {
    const tasks = req.tasks
    for (let i = 0; i < tasks.length; i++) {
      const task1 = tasks[i].uuid
      const fileFormat = await this.fileTaskUseCases.getFileByTask(task1)
      if (fileFormat instanceof Error) {
        tasks[i].fileFormat = 'None'
      } else {
        tasks[i].fileFormat = fileFormat.format
      }
    }
    next()
  }
}
