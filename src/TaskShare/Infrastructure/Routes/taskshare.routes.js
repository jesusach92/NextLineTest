import { Router } from 'express'
import { TaskShareUseCases } from '../../Application/taskshare.usecases.js'
import { TaskShareController } from '../Controllers/taskshare.controller.js'
import { MySQLTaskShareRepository } from '../Repository/taskshare.mysql.repository.js'
import { userUseCases } from '../../../User/Infrastructure/Routes/user.routes.js'
import { taskUseCases } from '../../../Task/Infraestructure/Dependencies/task.dependencies.js'

// Crear instancia del repositorio de MySQL para usuarios
const taskshareRepository = new MySQLTaskShareRepository()

// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const taskshareUseCases = new TaskShareUseCases(
  taskshareRepository,
  userUseCases,
  taskUseCases
)

// Crear instancia del controlador y pasar los casos de uso como dependencia
const taskshareController = new TaskShareController(taskshareUseCases)

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
