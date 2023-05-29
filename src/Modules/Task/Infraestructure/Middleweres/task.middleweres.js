export default class TaskMiddleweres {
  constructor(
    tagsTaskUseCases,
    taskshareUseCases,
    commentUseCases,
    fileUseCases
  ) {
    this.tagsTaskUseCases = tagsTaskUseCases
    this.taskshareUseCases = taskshareUseCases
    this.commentUseCases = commentUseCases
    this.fileUseCases = fileUseCases
  }

  sharedUsersTaskMiddlewere = async (req, res, next) => {
    console.log('shared')
    next()
  }

  tagsTaskMiddlewere = async (req, res, next) => {
    console.log('Tags')
    next()
  }

  commentsTaskMiddlewere = async (req, res, next) => {
    console.log('comments')
    next()
  }

  filesTaskMiddlewere = async (req, res, next) => {
    console.log('files')
    next()
  }
}
