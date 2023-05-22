import { Router } from 'express'
import { TagUseCases } from '../../Application/tag.usecases.js'
import { TagController } from '../Controllers/tag.controller.js'
import { MySQLTagRepository } from '../Repository/tag.mysql.repository.js'
// import { MockTagRepository } from '../Repository/Tag.mock.respository.js'
// Crear instancia del repositorio de MySQL para usuarios
const TagRepository = new MySQLTagRepository()

// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const tagUseCases = new TagUseCases(TagRepository)

// Crear instancia del controlador y pasar los casos de uso como dependencia
const tagController = new TagController(tagUseCases)

// Crear instancia del router de usuarios
const tagRouter = Router()

// Definir rutas de usuarios y asignar los métodos del controlador
tagRouter.get('/', tagController.getTags) // Obtener todos los usuarios
tagRouter.get('/:id', tagController.getTag) // Obtener un usuario por su UUID
tagRouter.post('/', tagController.createTag) // Crear un nuevo usuario
tagRouter.patch('/', tagController.updateTag) // Actualizar un usuario
tagRouter.delete('/:id', tagController.deleteTag) // Eliminar un usuario por su UUID

// Exportar el router de usuarios
export default tagRouter
