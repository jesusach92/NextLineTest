export default class TagTaskEntity {
  constructor(uuid, taskID, taskUUID, tagID, tagUUID) {
    this.uuid = uuid
    this.taskID = taskID
    this.taskUUID = taskUUID
    this.taskID = tagID
    this.tagUUID = tagUUID
  }

  generatetagtask = () => {
    const TagTask = {
      name: this.name,
      email: this.email,
      tagtaskType: this.tagtaskType,
      password: this.password,
      uuid: this.uuid
    }
    return Object.freeze(TagTask)
  }
}
