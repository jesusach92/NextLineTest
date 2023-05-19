export class TaskShareEntity {
  constructor({ uuid, userID, taskID }) {
    this.userID = userID
    this.taskID = taskID
    this.uuid = uuid
  }

  generateTaskShare = () => {
    const TaskShare = {
      uuid: this.uuid,
      userID: this.userID,
      taskID: this.taskID
    }
    return Object.freeze(TaskShare)
  }
}
