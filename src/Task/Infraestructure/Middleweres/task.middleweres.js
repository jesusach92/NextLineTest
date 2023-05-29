export default class TaskMiddleweres {
  constructor(
    tagtaskUseCases,
    taskshareUseCases,
    commentUseCases,
    fileUseCases
  ) {
    this.tagtaskUseCases = tagtaskUseCases
    this.taskshareUseCases = taskshareUseCases
    this.commentUseCases = commentUseCases
    this.fileUseCases = fileUseCases
  }

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

  filesTaskMiddlewere = async (req, res, next) => {
    const File = await this.fileUseCases.uploadFile(req)
    if (File instanceof Error) {
      req.task = { ...req.task, File: File.message }
      next()
    }
    req.task = { ...req.task, File }
    next()
  }
}
