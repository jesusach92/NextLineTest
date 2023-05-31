import { Router } from 'express'
import { tagController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Create an instance of the user router
const tagRouter = Router()

// Define user routes and assign controller methods
tagRouter.get('/', tagController.getTags) // Get all users
tagRouter.get('/:id', tagController.getTag) // Get a user by their UUID
tagRouter.post('/', tagController.createTag) // Create a new user
tagRouter.patch('/:id', tagController.updateTag) // Update a user
tagRouter.delete('/:id', tagController.deleteTag) // Delete a user by their UUID

// Export the user router
export default tagRouter
