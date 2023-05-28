import { Router } from 'express'
import { fileController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Crear instancia del router de usuarios
const fileRouter = Router()

// Definir rutas de usuarios y asignar los métodos del controlador
fileRouter.get('/', fileController.getFiles) // Obtener todos los usuarios
fileRouter.get('/:id', fileController.getFile) // Obtener un usuario por su UUID
fileRouter.post('/', fileController.uploadFile) // Crear un nuevo usuario
fileRouter.delete('/:id', fileController.deleteFile) // Eliminar un usuario por su UUID

// Exportar el router de usuarios
export default fileRouter
