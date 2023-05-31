export default class TagTaskEntity {
  constructor(uuid, taskUUID, tagUUID) {
    this.uuid = uuid
    this.taskUUID = taskUUID
    this.tagUUID = tagUUID
  }

  /**
   * Generates and returns a frozen object representing the tag-task relationship.
   * @returns {Object} - Frozen object representing the tag-task relationship.
   */
  generatetagtask = () => {
    const TagTask = {
      uuid: this.uuid,
      taskUUID: this.taskUUID,
      tagUUID: this.tagUUID,
    }
    return Object.freeze(TagTask)
  }
}
