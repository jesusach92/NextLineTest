import { MySQLConnection } from '../db/MySQL/myslq.config.js'
import { MySQLUtils } from '../db/MySQL/mysql.utils.js'

export class MySQLUserRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async (params) => {
    try {
      const db = await this.MySQL.createConnection()
      const [users] = await db.query('SELECT * FROM users;')
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
      return error
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
      return error
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
      return user
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
      return uuid
    } catch (error) {
      return new Error('Error Inesperado')
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
      return error
    }
  }
}
