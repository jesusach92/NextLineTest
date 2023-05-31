export default class FileController {
  constructor(fileUseCases) {
    this.fileUseCases = fileUseCases
  }

  /**
   * Retrieves all files.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response containing the files or error message.
   */
  getFiles = async (req, res) => {
    const files = await this.fileUseCases.getFiles()
    if (files instanceof Error) {
      return res.status(404).json(files.message)
    }
    return res.status(200).json(files)
  }

  /**
   * Retrieves a specific file by its UUID.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response containing the file or error message.
   */
  getFile = async (req, res) => {
    const file = await this.fileUseCases.findFile(req.params.id)
    if (file instanceof Error) {
      return res.status(404).json(file.message)
    }
    return res.status(200).json(file)
  }

  /**
   * Uploads a file.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response containing the uploaded file or error message.
   */
  uploadFile = async (req, res) => {
    const file = await this.fileUseCases.uploadFile({
      body: req.body,
      files: req.files,
      userSession: req.userSession,
    })
    if (file instanceof Error) {
      return res.status(400).json(file.message)
    }
    return res.status(201).json(file)
  }

  /**
   * Deletes a file by its UUID.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response containing the deleted file or error message.
   */
  deleteFile = async (req, res) => {
    const fileDeleted = await this.fileUseCases.deleteFile(req.params.id)
    if (fileDeleted instanceof Error) {
      return res.status(400).json(fileDeleted.message)
    }
    return res.status(200).json(fileDeleted)
  }
}
