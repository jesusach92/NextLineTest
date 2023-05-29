import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLTagRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  getAll = async () => {
    try {
      const db = await this.MySQL.createConnection()
      const [tags] = await db.query('SELECT uuid, tag FROM tags;')
      db.end()
      return tags
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[tag]] = await db.query(
        'SELECT tag, uuid FROM tags WHERE uuid= ?;',
        [uuid]
      )
      await db.end()
      if (!tag) {
        throw new ReferenceError('Tag no Encontrada')
      }
      return tag
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  findTagByname = async (tag) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[uuid]] = await db.query('SELECT uuid from tags WHERE tag = ?', [
        tag,
      ])
      if (!uuid) throw new ReferenceError('No existe la etiqueta')
      return uuid
    } catch (error) {
      if (error instanceof ReferenceError)
        throw new ReferenceError(error.message)
      throw new Error(error.sqlMessage)
    }
  }

  createOne = async (tag) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO tags SET ?;', [tag])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Tag no Creada')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  updateOne = async (uuid, tag) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE tags SET tag= ? WHERE uuid = ?',
        [tag, uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo Actualizar')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM tags WHERE uuid=?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('No se encontro Etiqueta para Borrar')
      }
      return uuid
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
