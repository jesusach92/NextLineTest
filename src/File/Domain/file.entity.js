/**
 * Represents a File entity.
 */
export default class FileEntity {
  /**
   * Constructor of FileEntity.
   * @param {Object} fileData - File data.
   */
  constructor({ uuid, name, format, url }) {
    this.uuid = uuid
    this.name = name
    this.format = format
    this.url = url
  }

  /**
   * Generates a file object with the entity's properties.
   * @returns {Object} - Frozen file object.
   */
  generateFile = () => {
    const File = {
      uuid: this.uuid,
      name: this.name,
      format: this.format,
      url: this.url,
    }
    return Object.freeze(File)
  }
}
