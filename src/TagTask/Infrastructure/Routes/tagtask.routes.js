import { Router } from 'express'
import { tagtaskController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Crear instancia del router de usuarios
const tagtaskRouter = Router()

// Definir rutas de usuarios y asignar los métodos del controlador
tagtaskRouter.get('/task/:id', tagtaskController.getTagsTask) // Obtener todos los usuarios
tagtaskRouter.post('/task/:id', tagtaskController.assignTagstoTask) // Crear un nuevo usuario
tagtaskRouter.delete('/task/:id', tagtaskController.deleteOne) // Eliminar un usuario por su UUID

// Exportar el router de usuarios
export default tagtaskRouter
