import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import { FileEntity } from '../Domain/File.entity.js'
import { FileValidator } from './file.validator.js'

export class FileUseCases {
  constructor(fileRepository, storageRepository) {
    this.fileRepository = fileRepository
    this.storageRepository = storageRepository
    this.uuidUtils = new UUIDUtils()
    this.fileValidator = new FileValidator()
  }

  getFiles = async () => {
    try {
      const Files = await this.FileRepository.getAll()
      return { Total: Files.length, Files }
    } catch (error) {
      return new Error('No hay Archivos para Mostrar')
    }
  }

  findFile = async (uuid) => {
    try {
      const File = new FileEntity(await this.FileRepository.findOne(uuid))
      return File.generateFile()
    } catch (error) {
      return new Error('No se logro encontrar la Tarea')
    }
  }

  uploadFile = async ({ body, files = null }) => {
    try {
      const { name } = body
      this.fileValidator.validateFile(files.file)
      const fileUploaded = this.storageRepository.uploadFile(files.file)
      const uuid = this.uuidUtils.generate()
      const File = new FileEntity({
        uuid,
        name,
        format,
        url
      })
      await this.FileRepository.createOne(File.generateFile())
      return File.generateFile()
    } catch (error) {
      console.log(error)
      return new Error('No se pudo Crear La Tarea')
    }
  }

  deleteFile = async (uuid) => {
    try {
      const FiletoDeleted = new FileEntity(
        await this.FileRepository.findOne(uuid)
      )

      await this.FileRepository.deleteOne(uuid)
      return FiletoDeleted.generateFile()
    } catch (error) {
      return new Error('No se pudo Borrar la Tarea')
    }
  }
}
