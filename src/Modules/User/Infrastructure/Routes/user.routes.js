import { Router } from 'express'
import container from '../../../../1Shared/Infrastructure/Dependencies/container.dependencies.js'

const userController = container.resolve('userController')

// Crear instancia del router de usuarios
const userRouter = Router()

// Definir rutas de usuarios y asignar los métodos del controlador
userRouter.get('/', userController.getAll) // Obtener todos los usuarios
userRouter.get('/:id', userController.getOne) // Obtener un usuario por su UUID
userRouter.post('/', userController.createOne) // Crear un nuevo usuario
userRouter.patch('/:id', userController.updateOne) // Actualizar un usuario
userRouter.delete('/:id', userController.deleteOne) // Eliminar un usuario por su UUID

// Exportar el router de usuarios
export default userRouter
