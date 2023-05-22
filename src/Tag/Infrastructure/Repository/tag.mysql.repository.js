import { MySQLConnection } from '../db/MySQL/myslq.config.js'
import { MySQLUtils } from '../db/MySQL/mysql.utils.js'

export class MySQLTagRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async (params) => {
    try {
      const db = await this.MySQL.createConnection()
      const [tags] = await db.query('SELECT * FROM tags;')
      db.end()
      return tags
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[tag]] = await db.query('SELECT * FROM tags WHERE uuid= ?;', [
        uuid
      ])
      await db.end()
      if (!tag) {
        throw new Error('Tag no Encontrada')
      }
      return tag
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  createOne = async (tag) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO tags SET ?;', [tag])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Tag no Creada')
      }
      return true
    } catch (error) {
      throw new Error(error.sqlMessage)
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
      return true
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
