export default class FileController {
  constructor(FileUseCases) {
    this.FileUseCases = FileUseCases
  }

  getFiles = async (req, res) => {
    const Files = await this.FileUseCases.getFiles(req.query)
    if (Files instanceof Error) return res.status(404).json(Files.message)
    return res.status(200).json(Files)
  }

  getFile = async (req, res) => {
    const File = await this.FileUseCases.findFile(req.params.id)
    if (File instanceof Error) return res.status(404).json(File.message)
    return res.status(200).json(File)
  }

  uploadFile = async (req, res) => {
    const File = await this.FileUseCases.uploadFile(req)
    if (File instanceof Error) return res.status(400).json(File.message)
    return res.status(201).json(File)
  }

  deleteFile = async (req, res) => {
    const FileDeleted = await this.FileUseCases.deleteFile(req.params.id)
    if (FileDeleted instanceof Error)
      return res.status(400).json(FileDeleted.message)
    return res.status(200).json(FileDeleted)
  }
}
