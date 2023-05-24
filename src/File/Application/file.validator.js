export class FileValidator {
  constructor() {
    this.allowedFormats = ['pdf', 'png', 'jpg']
    this.maxSize = 5 * 1024 * 1024
  }

  validateFile({ mimetype, size }) {
    const format = mimetype.split('/')[1]
    if (!(this.allowedFormats.includes(format) && this.maxSize > size))
      throw new Error(
        'Solo se pueden Subir Archivos PDF,PNG y JPG menores a 5MB'
      )
    return format
  }
}
