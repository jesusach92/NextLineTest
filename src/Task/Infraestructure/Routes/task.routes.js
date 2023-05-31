/*
  The taskRouter handles task-related routes using Express.
  It imports necessary dependencies and sets up the routes for GET, POST, PATCH, and DELETE operations.
*/

import { Router } from 'express'
import {
  taskController,
  taskMiddleweres,
} from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

const taskRouter = Router()

// Route: GET /
// Description: Retrieves tasks and applies task ponderation.
taskRouter.get('/', taskController.getTasks, taskController.tasksPonderated)

// Route: GET /search?
// Description: Retrieves tasks with search parameters, including shared users and file information, and applies task ponderation.
taskRouter.get(
  '/search?',
  taskController.getTasks,
  taskMiddleweres.getSharedUsersTaskMiddlewere,
  taskMiddleweres.getFilesTaskMiddlewere,
  taskController.tasksPonderated
)

// Route: GET /:id
// Description: Retrieves a specific task.
taskRouter.get('/:id', taskController.getTask)

// Route: POST /
// Description: Creates a new task, adds comments, files, shared users, tags, and returns the full created task.
taskRouter.post(
  '/',
  taskController.createTask,
  taskMiddleweres.commentsTaskMiddlewere,
  taskMiddleweres.filesTaskMiddlewere,
  taskMiddleweres.sharedUsersTaskMiddlewere,
  taskMiddleweres.tagsTaskMiddlewere,
  taskController.returnCreatedFullTask
)

// Route: PATCH /:id
// Description: Updates a specific task.
taskRouter.patch('/:id', taskController.updateTask)

// Route: DELETE /:id
// Description: Deletes a specific task.
taskRouter.delete('/:id', taskController.deleteTask)

export default taskRouter
