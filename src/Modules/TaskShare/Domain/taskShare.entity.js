export default class TaskShareEntity {
  constructor(userUUID, taskUUID, uuid) {
    this.uuid = uuid
    this.taskUUID = taskUUID
    this.userUUID = userUUID
  }

  generateTaskShare = () => {
    const TaskShare = {
      userUUID: this.userUUID,
      taskUUID: this.taskUUID,
      uuid: this.uuid,
    }
    return Object.freeze(TaskShare)
  }
}
