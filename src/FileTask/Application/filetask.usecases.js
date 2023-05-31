import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import FileTaskEntity from '../Domain/filetask.entity.js'

export default class FileTaskUseCases {
  constructor(fileTaskRepository, fileUseCases, taskUseCases) {
    this.fileTaskRepository = fileTaskRepository
    this.fileUseCases = fileUseCases
    this.taskUseCases = taskUseCases
    this.uuidUtils = new UUIDUtils()
  }

  /**
   * Retrieves the file associated with a task.
   * @param {string} taskUUID - UUID of the task.
   * @returns {Object|Error} - Retrieved file or error if not found.
   */
  getFileByTask = async (taskUUID) => {
    try {
      const { fileUUID } = await this.fileTaskRepository.findFileTask(taskUUID)
      const file = await this.fileUseCases.findFile(fileUUID)
      if (file instanceof Error) {
        return new Error(`No files found for task: ${taskUUID}`)
      }
      return file
    } catch (error) {
      return new Error('No files to display')
    }
  }

  /**
   * Assigns a file to a task.
   * @param {Object} params - Parameters for assigning the file to the task.
   * @param {string} params.fileUUID - UUID of the file to be assigned.
   * @param {string} params.taskUUID - UUID of the task to assign the file to.
   * @returns {Object|Error} - Success message or error if assignment failed.
   */
  assignFile = async ({ fileUUID, taskUUID }) => {
    try {
      const file = await this.fileUseCases.findFile(fileUUID)
      const task = await this.taskUseCases.findTask(taskUUID)

      if (file instanceof Error || task instanceof Error) {
        return new Error('File assignment failed')
      }

      const uuid = this.uuidUtils.generate()
      const fileTaskEntity = new FileTaskEntity(uuid, taskUUID, fileUUID)

      await this.fileTaskRepository.createOne(fileTaskEntity.generateFile())
      return {
        Message: `File ${fileUUID} assigned to task ${taskUUID} successfully`,
      }
    } catch (error) {
      console.log(error)
      return new Error('File assignment failed')
    }
  }
}
