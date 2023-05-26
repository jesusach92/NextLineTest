import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export class MySQLTaskShareRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  getAllTasksShared = async () => {
    try {
      const db = await this.MySQL.createConnection()
      const [taskshared] = await db.query(
        'SELECT count(taskUUID)as usersShared, taskUUID from taskshared group by taskUUID;'
      )
      db.end()
      return taskshared
    } catch (e) {
      throw Error('Error Desconocido')
    }
  }

  getResponsible = async (taskUUID)=>{
    try {
      const db = await this.MySQL.createConnection()
      const [[userResponsible]] = await db.query(
        'SELECT responsible, uuid, userUUID from taskshared WHERE taskUUID = ? and responsible = true;',
      [taskUUID])
      db.end()
      return userResponsible
    } catch (e) {
      console.log(e)
      throw Error('Error Desconocido')
    }
  }

  getRelation = async (userUUID, taskUUID) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[taskShared]] = await db.query(
        'SELECT responsible, uuid, taskUUID, userUUID FROM taskshared WHERE taskUUID = ? AND userUUID = ?;',
        [taskUUID, userUUID]
      )
      return taskShared
    } catch (error) {
      throw new Error('Error Inesperado')
    }
  }

  getByTask = async (taskUUID) => {
    try {
      const db = await this.MySQL.createConnection()
      const [usersShared] = await db.query(
        'SELECT userUUID, responsible FROM taskshared WHERE taskUUID = ?;',
        [taskUUID]
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

  updateResponsible = async (userUUID, isResponsible) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE taskshared SET responsible = ? WHERE userUUID = ?;',
        [isResponsible, userUUID]
      )
      await db.end()
     
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo Actualizar')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  stopSharewithUser = async (taskUUID, userUUID) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM taskshared WHERE taskUUID=? AND userUUID = ?;',
        [taskUUID,userUUID]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo borrar')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

stopShareTask = async (taskUUID) => {
  try {
    const db = await this.MySQL.createConnection()
    const [ResultSetHeader] = await db.query(
      'DELETE FROM taskshared WHERE taskUUID=?;',
      [taskUUID]
    )
    await db.end()
    if (ResultSetHeader.affectedRows === 0) {
      throw new Error('No se pudo borrar')
    }
  } catch (error) {
    throw new Error(error.sqlMessage)
  }
}
}