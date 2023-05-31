import { Router } from 'express'
import { userController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Create an instance of the user router
const userRouter = Router()

// Define user routes and assign controller methods
userRouter.get('/', userController.getAll) // Get all users
userRouter.get('/:id', userController.getOne) // Get a user by UUID
userRouter.post('/', userController.createOne) // Create a new user
userRouter.patch('/:id', userController.updateOne) // Update a user
userRouter.delete('/:id', userController.deleteOne) // Delete a user by UUID

// Export the user router
export default userRouter
