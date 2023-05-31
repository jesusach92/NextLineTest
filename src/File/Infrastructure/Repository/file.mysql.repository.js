import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLFileRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Retrieves all files.
   * @returns {Array} - Array of files.
   * @throws {Error} - If there's an error retrieving the files from the database.
   */
  getAll = async () => {
    try {
      const db = await this.MySQL.createConnection()
      const [files] = await db.query(
        'SELECT uuid, name, format, url FROM files;'
      )
      db.end()
      return files
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Retrieves a specific file by its UUID.
   * @param {string} uuid - UUID of the file.
   * @returns {Object} - File object.
   * @throws {Error} - If there's an error retrieving the file from the database or the file is not found.
   */
  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[file]] = await db.query('SELECT * FROM files WHERE uuid = ?;', [
        uuid,
      ])
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
   * Creates a new file.
   * @param {Object} file - File object to be created.
   * @throws {Error} - If there's an error creating the file in the database.
   */
  createOne = async (file) => {
    try {
      const db = await this.MySQL.createConnection()
      const [resultSetHeader] = await db.query('INSERT INTO files SET ?;', [
        file,
      ])
      await db.end()
      if (resultSetHeader && resultSetHeader.insertId === 0) {
        throw new Error(`Error de BD el archivo se encuentra en ${file.url}`)
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Updates a file by its UUID.
   * @param {string} uuid - UUID of the file to be updated.
   * @param {Object} file - Updated file object.
   * @throws {Error} - If there's an error updating the file in the database.
   */
  updateOne = async (uuid, file) => {
    try {
      const db = await this.MySQL.createConnection()
      const [resultSetHeader] = await db.query(
        'UPDATE files SET file = ? WHERE uuid = ?',
        [file, uuid]
      )
      await db.end()
      if (resultSetHeader.affectedRows === 0) {
        throw new Error('No se pudo Actualizar')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Deletes a file by its UUID.
   * @param {string} uuid - UUID of the file to be deleted.
   * @throws {Error} - If there's an error deleting the file from the database.
   */
  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [resultSetHeader] = await db.query(
        'DELETE FROM files WHERE uuid = ?',
        [uuid]
      )
      await db.end()
      if (resultSetHeader.affectedRows === 0) {
        throw new Error('No se encontro Archivo para Borrar')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
