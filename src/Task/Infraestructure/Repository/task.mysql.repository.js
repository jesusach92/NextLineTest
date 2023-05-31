import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLTaskRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Retrieves all tasks from the database.
   * @returns {Promise<Array>} Array of tasks.
   */
  getAll = async () => {
    try {
      const db = await this.MySQL.createConnection()
      const [tasks] = await db.query(
        'SELECT uuid, title, description, status, dueDate, isPublic, createdBy FROM tasks;'
      )
      db.end()
      return tasks
    } catch (e) {
      throw new Error('Error Desconocido')
    }
  }

  /**
   * Retrieves public tasks from the database.
   * @returns {Promise<Array>} Array of public tasks.
   */
  getPublicTasks = async () => {
    try {
      const db = await this.MySQL.createConnection()
      const [tasks] = await db.query(
        'SELECT uuid, title, description, status, dueDate, createdBy FROM tasks WHERE isPublic = true;'
      )
      db.end()
      if (Array.isArray(tasks) && tasks.length === 0)
        throw new Error('No hay Tareas Publicas')
      return tasks
    } catch (error) {
      console.log(error.sqlMessage)
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Retrieves a single task from the database by its UUID.
   * @param {string} uuid - Task UUID.
   * @returns {Promise<Object>} Task object.
   */
  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[task]] = await db.query('SELECT * FROM tasks WHERE uuid= ?;', [
        uuid,
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

  /**
   * Creates a new task in the database.
   * @param {Object} task - Task object.
   */
  createOne = async (task) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO tasks SET ?;', [
        task,
      ])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Tarea no Creada')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Updates a task in the database.
   * @param {string} uuid - Task UUID.
   * @param {Object} fieldToUpdate - Field and value to update.
   * @returns {string} Updated task UUID.
   */
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

  /**
   * Deletes a task from the database.
   * @param {string} uuid - Task UUID.
   */
  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM tasks WHERE uuid=?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader && ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo borrar la Tarea')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
