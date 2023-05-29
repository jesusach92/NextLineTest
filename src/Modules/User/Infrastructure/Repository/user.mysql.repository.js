import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLUserRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  getAll = async (params) => {
    try {
      const db = await this.MySQL.createConnection()
      const [users] = await db.query(
        'SELECT name, email, userType, uuid FROM users;'
      )
      db.end()
      return users
    } catch (e) {
      throw new Error('Error Desconocido')
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[user]] = await db.query('SELECT * FROM users WHERE uuid= ?;', [
        uuid
      ])
      await db.end()
      if (!user) {
        throw new Error('Usuario no Encontrado')
      }
      return user
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  findUserByEmail = async (email) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[user]] = await db.query('SELECT * FROM users WHERE email= ?;', [
        email
      ])
      await db.end()
      if (!user) {
        throw new Error('Usuario no Encontrado')
      }
      return user
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  createOne = async (user) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO users SET ?;', [
        user
      ])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Usuario no Creado')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  updateOne = async (uuid, fieldToUpdate) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE users SET ? WHERE uuid = ?',
        [fieldToUpdate, uuid]
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
        'DELETE FROM users WHERE uuid=?',
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
