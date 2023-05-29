import { Router } from 'express'
import container from '../../../../1Shared/Infrastructure/Dependencies/container.dependencies.js'

const commentController = container.resolve('commentController')

const commentRouter = Router()
commentRouter.get('/task/:id', commentController.getByTask)
commentRouter.get('/:id', commentController.getByComment)
commentRouter.post('/', commentController.createOne)
commentRouter.patch('/:id', commentController.updateOne)
commentRouter.delete('/:id', commentController.deleteOne)

export default commentRouter
