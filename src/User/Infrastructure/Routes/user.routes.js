import { Router } from 'express'
import { UserUseCases } from '../../Application/user.usecases.js'
import { UserController } from '../Controllers/user.controller.js'
import { MySQLUserRepository } from '../Repository/user.mysql.repository.js'
// import { MockUserRepository } from '../Repository/user.mock.respository.js'
// Crear instancia del repositorio de MySQL para usuarios
const userRepository = new MySQLUserRepository()

// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const userUseCases = new UserUseCases(userRepository)

// Crear instancia del controlador y pasar los casos de uso como dependencia
export const userController = new UserController(userUseCases)

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
