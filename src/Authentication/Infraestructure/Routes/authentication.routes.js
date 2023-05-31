import { Router } from 'express'
import { authenticationController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Create an instance of the authentication router
const authenticationRouter = Router()

// Define authentication routes and assign controller methods

authenticationRouter.post('/', authenticationController.logIn)
// Route for logging in

authenticationRouter.delete('/', authenticationController.logOut)
// Route for logging out a user by their UUID

// Export the authentication router
export default authenticationRouter
