export default class FileValidator {
  constructor() {
    this.allowedFormats = ['pdf', 'png', 'jpg', 'jpeg']
    this.maxSize = 5 * 1024 * 1024
  }

  /**
   * Validates the file format and size.
   * @param {Object} file - File object.
   * @param {string} file.mimetype - File mimetype.
   * @param {number} file.size - File size in bytes.
   * @returns {string} - Returns the file format if valid.
   * @throws {Error} - Throws an error if the file format or size is invalid.
   */
  validateFile({ mimetype, size }) {
    const format = mimetype.split('/')[1]
    if (!(this.allowedFormats.includes(format) && this.maxSize > size)) {
      throw new Error(
        'Solo se pueden Subir Archivos PDF, PNG y JPG menores a 5MB'
      )
    }
    return format
  }
}
