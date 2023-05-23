import { Router } from 'express'
import { TaskUseCases } from '../../Application/task.usecases.js'
import { TaskController } from '../Controllers/task.controller.js'
import { MySQLTaskRepository } from '../Repository/task.mysql.repository.js'
// import { MockTaskRepository } from '../Repository/task.mock.respository.js'
import { userUseCases } from '../../../User/Infrastructure/Routes/user.routes.js'

const taskRepository = new MySQLTaskRepository()
export const taskUseCases = new TaskUseCases(taskRepository, userUseCases)
const taskController = new TaskController(taskUseCases)

const taskRouter = Router()
taskRouter.get('/', taskController.getTasks, taskController.tasksPonderated)
taskRouter.get('/search?', taskController.tasksPonderated)
taskRouter.get('/:id', taskController.getTask)
taskRouter.post(
  '/',
  taskController.createTask,
  taskController.returnCreatedFullTask
)
taskRouter.patch('/:id', taskController.updateTask)
taskRouter.delete('/:id', taskController.deleteTask)

export default taskRouter
