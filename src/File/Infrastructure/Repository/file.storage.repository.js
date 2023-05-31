import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'

export default class StorageFileRepository {
  constructor() {
    this.__dirname = fileURLToPath(new URL('.', import.meta.url))
    this.pathDirectory =
      process.env.PATH_DEV ||
      path.join(this.__dirname.split('src')[0], 'docs', 'uploads')
  }

  /**
   * Uploads a file to the storage.
   * @param {Object} file - File object to be uploaded.
   * @returns {string} - Path of the uploaded file.
   * @throws {Error} - If there's an error uploading the file.
   */
  uploadFile = async (file) => {
    try {
      const uploadPath = path.join(this.pathDirectory, file.name)
      await file.mv(uploadPath)
      return uploadPath
    } catch (error) {
      throw new Error(error.message)
    }
  }

  /**
   * Deletes a file from the storage.
   * @param {string} url - URL of the file to be deleted.
   * @throws {Error} - If there's an error deleting the file.
   */
  deleteFile = async (url) => {
    try {
      await fs.unlink(url)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
