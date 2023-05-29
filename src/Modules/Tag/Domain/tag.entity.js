export default class TagEntity {
  constructor(uuid, tag) {
    this.uuid = uuid
    this.tag = tag
  }

  generateTag = () => {
    const Tag = {
      uuid: this.uuid,
      tag: this.tag
    }
    return Object.freeze(Tag)
  }
}
