import { Router } from 'express'
import {
  authenticationController,
  userController,
} from '../Dependencies/container.dependencies.js'

// Import routers for different entities
import userRouter from '../../../User/Infrastructure/Routes/user.routes.js'
import taskRouter from '../../../Task/Infraestructure/Routes/task.routes.js'
import taskshareRouter from '../../../TaskShare/Infrastructure/Routes/taskshare.routes.js'
import commentRouter from '../../../Comment/Infraestructure/Routes/comment.routes.js'
import tagRouter from '../../../Tag/Infrastructure/Routes/tag.routes.js'
import tagtaskRouter from '../../../TagTask/Infrastructure/Routes/tagtask.routes.js'
import authenticationRouter from '../../../Authentication/Infraestructure/Routes/authentication.routes.js'
import fileRouter from '../../../File/Infrastructure/Routes/file.routes.js'
import fileTaskRouter from '../../../FileTask/Infrastructure/Routes/fileTask.routes.js'

const router = Router()

// Register route
router.post('/Register', userController.createOne)

// Authentication middleware
router.use('/', authenticationRouter)
router.use('/', authenticationController.validateSession)

// Route handlers for different entities
router.use('/users', userRouter)
router.use('/tasks', taskRouter)
router.use('/files', fileRouter)
router.use('/tags', tagRouter)
router.use('/comments', commentRouter)
router.use('/sharedtasks', taskshareRouter)
router.use('/tagstask', tagtaskRouter)
router.use('/fileTask', fileTaskRouter)

// 404 Not Found handler
router.get('*', (req, res) => {
  res.status(404)
  res.send({ error: 'Not Found' })
})

export default router
