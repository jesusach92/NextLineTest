export class TaskEntity {
  constructor({
    uuid,
    title,
    description,
    status,
    dueDate,
    isPublic,
    createdBy
  }) {
    this.uuid = uuid
    this.title = title
    this.description = description
    this.status = status
    this.isPublic = isPublic
    this.createdBy = createdBy
    this.dueDate = dueDate
  }

  generateTask = () => {
    const Task = {
      uuid: this.uuid,
      title: this.title,
      description: this.description,
      status: this.status,
      isPiblic: this.isPublic,
      createdBy: this.createdBy,
      dueDate: this.dueDate
    }
    return Object.freeze(Task)
  }
}
