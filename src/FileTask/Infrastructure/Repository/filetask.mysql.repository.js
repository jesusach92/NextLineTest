import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLFileRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Finds the file task by task UUID.
   * @param {string} taskUUID - UUID of the task.
   * @returns {object} - File task object.
   * @throws {Error} - If the file task is not found.
   */
  findFileTask = async (taskUUID) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[file]] = await db.query(
        'SELECT * FROM taskfiles WHERE taskUUID= ?;',
        [taskUUID]
      )
      await db.end()
      if (!file) {
        throw new Error('Archivo no Encontrado')
      }
      return file
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Creates a file task.
   * @param {object} filetask - File task object to be created.
   * @throws {Error} - If there's an error creating the file task.
   */
  createOne = async (filetask) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO taskfiles SET ?;', [
        filetask,
      ])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error(`No se logro asignar el Archivo a la Tarea`)
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
