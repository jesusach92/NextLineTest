import { Router } from 'express'
import container from '../../../../1Shared/Infrastructure/Dependencies/container.dependencies.js'

const tagController = container.resolve('tagController')

// Crear instancia del router de usuarios
const tagRouter = Router()

// Definir rutas de usuarios y asignar los métodos del controlador
tagRouter.get('/', tagController.getTags) // Obtener todos los usuarios
tagRouter.get('/:id', tagController.getTag) // Obtener un usuario por su UUID
tagRouter.post('/', tagController.createTag) // Crear un nuevo usuario
tagRouter.patch('/:id', tagController.updateTag) // Actualizar un usuario
tagRouter.delete('/:id', tagController.deleteTag) // Eliminar un usuario por su UUID

// Exportar el router de usuarios
export default tagRouter
