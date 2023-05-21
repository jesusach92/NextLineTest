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
taskRouter.get('/', taskController.getAll)
taskRouter.get('/search?', taskController.getAll)
taskRouter.get('/:id', taskController.getOne)
taskRouter.post('/', taskController.createOne)
taskRouter.patch('/', taskController.updateOne)
taskRouter.delete('/:id', taskController.deleteOne)

export default taskRouter
