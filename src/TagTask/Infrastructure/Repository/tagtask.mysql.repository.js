import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLTagTaskRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Retrieves all tag-task relationships associated with a task from the MySQL database.
   * @param {string} uuidTask - The UUID of the task.
   * @returns {Promise<Array>} - A promise that resolves to an array of tag-task relationships.
   * @throws {Error} - If there is an error while retrieving the data.
   */
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

  /**
   * Retrieves a specific tag-task relationship from the MySQL database.
   * @param {string} uuid - The UUID of the tag-task relationship.
   * @returns {Promise<Object>} - A promise that resolves to the tag-task relationship.
   * @throws {Error} - If the tag-task relationship is not found or there is an error while retrieving the data.
   */
  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[tagtask]] = await db.query(
        'SELECT uuid, taskUUID, tagUUID FROM tasktags WHERE uuid= ?;',
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

  /**
   * Creates a new tag-task relationship in the MySQL database.
   * @param {Object} tagtask - The tag-task relationship object.
   * @throws {Error} - If the tag-task relationship cannot be created or there is an error while saving the data.
   */
  createOne = async (tagtask) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO tasktags SET ?;', [
        tagtask,
      ])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Tag no Asignada')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Deletes a tag-task relationship from the MySQL database.
   * @param {string} uuid - The UUID of the tag-task relationship to delete.
   * @throws {Error} - If the tag-task relationship cannot be deleted or there is an error while deleting the data.
   */
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
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
