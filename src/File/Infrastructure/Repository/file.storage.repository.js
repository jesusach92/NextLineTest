import 'dotenv/config'
import path from 'path'
import * as url from 'url'
import * as fs from 'fs/promises'

export class StoregeFileRepository {
  constructor() {
    this.__dirname = url.fileURLToPath(new URL('.', import.meta.url))
    this.pathDirectory =
      process.config.PATH_DEV ||
      path.join(this.__dirname.split('src')[0], 'docs', 'uploads')
  }

  uploadFile = async (file) => {
    try {
      const uploadPath = path.join(this.pathDirectory, file.name)
      file.mv(uploadPath, (err) => {
        if (err) throw new Error(err.message)
      })
      return uploadPath
    } catch (error) {
      throw new Error(error.message)
    }
  }

  deleteFile = async (url) => {
    try {
      await fs.unlink(url)
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
