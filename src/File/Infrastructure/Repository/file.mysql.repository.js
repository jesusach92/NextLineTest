import { MySQLConnection } from '../db/MySQL/myslq.config.js'
import { MySQLUtils } from '../db/MySQL/mysql.utils.js'

export class MySQLFileRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async () => {
    try {
      const db = await this.MySQL.createConnection()
      const [files] = await db.query(
        'SELECT uuid, name, format, url  FROM files;'
      )
      db.end()
      return files
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[file]] = await db.query('SELECT * FROM files WHERE uuid= ?;', [
        uuid
      ])
      await db.end()
      if (!file) {
        throw new Error('Archivo no Encontrado')
      }
      return file
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  createOne = async (file) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO files SET ?;', [
        file
      ])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error(`Error de BD el archivo se encuentra en ${file.url}`)
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  updateOne = async (uuid, file) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE files SET file= ? WHERE uuid = ?',
        [file, uuid]
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
        'DELETE FROM files WHERE uuid=?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se encontro Archivo para Borrar')
      }
      return uuid
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
