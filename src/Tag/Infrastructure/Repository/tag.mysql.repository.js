import { MySQLConnection } from '../db/MySQL/myslq.config.js'

export default class MySQLTagRepository {
  constructor() {
    this.MySQL = new MySQLConnection()
  }

  /**
   * Retrieves all tags from the database.
   * @returns {Array} An array of tags.
   * @throws {Error} If an error occurs while querying the database.
   */
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

  /**
   * Retrieves a specific tag by UUID from the database.
   * @param {string} uuid - The UUID of the tag.
   * @returns {object} The tag object.
   * @throws {Error} If the tag is not found or an error occurs while querying the database.
   */
  findOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[tag]] = await db.query(
        'SELECT tag, uuid FROM tags WHERE uuid= ?;',
        [uuid]
      )
      await db.end()
      if (!tag) {
        throw new ReferenceError('Tag not found')
      }
      return tag
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Finds a tag by name in the database.
   * @param {string} tag - The name of the tag.
   * @returns {string} The UUID of the tag.
   * @throws {ReferenceError} If the tag is not found.
   * @throws {Error} If an error occurs while querying the database.
   */
  findTagByname = async (tag) => {
    try {
      const db = await this.MySQL.createConnection()
      const [[uuid]] = await db.query('SELECT uuid from tags WHERE tag = ?', [
        tag,
      ])
      if (!uuid) throw new ReferenceError('Tag does not exist')
      return uuid
    } catch (error) {
      if (error instanceof ReferenceError)
        throw new ReferenceError(error.message)
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Creates a new tag in the database.
   * @param {object} tag - The tag object to create.
   * @throws {Error} If an error occurs while querying the database.
   */
  createOne = async (tag) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query('INSERT INTO tags SET ?;', [tag])
      await db.end()
      if (ResultSetHeader && ResultSetHeader.insertId === 0) {
        throw new Error('Tag not created')
      }
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  /**
   * Updates a tag in the database.
   * @param {string} uuid - The UUID of the tag to update.
   * @param {string} tag - The updated tag name.
   * @throws {Error} If an error occurs while querying the database.
   */
  updateOne = async (uuid, tag) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'UPDATE tags SET tag= ? WHERE uuid = ?',
        [tag, uuid]
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
   * Deletes a tag from the database.
   * @param {string} uuid - The UUID of the tag to delete.
   * @returns {string} The UUID of the deleted tag.
   * @throws {Error} If the tag is not found or an error occurs while querying the database.
   */
  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader] = await db.query(
        'DELETE FROM tags WHERE uuid=?',
        [uuid]
      )
      await db.end()
      if (ResultSetHeader.affectedRows === 0) {
        throw new Error('Tag not found for deletion')
      }
      return uuid
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  }
}
