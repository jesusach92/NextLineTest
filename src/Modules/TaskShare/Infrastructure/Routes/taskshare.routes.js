import { Router } from 'express'

import container from '../../../../1Shared/Infrastructure/Dependencies/container.dependencies.js'

const taskshareController = container.resolve('taskshareController')

const taskshareRouter = Router()

taskshareRouter.post(
  '/',
  taskshareController.shareTask,
  taskshareController.toDoResponsible
)
taskshareRouter.delete(
  '/task/:task/user/:user',
  taskshareController.stopSharingUser
)
taskshareRouter.delete('/task/:task', taskshareController.stopSharingAllUser)
taskshareRouter.patch('/', taskshareController.toDoResponsible)
taskshareRouter.get('/', taskshareController.getSharedTasks)
taskshareRouter.get('/task/:id', taskshareController.getAllUsersShared)

export default taskshareRouter
