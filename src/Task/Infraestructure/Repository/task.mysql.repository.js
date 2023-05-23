import { MySQLConnection } from '../db/MySQL/myslq.config.js'
import { MySQLUtils } from '../db/MySQL/mysql.utils.js'

export class MySQLTaskRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async (params) => {
    try {
      const db = await this.MySQL.createConnection()
      const [tasks] = await db.query('SELECT * FROM tasks;')
      db.end()
      return tasks
    } catch (e) {
      throw new Error('Error Desconocido')
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[task]] = await db.query('SELECT * FROM tasks WHERE uuid= ?;', [
        uuid
      ])
      await db.end()
      if (!task) {
        throw new Error('Tarea no Encontrada')
      }
      return task
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  createOne = async (task) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO tasks SET ?;', [
        task
      ])
      await db.end()
      if (!task) {
        throw new Error('Tarea no Creada')
      }
      return { id: ResultSetHeader.insertId, ...task }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  updateOne = async (uuid, fieldToUpdate) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE tasks SET ? WHERE uuid = ?',
        [fieldToUpdate, uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo Actualizar')
      }
      return uuid
    } catch (error) {
      return new Error('Error Inesperado')
    }
  }

  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM tasks WHERE uuid=?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo borrar')
      }
      return uuid
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
