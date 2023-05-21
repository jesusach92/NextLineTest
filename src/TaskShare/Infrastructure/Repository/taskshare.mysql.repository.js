import { MySQLConnection } from '../db/MySQL/myslq.config.js'
import { MySQLUtils } from '../db/MySQL/mysql.utils.js'

export class MySQLTaskShareRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async (params) => {
    try {
      const queryUtils = new MySQLUtils('taskshared')
      const query = queryUtils.execute(params)
      const db = await this.MySQL.createConnection()
      const [taskshares] = await db.query('SELECT * FROM taskshared;')
      db.end()
      return taskshares
    } catch (e) {
      throw new Error('Error Desconocido')
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[taskshare]] = await db.query(
        'SELECT * FROM taskshares WHERE uuid= ?;',
        [uuid]
      )
      await db.end()
      if (!taskshare) {
        throw new Error('Usuario no Encontrado')
      }
      return taskshare
    } catch (error) {
      return error
    }
  }

  createOne = async (taskshare) => {
    console.log(taskshare)
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'INSERT INTO taskshared SET ?;',
        [taskshare]
      )
      await db.end()
      if (ResultSetHeader || ResultSetHeader.insertId === 0) {
        throw new Error('Usuario no Creado')
      }
      return taskshare
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  updateOne = async (uuid, fieldToUpdate) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE taskshares SET ? WHERE uuid = ?',
        [fieldToUpdate, uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo Actualizar')
      }
      return uuid
    } catch (error) {
      console.log(error)
      return new Error('Error Inesperado')
    }
  }

  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM taskshares WHERE uuid=?',
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
