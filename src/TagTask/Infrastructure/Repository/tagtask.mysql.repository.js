import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export class MySQLTagTaskRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  getAll = async (uuidTask) => {
    try {
      const db = await this.MySQL.createConnection()
      const [tagtasks] = await db.query(
        'SELECT * FROM tasktags WHERE taskUUID;'
      )
      db.end()
      return tagtasks
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[tagtask]] = await db.query(
        'SELECT * FROM tasktags WHERE uuid= ?;',
        [uuid]
      )
      await db.end()
      if (!tagtask) {
        throw new Error('Tag no Encontrada')
      }
      return tagtask
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  createOne = async (tagtask) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO tasktags SET ?;', [
        tagtask
      ])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Tag no Asignada')
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
        'DELETE FROM tasktags WHERE uuid=?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo borrar')
      }
      return uuid
    } catch (error) {
      return error
    }
  }
}
