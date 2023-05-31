import { Router } from 'express'
import { tagtaskController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Create an instance of the tag-task router
const tagtaskRouter = Router()

// Define routes for tag-task and assign the controller methods
tagtaskRouter.get('/task/:id', tagtaskController.getTagsTask) // Get all tags of a task
tagtaskRouter.post('/task/:id', tagtaskController.assignTagstoTask) // Assign tags to a task
tagtaskRouter.delete('/task/:id', tagtaskController.deleteOne) // Delete a tag from a task

// Export the tag-task router
export default tagtaskRouter
