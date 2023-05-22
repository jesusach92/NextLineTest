export class CommentEntity {
  constructor(uuid, taskID, uuidTask, userID, uuidUser, comment) {
    this.uuid = uuid
    this.taskID = taskID
    this.uuidTask = uuidTask
    this.userID = userID
    this.uuidUser = uuidUser
    this.comment = comment
  }

  generateComment = () => {
    const Comment = {
      uuid: this.uuid,
      taskID: this.taskID,
      uuidTask: this.uuidTask,
      userID: this.userID,
      uuidUser: this.uuidUser,
      comment: this.comment
    }
    return Object.freeze(Comment)
  }
}
