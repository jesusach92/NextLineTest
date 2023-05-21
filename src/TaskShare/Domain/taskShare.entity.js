export class TaskShareEntity {
  constructor(userID, taskID, responsible) {
    this.userID = userID
    this.taskID = taskID
    this.responsible = responsible
  }

  generateTaskShare = () => {
    const TaskShare = {
      userID: this.userID,
      taskID: this.taskID,
      responsible: this.responsible
    }
    return Object.freeze(TaskShare)
  }
}
