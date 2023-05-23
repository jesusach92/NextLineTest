export default class TagTaskEntity {
  constructor(uuid, taskID, taskUUID, tagID, tagUUID) {
    this.uuid = uuid
    this.taskID = taskID
    this.taskUUID = taskUUID
    this.tagID = tagID
    this.tagUUID = tagUUID
  }

  generatetagtask = () => {
    const TagTask = {
      uuid: this.uuid,
      taskID: this.taskID,
      taskUUID: this.tagUUID,
      tagID: this.tagID,
      tagUUID: this.tagUUID
    }
    return Object.freeze(TagTask)
  }
}
