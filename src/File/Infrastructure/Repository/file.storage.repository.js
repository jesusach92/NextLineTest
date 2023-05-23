import 'dotenv/config'
import * as url from 'url'

export class StoregeFileRepository {
  constructor() {
    this.__dirname = url.fileURLToPath(new URL('.', import.meta.url))
    this.pathDirectory = process.config.PATH_DEV || this.__dirname
  }

  getAll = async (params) => {
    try {
      const db = await this.MySQL.createConnection()
      const [tags] = await db.query('SELECT uuid, tag FROM tags;')
      db.end()
      return tags
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[tag]] = await db.query(
        'SELECT tag, uuid FROM tags WHERE uuid= ?;',
        [uuid]
      )
      await db.end()
      if (!tag) {
        throw new Error('Tag no Encontrada')
      }
      return tag
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  uploadFile = async (file) => {
    try {
      console.log(this.__dirname)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  updateOne = async (uuid, tag) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE tags SET tag= ? WHERE uuid = ?',
        [tag, uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo Actualizar')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM tags WHERE uuid=?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se encontro Etiqueta para Borrar')
      }
      return uuid
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
