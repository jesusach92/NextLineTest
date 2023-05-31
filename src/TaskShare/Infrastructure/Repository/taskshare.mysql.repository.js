import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLTaskShareRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Retrieves all tasks shared.
   * @returns {Array} - Array of shared tasks.
   * @throws {Error} - If an error occurs.
   */
  getAllTasksShared = async () => {
    try {
      const db = await this.MySQL.createConnection()
      const [taskshared] = await db.query(
        'SELECT count(taskUUID) as usersShared, taskUUID FROM taskshared GROUP BY taskUUID;'
      )
      db.end()
      return taskshared
    } catch (e) {
      throw Error('Unknown Error')
    }
  }

  /**
   * Retrieves the responsible user for a task.
   * @param {string} taskUUID - Task UUID.
   * @returns {Object} - Responsible user object.
   * @throws {Error} - If an error occurs.
   */
  getResponsible = async (taskUUID) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[userResponsible]] = await db.query(
        'SELECT responsible, uuid, userUUID FROM taskshared WHERE taskUUID = ? AND responsible = true;',
        [taskUUID]
      )
      db.end()
      return userResponsible
    } catch (e) {
      console.log(e)
      throw Error('Unknown Error')
    }
  }

  /**
   * Retrieves the relation between a user and a task.
   * @param {string} userUUID - User UUID.
   * @param {string} taskUUID - Task UUID.
   * @returns {Object} - Relation object.
   * @throws {Error} - If an error occurs.
   */
  getRelation = async (userUUID, taskUUID) => {
    try {
      console.log(userUUID, taskUUID)
      const db = await this.MySQL.createConnection()
      const [[taskShared]] = await db.query(
        'SELECT responsible, uuid, taskUUID, userUUID FROM taskshared WHERE taskUUID = ? AND userUUID = ?;',
        [taskUUID, userUUID]
      )
      return taskShared
    } catch (error) {
      throw new Error('Unexpected Error')
    }
  }

  /**
   * Retrieves all users shared for a specific task.
   * @param {string} taskUUID - Task UUID.
   * @returns {Array} - Array of shared users.
   * @throws {Error} - If an error occurs.
   */
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

  /**
   * Creates a new task share entry.
   * @param {Object} taskshareEntity - Task share entity.
   * @returns {Object} - Created task share entity.
   * @throws {Error} - If an error occurs.
   */
  createOne = async (taskshareEntity) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'INSERT INTO taskshared SET ?;',
        [taskshareEntity]
      )
      await db.end()
      if (!ResultSetHeader || ResultSetHeader.insertId === 0) {
        throw new Error('Task not shared')
      }
      return taskshareEntity
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Updates the responsible status of a user for a task.
   * @param {string} userUUID - User UUID.
   * @param {boolean} isResponsible - Responsible status.
   * @throws {Error} - If an error occurs or the update fails.
   */
  updateResponsible = async (userUUID, isResponsible, taskUUID) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE taskshared SET responsible = ? WHERE userUUID = ? AND taskUUID = ?;',
        [isResponsible, userUUID, taskUUID]
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
   * Stops sharing a task with a specific user.
   * @param {string} taskUUID - Task UUID.
   * @param {string} userUUID - User UUID.
   * @throws {Error} - If an error occurs or the deletion fails.
   */
  stopSharewithUser = async (taskUUID, userUUID) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM taskshared WHERE taskUUID = ? AND userUUID = ?;',
        [taskUUID, userUUID]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('Deletion failed')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Stops sharing a task with all users.
   * @param {string} taskUUID - Task UUID.
   * @throws {Error} - If an error occurs or the deletion fails.
   */
  stopShareTask = async (taskUUID) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM taskshared WHERE taskUUID = ?;',
        [taskUUID]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('Deletion failed')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
