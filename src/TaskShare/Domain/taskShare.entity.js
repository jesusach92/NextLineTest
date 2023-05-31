/**
 * Represents a TaskShare entity.
 */
export default class TaskShareEntity {
  /**
   * Constructor of TaskShareEntity.
   * @param {string} userUUID - User UUID.
   * @param {string} taskUUID - Task UUID.
   * @param {string} uuid - UUID of the task share.
   */
  constructor(userUUID, taskUUID, uuid) {
    this.uuid = uuid
    this.taskUUID = taskUUID
    this.userUUID = userUUID
  }

  /**
   * Generates a task share object with the entity's properties.
   * @returns {Object} - Frozen task share object.
   */
  generateTaskShare = () => {
    const TaskShare = {
      userUUID: this.userUUID,
      taskUUID: this.taskUUID,
      uuid: this.uuid,
    }
    return Object.freeze(TaskShare)
  }
}
