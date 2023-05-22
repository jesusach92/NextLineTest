export class TaskShareEntity {
  constructor(userID, userUUID, taskID, taskUUID, responsible, uuid) {
    this.userID = userID
    this.taskID = taskID
    this.responsible = responsible
    this.uuid = uuid
    this.taskUUID = taskUUID
    this.userUUID = userUUID
  }

  generateTaskShare = () => {
    const TaskShare = {
      userID: this.userID,
      userUUID: this.userUUID,
      taskID: this.taskID,
      taskUUID: this.taskUUID,

      responsible: this.responsible,
      uuid: this.uuid
    }
    return Object.freeze(TaskShare)
  }
}
