export default class FileEntity {
  constructor({ uuid, name, format, url }) {
    this.uuid = uuid
    this.name = name
    this.format = format
    this.url = url
  }

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
