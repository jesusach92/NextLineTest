import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLUserRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Retrieves all users from the database.
   * @param {Object} params - Additional parameters for filtering users (not used in this implementation).
   * @returns {Array} - Array of users containing their name, email, userType, and uuid.
   * @throws {Error} - If an unknown error occurs during the database query.
   */
  getAll = async (params) => {
    try {
      const db = await this.MySQL.createConnection()
      const [users] = await db.query(
        'SELECT name, email, userType, uuid FROM users;'
      )
      db.end()
      return users
    } catch (e) {
      throw new Error('Unknown error')
    }
  }

  /**
   * Retrieves a single user from the database by UUID.
   * @param {string} uuid - The UUID of the user to find.
   * @returns {Object} - The user object containing all user data.
   * @throws {Error} - If the user is not found or an error occurs during the database query.
   */
  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[user]] = await db.query('SELECT * FROM users WHERE uuid= ?;', [
        uuid,
      ])
      await db.end()
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Retrieves a single user from the database by email.
   * @param {string} email - The email of the user to find.
   * @returns {Object} - The user object containing all user data.
   * @throws {Error} - If the user is not found or an error occurs during the database query.
   */
  findUserByEmail = async (email) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[user]] = await db.query('SELECT * FROM users WHERE email= ?;', [
        email,
      ])
      await db.end()
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Creates a new user in the database.
   * @param {Object} user - The user object to create.
   * @throws {Error} - If the user creation fails or an error occurs during the database query.
   */
  createOne = async (user) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO users SET ?;', [
        user,
      ])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('User not created')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Updates a user in the database by UUID.
   * @param {string} uuid - The UUID of the user to update.
   * @param {Object} fieldToUpdate - The fields to update on the user.
   * @throws {Error} - If the user update fails or an error occurs during the database query.
   */
  updateOne = async (uuid, fieldToUpdate) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE users SET ? WHERE uuid = ?',
        [fieldToUpdate, uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('Update failed')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Deletes a user from the database by UUID.
   * @param {string} uuid - The UUID of the user to delete.
   * @returns {string} - The UUID of the deleted user.
   * @throws {Error} - If the user deletion fails or an error occurs during the database query.
   */
  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM users WHERE uuid=?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('Deletion failed')
      }
      return uuid
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
