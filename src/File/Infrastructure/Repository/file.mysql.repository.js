import { MySQLConnection } from '../db/MySQL/myslq.config.js'
import { MySQLUtils } from '../db/MySQL/mysql.utils.js'

export class MySQLFileRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async (params) => {
    try {
      const db = await this.MySQL.createConnection()
      const [files] = await db.query('SELECT uuid, file FROM files;')
      db.end()
      return files
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[file]] = await db.query(
        'SELECT file, uuid FROM files WHERE uuid= ?;',
        [uuid]
      )
      await db.end()
      if (!file) {
        throw new Error('file no Encontrada')
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
        throw new Error('file no Creada')
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
        throw new Error('No se encontro Etiqueta para Borrar')
      }
      return uuid
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
