import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import FileEntity from '../Domain/File.entity.js'
import FileValidator from './file.validator.js'

export default class FileUseCases {
  constructor(fileRepository, storageRepository) {
    this.fileRepository = fileRepository
    this.storageRepository = storageRepository
    this.uuidUtils = new UUIDUtils()
    this.fileValidator = new FileValidator()
  }

  getFiles = async () => {
    try {
      const Files = await this.fileRepository.getAll()
      if (Array.isArray(Files) && Files.length > 0)
        return { Total: Files.length, Files }
      return new Error('No hay Archivos Almacenados')
    } catch (error) {
      console.log(error)
      return new Error('No hay Archivos para Mostrar')
    }
  }

  findFile = async (uuid) => {
    try {
      const File = new FileEntity(await this.fileRepository.findOne(uuid))
      return File.generateFile()
    } catch (error) {
      return new Error('No se logro encontrar la Archivo')
    }
  }

  uploadFile = async ({ body, files = null, userSession }) => {
    try {
      if (files) {
        const { name = `${userSession.userUUID}-${Date.now()}` } = body
        const format = this.fileValidator.validateFile(files.file)
        const url = await this.storageRepository.uploadFile({
          name,
          ...files.file,
        })
        const uuid = this.uuidUtils.generate()
        const File = new FileEntity({
          uuid,
          name,
          format,
          url,
        })
        await this.fileRepository.createOne(File.generateFile())
        return File.generateFile()
      }
      return new Error('No hay archivo para subir')
    } catch (error) {
      console.log(error)
      return new Error('No se logro cargar el Archivo')
    }
  }

  deleteFile = async (uuid) => {
    try {
      const FiletoDeleted = new FileEntity(
        await this.fileRepository.findOne(uuid)
      )
      await this.storageRepository.deleteFile(FiletoDeleted.url)
      await this.fileRepository.deleteOne(uuid)
      return {
        Messsage: 'Archivo Borrado con Exito',
        File: FiletoDeleted.generateFile(),
      }
    } catch (error) {
      return new Error('No se pudo Borrar la Archivo')
    }
  }
}
