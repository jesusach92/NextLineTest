import { Router } from 'express'
import { fileTaskController } from '../../../Shared/Infrastructure/Dependencies/container.dependencies.js'

// Create an instance of the fileTaskRouter
const fileTaskRouter = Router()

// Define routes for file tasks and assign controller methods
fileTaskRouter.get('/:task', fileTaskController.getFileByTask) // Get files associated with a task
fileTaskRouter.post('/', fileTaskController.assignFile) // Assign a file to a task

// Export the fileTaskRouter
export default fileTaskRouter
