import { commentUseCases } from '../../../Comment/Infraestructure/Routes/comment.routes.js'
import { fileUseCases } from '../../../File/Infrastructure/Routes/file.routes.js'
import { tagtaskUseCases } from '../../../TagTask/Infrastructure/Routes/tagtask.routes.js'
import { taskshareUseCases } from '../../../TaskShare/Infrastructure/Routes/taskshare.routes.js'
import { taskUseCases } from '../Routes/task.routes.js'

class TaskMiddleweres {
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

export const taskMiddleweres = new TaskMiddleweres(
  taskUseCases,
  tagtaskUseCases,
  taskshareUseCases,
  commentUseCases,
  fileUseCases
)
