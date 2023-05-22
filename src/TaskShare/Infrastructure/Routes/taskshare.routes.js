import { Router } from 'express'
import { TaskShareUseCases } from '../../Application/taskshare.usecases.js'
import { TaskShareController } from '../Controllers/taskshare.controller.js'
import { MySQLTaskShareRepository } from '../Repository/taskshare.mysql.repository.js'
import { userUseCases } from '../../../User/Infrastructure/Routes/user.routes.js'
import { taskUseCases } from '../../../Task/Infraestructure/Routes/task.routes.js'

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

/**
 * Obtener todos los usuarios compartiendo tareas
 * Ruta: GET '/'
 */

taskshareRouter.get('/tasks', taskshareController.getAll)

taskshareRouter.get('/tasks/:id', taskshareController.getAllUsersShared)

/**
 * Obtener tareas compartidas por parámetros de consulta
 * Ruta: GET '/search?'
 */
taskshareRouter.get('/search?', taskshareController.getAll)

/**
 * Compartir una nueva tarea
 * Ruta: POST '/'
 */
taskshareRouter.post('/', taskshareController.shareTask)

/**
 * Actualizar una tarea compartida
 * Ruta: PATCH '/'
 */
taskshareRouter.patch('/', taskshareController.updateOne)

/**
 * Eliminar una tarea compartida por su ID
 * Ruta: DELETE '/:id'
 */
taskshareRouter.delete('/:id', taskshareController.deleteOne)

// Exportar el router de Tareas Compartidas
export default taskshareRouter
