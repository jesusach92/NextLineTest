import { Router } from 'express'

import container from '../../../../1Shared/Infrastructure/Dependencies/container.dependencies.js'

const taskController = container.resolve('taskController')
const taskMiddleweres = container.resolve('taskMiddleweres')

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
