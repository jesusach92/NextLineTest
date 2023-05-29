import { Router } from 'express'
import userRouter from '../../../Modules/User/Infrastructure/Routes/user.routes.js'
import taskRouter from '../../../Modules/Task/Infraestructure/Routes/task.routes.js'
import taskshareRouter from '../../../Modules/TaskShare/Infrastructure/Routes/taskshare.routes.js'
import commentRouter from '../../../Modules/Comment/Infraestructure/Routes/comment.routes.js'
import tagRouter from '../../../Modules/Tag/Infrastructure/Routes/tag.routes.js'
import tagtaskRouter from '../../../Modules/TagTask/Infrastructure/Routes/tagtask.routes.js'
import authenticationRouter from '../../../Modules/Authentication/Infraestructure/Routes/authentication.routes.js'
import fileRouter from '../../../Modules/File/Infrastructure/Routes/file.routes.js'
import container from '../Dependencies/container.dependencies.js'

const userController = container.resolve('userController')
const authenticationController = container.resolve('authenticationController')

const router = Router()

router.post('/Register', userController.createOne)
router.use('/', authenticationRouter)
router.use('/', authenticationController.validateSession)
router.use('/users', userRouter)
router.use('/tasks', taskRouter)
router.use('/files', fileRouter)
router.use('/tags', tagRouter)
router.use('/comments', commentRouter)
router.use('/sharedtasks', taskshareRouter)
router.use('/tagstask', tagtaskRouter)
router.get('*', (req, res) => {
  res.status(404)
  res.send({ error: 'Not Found' })
})

export default router
