import { Router } from 'express'

import {
  taskController,
  taskMiddleweres
} from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

const taskRouter = Router()
taskRouter.get('/', taskController.getTasks, taskController.tasksPonderated)
taskRouter.get('/search?', taskController.tasksPonderated)
taskRouter.get('/:id', taskController.getTask)
taskRouter.post(
  '/',
  taskController.createTask,
  taskMiddleweres.commentsTaskMiddlewere,

  taskController.returnCreatedFullTask
)
taskRouter.patch('/:id', taskController.updateTask)
taskRouter.delete('/:id', taskController.deleteTask)

export default taskRouter
