import { Router } from 'express'
import { fileController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Create an instance of the user router
const fileRouter = Router()

// Define user routes and assign controller methods
fileRouter.get('/', fileController.getFiles) // Get all users
fileRouter.get('/:id', fileController.getFile) // Get a user by UUID
fileRouter.post('/', fileController.uploadFile) // Create a new user
fileRouter.delete('/:id', fileController.deleteFile) // Delete a user by UUID

// Export the user router
export default fileRouter
