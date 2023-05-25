export class TaskShareEntity {
  constructor(userUUID,  taskUUID, responsible, uuid) {
    this.responsible = responsible
    this.uuid = uuid
    this.taskUUID = taskUUID
    this.userUUID = userUUID
  }

  generateTaskShare = () => {
    const TaskShare = {
      userUUID: this.userUUID,
      taskUUID: this.taskUUID,
      responsible: this.responsible,
      uuid: this.uuid
    }
    return Object.freeze(TaskShare)
  }
}
