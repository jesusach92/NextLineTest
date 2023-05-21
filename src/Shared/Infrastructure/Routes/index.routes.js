import { Router } from 'express'
import userRouter from '../../../User/Infrastructure/Routes/user.routes.js'
import taskRouter from '../../../Task/Infraestructure/Routes/task.routes.js'
import taskshareRouter from '../../../TaskShare/Infrastructure/Routes/taskshare.routes.js'

const router = Router()

router.use('/users', userRouter)
router.use('/tasks', taskRouter)
router.use('/sharedtasks', taskshareRouter)

router.get('*', (req, res) => {
  res.status(404)
  res.send({ error: 'Not Found' })
})

export default router
