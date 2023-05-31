export default class FileTaskEntity {
  constructor(uuid, taskUUID, fileUUID) {
    this.uuid = uuid
    this.taskUUID = taskUUID
    this.fileUUID = fileUUID
  }

  /**
   * Generates a frozen file task object.
   * @returns {Object} - Frozen file task object.
   */
  generateFile = () => {
    const fileTask = {
      uuid: this.uuid,
      taskUUID: this.taskUUID,
      fileUUID: this.fileUUID,
    }
    return Object.freeze(fileTask)
  }
}
