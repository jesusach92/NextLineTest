import { Router } from 'express'
import { taskshareController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Create router instance
const taskshareRouter = Router()

// Route for sharing a task and assigning responsible user
// POST /
// Request body: { taskUUID, usersUUIDS, responsible }
taskshareRouter.post(
  '/',
  taskshareController.shareTask,
  taskshareController.toDoResponsible
)

// Route for stopping sharing a task with a specific user
// DELETE /task/:task/user/:user
taskshareRouter.delete(
  '/task/:task/user/:user',
  taskshareController.stopSharingUser
)

// Route for stopping sharing a task with all users
// DELETE /task/:task
taskshareRouter.delete('/task/:task', taskshareController.stopSharingAllUser)

// Route for updating responsible user for a task
// PATCH /
taskshareRouter.patch('/', taskshareController.toDoResponsible)

// Route for getting all shared tasks
// GET /
taskshareRouter.get('/', taskshareController.getSharedTasks)

// Route for getting all users shared for a specific task
// GET /task/:id
taskshareRouter.get('/task/:id', taskshareController.getAllUsersShared)

export default taskshareRouter
