/**
 * This class represents the repository for authentication data in MySQL database.
 * It provides methods for finding, creating, and deleting tokens.
 */

import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLAuthenticationRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Finds a token in the database.
   * @param {string} token - The token to find.
   * @returns {Object} - Returns the found token or throws an error if not found.
   */
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

  /**
   * Creates a new token in the database.
   * @param {Object} token - The token object to create.
   * @returns {boolean} - Returns true if the token was successfully created, or throws an error if not.
   */
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

  /**
   * Deletes a token from the database.
   * @param {string} token - The token to delete.
   * @returns {string} - Returns the deleted token or throws an error if it could not be deleted.
   */
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
