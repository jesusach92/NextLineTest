import { Router } from 'express'
import { TagTaskUseCases } from '../../Application/tagtask.usecases.js'
import { TagTaskController } from '../Controllers/tagtask.controller.js'
import { MySQLTagTaskRepository } from '../Repository/tagtask.mysql.repository.js'
import { taskUseCases } from '../../../Task/Infraestructure/Routes/task.routes.js'
import { tagUseCases } from '../../../Tag/Infrastructure/Routes/tag.routes.js'
// import { MocktagtaskRepository } from '../Repository/tagtask.mock.respository.js'
// Crear instancia del repositorio de MySQL para usuarios

const tagtaskRepository = new MySQLTagTaskRepository()

// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const tagtaskUseCases = new TagTaskUseCases(
  tagtaskRepository,
  taskUseCases,
  tagUseCases
)

// Crear instancia del controlador y pasar los casos de uso como dependencia
const tagtaskController = new TagTaskController(tagtaskUseCases)

// Crear instancia del router de usuarios
const tagtaskRouter = Router()

// Definir rutas de usuarios y asignar los métodos del controlador
tagtaskRouter.get('/task/:id', tagtaskController.getTagsTask) // Obtener todos los usuarios
tagtaskRouter.post('/', tagtaskController.createOne) // Crear un nuevo usuario
tagtaskRouter.delete('/:id', tagtaskController.deleteOne) // Eliminar un usuario por su UUID

// Exportar el router de usuarios
export default tagtaskRouter
