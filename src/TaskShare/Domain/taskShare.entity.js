export class TaskShareEntity {
  constructor(userID, taskID) {
    this.userID = userID
    this.taskID = taskID
  }

  generateTaskShare = () => {
    const TaskShare = {
      userID: this.userID,
      taskID: this.taskID
    }
    return Object.freeze(TaskShare)
  }
}
