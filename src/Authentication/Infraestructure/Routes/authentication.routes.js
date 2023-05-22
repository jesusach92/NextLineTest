import { Router } from 'express'
import { AuthenticationUseCases } from '../../Application/authentication.usecases.js'
import { AuthenticationController } from '../Controllers/authentication.controller.js'
import { userUseCases } from '../../../User/Infrastructure/Routes/user.routes.js'
import { MySQLAuthenticationRepository } from '../Repository/authentication.mysql.repository.js'
// import { MockauthenticationRepository } from '../Repository/authentication.mock.respository.js';

// Crear instancia del repositorio de MySQL para autenticación
const authenticationRepository = new MySQLAuthenticationRepository()

// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const authenticationUseCases = new AuthenticationUseCases(
  authenticationRepository,
  userUseCases
)

// Crear instancia del controlador y pasar los casos de uso como dependencia
export const authenticationController = new AuthenticationController(
  authenticationUseCases
)

// Crear instancia del router de autenticación
const authenticationRouter = Router()

// Definir rutas de autenticación y asignar los métodos del controlador

authenticationRouter.post('/', authenticationController.logIn)
// Ruta para iniciar sesión

authenticationRouter.delete('/:id', authenticationController.logOut)
// Ruta para cerrar sesión de un usuario por su UUID

// Exportar el router de autenticación
export default authenticationRouter
