import { Router } from 'express'
import container from '../../../../1Shared/Infrastructure/Dependencies/container.dependencies.js'

// Crear instancia del router de autenticación
const authenticationRouter = Router()

// Definir rutas de autenticación y asignar los métodos del controlador

const authenticationController = container.resolve('authenticationController')

authenticationRouter.post('/', authenticationController.logIn)
// Ruta para iniciar sesión

authenticationRouter.delete('/', authenticationController.logOut)
// Ruta para cerrar sesión de un usuario por su UUID

// Exportar el router de autenticación
export default authenticationRouter
