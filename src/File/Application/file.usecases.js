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

  /**
   * Retrieves all files.
   * @returns {Object|Error} - Returns an object containing the total number of files and the file array, or an error if no files are found.
   */
  getFiles = async () => {
    try {
      const Files = await this.fileRepository.getAll()
      if (Array.isArray(Files) && Files.length > 0) {
        return { Total: Files.length, Files }
      }
      return new Error('No hay Archivos Almacenados')
    } catch (error) {
      console.log(error)
      return new Error('No hay Archivos para Mostrar')
    }
  }

  /**
   * Finds a file by UUID.
   * @param {string} uuid - File UUID.
   * @returns {Object|Error} - Returns the file object or an error if the file is not found.
   */
  findFile = async (uuid) => {
    try {
      const File = new FileEntity(await this.fileRepository.findOne(uuid))
      return File.generateFile()
    } catch (error) {
      return new Error('No se logro encontrar la Archivo')
    }
  }

  /**
   * Uploads a file.
   * @param {Object} data - File data.
   * @param {Object} data.body - Request body containing the name of the file.
   * @param {Object} data.files - Uploaded file object.
   * @param {Object} data.userSession - User session data.
   * @returns {Object|Error} - Returns the uploaded file object or an error if the file upload fails.
   */
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

  /**
   * Deletes a file by UUID.
   * @param {string} uuid - File UUID.
   * @returns {Object|Error} - Returns a success message and the deleted file object, or an error if the file deletion fails.
   */
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
