import { MySQLConnection } from '../../Infraestructure/db/MySQL/myslq.config.js'

export default class MySQLCommentRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Retrieves all comments for a specific task.
   * @param {string} uuidTask - Task UUID.
   * @returns {Array} - Returns an array of comments.
   */
  getAll = async (uuidTask) => {
    try {
      const db = await this.MySQL.createConnection()
      const [comments] = await db.query(
        'SELECT uuid, taskUUID, userUUID, comment FROM comments WHERE taskUUID = ?;',
        [uuidTask]
      )
      db.end()
      if (Array.isArray(comments) && comments.length === 0) {
        throw new Error('No se encontraron Comentarios')
      }
      return comments
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Retrieves a comment by UUID.
   * @param {string} uuid - Comment UUID.
   * @returns {Object} - Returns the comment object.
   */
  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[comment]] = await db.query(
        'SELECT uuid, taskUUID, userUUID, comment FROM comments WHERE uuid = ?;',
        [uuid]
      )
      await db.end()
      if (!comment) {
        throw new Error('Tarea no Encontrada')
      }
      return comment
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Creates a new comment.
   * @param {Object} comment - Comment object.
   */
  createOne = async (comment) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO comments SET ?;', [
        comment,
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
   * Updates a comment by UUID.
   * @param {string} uuid - Comment UUID.
   * @param {string} comment - Comment text.
   */
  updateOne = async (uuid, comment) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE comments SET comment = ? WHERE uuid = ?',
        [comment, uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo Actualizar')
      }
    } catch (error) {
      console.log(error.sqlMessage)
      throw new Error('Error Inesperado')
    }
  }

  /**
   * Deletes a comment by UUID.
   * @param {string} uuid - Comment UUID.
   */
  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM comments WHERE uuid = ?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo borrar el Comentario')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
