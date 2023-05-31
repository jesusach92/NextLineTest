export default class FileController {
  constructor(FileTaskUseCases) {
    this.FileTaskUseCases = FileTaskUseCases
  }

  /**
   * Retrieves files associated with a task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response containing the files or error message.
   */
  getFileByTask = async (req, res) => {
    const Files = await this.FileTaskUseCases.getFileByTask(req.params.task)
    if (Files instanceof Error) {
      return res.status(404).json(Files.message)
    }
    return res.status(200).json(Files)
  }

  /**
   * Assigns a file to a task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response containing success message or error message.
   */
  assignFile = async (req, res) => {
    const File = await this.FileTaskUseCases.assignFile(req.body)
    if (File instanceof Error) {
      return res.status(400).json(File.message)
    }
    return res.status(201).json(File)
  }
}
