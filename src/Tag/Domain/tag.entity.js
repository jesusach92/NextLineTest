export default class TagEntity {
  constructor(uuid, tag) {
    this.uuid = uuid
    this.tag = tag
  }

  /**
   * Generates a tag object with UUID and tag name.
   * @returns {object} The generated tag object.
   */
  generateTag = () => {
    const Tag = {
      uuid: this.uuid,
      tag: this.tag,
    }
    return Object.freeze(Tag)
  }
}
