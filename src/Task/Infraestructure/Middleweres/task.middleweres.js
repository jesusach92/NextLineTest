export default class TaskMiddleweres {
  constructor(
    tagTaskUseCases,
    taskshareUseCases,
    commentUseCases,
    fileUseCases
  ) {
    this.tagTaskUseCases = tagTaskUseCases
    this.taskshareUseCases = taskshareUseCases
    this.commentUseCases = commentUseCases
    this.fileUseCases = fileUseCases
  }

  sharedUsersTaskMiddlewere = async (req, res, next) => {
    req.task = { ...req.task, sharedUser: [1, 2, 3] }
    console.log(req.task)

    console.log('shared')
    next()
  }

  tagsTaskMiddlewere = async (req, res, next) => {
    req.task = { ...req.task, tags: ['MySQL', 'SQLServer'] }
    console.log('Tags')
    next()
  }

  commentsTaskMiddlewere = async (req, res, next) => {
    req.task = { ...req.task, comments: 'Tarea Urgente Solucionar' }
    console.log('comments')
    next()
  }

  filesTaskMiddlewere = async (req, res, next) => {
    req.task = { ...req.task, file: 'Archivo1' }
    console.log('files')
    next()
  }
}
