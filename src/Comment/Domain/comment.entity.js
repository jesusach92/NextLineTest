export default class CommentEntity {
  constructor(uuid, taskUUID, userUUID, comment) {
    this.uuid = uuid
    this.taskUUID = taskUUID
    this.userUUID = userUUID
    this.comment = comment
  }

  /**
   * Generates a comment object.
   * @returns {Object} - Returns a frozen comment object.
   */
  generateComment = () => {
    const Comment = {
      uuid: this.uuid,
      taskUUID: this.taskUUID,
      userUUID: this.userUUID,
      comment: this.comment,
    }
    return Object.freeze(Comment)
  }
}
