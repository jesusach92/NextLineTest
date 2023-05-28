import { Router } from 'express'
import { commentController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

const commentRouter = Router()
commentRouter.get('/task/:id', commentController.getByTask)
commentRouter.get('/:id', commentController.getByComment)
commentRouter.post('/', commentController.createOne)
commentRouter.patch('/:id', commentController.updateOne)
commentRouter.delete('/:id', commentController.deleteOne)

export default commentRouter
