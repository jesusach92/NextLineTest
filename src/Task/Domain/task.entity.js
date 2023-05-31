export default class TaskEntity {
  /**
   * Constructor of TaskEntity.
   * @param {Object} taskData - Task data.
   */
  constructor({
    uuid,
    title,
    description,
    status,
    dueDate,
    isPublic,
    createdBy,
  }) {
    this.uuid = uuid
    this.title = title
    this.description = description
    this.status = status || 'PENDING' // Set default status to 'PENDING' if not provided
    this.isPublic = isPublic
    this.createdBy = createdBy
    this.dueDate = dueDate
  }

  /**
   * Generates a task object with the entity's properties.
   * @returns {Object} - Frozen task object.
   */
  generateTask = () => {
    const task = {
      uuid: this.uuid,
      title: this.title,
      description: this.description,
      status: this.status,
      isPublic: this.isPublic,
      createdBy: this.createdBy,
      dueDate: this.dueDate,
    }
    return Object.freeze(task) // Freeze the task object to make it immutable
  }
}
