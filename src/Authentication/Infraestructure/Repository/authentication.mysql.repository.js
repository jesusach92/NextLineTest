import { MySQLConnection } from '../db/MySQL/myslq.config.js'
import { MySQLUtils } from '../db/MySQL/mysql.utils.js'

export class MySQLAuthenticationRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  findOne = async (token) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[tokenValid]] = await db.query(
        'SELECT * FROM tokensvalid WHERE token= ?;',
        [token]
      )
      await db.end()
      if (!tokenValid) {
        throw new Error('Token no Encontrado')
      }
      return tokenValid
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  createOne = async (token) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'INSERT INTO tokensvalid SET ?;',
        [token]
      )
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Token no Guardado')
      }
      return true
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  deleteOne = async (token) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM tokensvalid WHERE token=?',
        [token]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo borrar el Token')
      }
      return token
    } catch (error) {
      throw new Error()
    }
  }
}
