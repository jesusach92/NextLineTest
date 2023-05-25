export default class TagTaskEntity {
  constructor(uuid, taskUUID, tagUUID) {
    this.uuid = uuid
    this.taskUUID = taskUUID
    this.tagUUID = tagUUID
  }

  generatetagtask = () => {
    const TagTask = {
      uuid: this.uuid,
      taskUUID: this.taskUUID,
      tagUUID: this.tagUUID
    }
    return Object.freeze(TagTask)
  }
}
