import { Router } from 'express'
import { TaskShareUseCases } from '../../Application/taskshare.usecases.js'
import { TaskShareController } from '../Controllers/taskshare.controller.js'
import { MySQLTaskShareRepository } from '../Repository/taskshare.mysql.repository.js'
import { userUseCases } from '../../../User/Infrastructure/Routes/user.routes.js'
import { taskUseCases } from '../../../Task/Infraestructure/Routes/task.routes.js'
// import { MocktaskshareRepository } from '../Repository/taskshare.mock.respository.js'
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

// Crear instancia del router de usuarios
const taskshareRouter = Router()

// Definir rutas de usuarios y asignar los métodos del controlador
taskshareRouter.get('/', taskshareController.getAll) // Obtener todos los usuarios
taskshareRouter.get('/search?', taskshareController.getAll) // Obtener un Tareas compartidas por Query Parameters
taskshareRouter.post('/', taskshareController.createOne) // Crear un nuevo usuario
taskshareRouter.patch('/', taskshareController.updateOne) // Actualizar un usuario
taskshareRouter.delete('/:id', taskshareController.deleteOne) // Eliminar un usuario por su UUID

// Exportar el router de usuarios
export default taskshareRouter
