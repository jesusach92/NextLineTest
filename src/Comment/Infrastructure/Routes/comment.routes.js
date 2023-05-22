import { Router } from 'express'
import { CommentUseCases } from '../../Application/comment.usecases.js'
import { CommentController } from '../Controllers/comment.controller.js'
import { MySQLCommentRepository } from '../Repository/comment.mysql.repository.js'
// import { MockcommentRepository } from '../Repository/comment.mock.respository.js'
import { userUseCases } from '../../../User/Infrastructure/Routes/user.routes.js'
import { taskUseCases } from '../../../Task/Infraestructure/Routes/task.routes.js'

const commentRepository = new MySQLCommentRepository()
export const commentUseCases = new CommentUseCases(
  commentRepository,
  userUseCases,
  taskUseCases
)
const commentController = new CommentController(commentUseCases)

const commentRouter = Router()
commentRouter.get('/task/:id', commentController.getByTask)
commentRouter.get('/comment/:id', commentController.getByComment)
commentRouter.get('/search?', commentController.getByTask)
commentRouter.post('/', commentController.createOne)
commentRouter.patch('/', commentController.updateOne)
commentRouter.delete('/:id', commentController.deleteOne)

export default commentRouter
