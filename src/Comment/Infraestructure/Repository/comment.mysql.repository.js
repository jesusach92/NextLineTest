import { MySQLConnection } from '../../Infrastructure/db/MySQL/myslq.config.js'
import { MySQLUtils } from '../../Infrastructure/db/MySQL/mysql.utils.js'

export class MySQLCommentRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async (uuidTask) => {
    try {
      const db = await this.MySQL.createConnection()
      const [comments] = await db.query(
        'SELECT * FROM comments WHERE uuidTask = ?;',
        [uuidTask]
      )
      db.end()
      if (Array.isArray(comments) && comments.length === 0)
        throw new Error('No se encontraron Comentarios')
      return comments
    } catch (e) {
      throw new Error('Error Desconocido')
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[comment]] = await db.query(
        'SELECT * FROM comments WHERE uuid= ?;',
        [uuid]
      )
      await db.end()
      if (!comment) {
        throw new Error('Tarea no Encontrada')
      }
      return comment
    } catch (error) {
      return error
    }
  }

  createOne = async (comment) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO comments SET ?;', [
        comment
      ])
      await db.end()
      if (!comment) {
        throw new Error('Tarea no Creada')
      }
      return { id: ResultSetHeader.insertId, ...comment }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

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
      return uuid
    } catch (error) {
      console.log(error)
      return new Error('Error Inesperado')
    }
  }

  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM comments WHERE uuid=?',
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
