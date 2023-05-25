import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export class MySQLTaskShareRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  getAllTasksIDS = async () => {
    try {
      const db = await this.MySQL.createConnection()
      const [taskshared] = await db.query(
        'SELECT DISTINCT taskUUID from taskshared'
      )
      db.end()
      return taskshared
    } catch (e) {
      throw Error('Error Desconocido')
    }
  }

  getOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[taskShared]] = await db.query(
        'SELECT * FROM taskshared WHERE uuid = ?',
        [uuid]
      )
      return taskShared
    } catch (error) {
      throw new Error('Error Inesperado')
    }
  }

  getByTask = async (id) => {
    try {
      const db = await this.MySQL.createConnection()
      const [usersShared] = await db.query(
        'SELECT * FROM tasksharedview WHERE taskID = ?',
        [id]
      )
      db.end()
      return usersShared
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  getByUser = async (id) => {
    try {
      const db = await this.MySQL.createConnection()
      const usersShared = await db.query(
        'SELECT * FROM tasksharedview WHERE sharedUserID = ?',
        [id]
      )
      db.end()
      return usersShared
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  createOne = async (taskshareEntity) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'INSERT INTO taskshared SET ?;',
        [taskshareEntity]
      )
      await db.end()
      if (!ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Tarea no Compartida')
      }
      return taskshareEntity
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  updateOne = async (id, responsible) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE taskshared SET responsible = ? WHERE id = ?',
        [responsible, id]
      )
      await db.end()

      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo Actualizar')
      }
      return id
    } catch (error) {
      console.log(error)
      throw new Error(error.sqlMessage)
    }
  }

  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM taskshared WHERE uuid=?',
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
