import { TaskEntity } from '../Domain/task.entity'

export class TaskUseCases {
  constructor(TaskRepository) {
    this.TaskRepository = TaskRepository
  }

  getTasks = ({ params }) => {
    const Tasks = this.TaskRepository.getAll(params)
    return Tasks
  }

  getTask = ({ uuidTask }) => {
    const Task = this.TaskRepository.findOne(uuidTask)
    return Task
  }

  createTask = ({ data }) => {
    const {
      uuid,
      title,
      description,
      status,
      isPublic,
      dueDate,
      sharedWith,
      comments,
      createdBy,
      responsible,
      tags,
      file
    } = data

    console.log(sharedWith, comments, responsible, tags, file)
    const Task = new TaskEntity({
      uuid,
      title,
      description,
      status,
      dueDate,
      isPublic,
      createdBy
    })
    const uuidTask = this.TaskRepository.createOne(Task)
    return uuidTask
  }

  updateTask = ({ uuidTask, data }) => {
    const TaskUpdated = this.TaskRepository.updateOne(uuidTask, data)
    return TaskUpdated
  }

  deleteTask = ({ uuidTask }) => {
    const uuidTaskDeleted = this.TaskRepository.deleteOne(uuidTask)
    return uuidTaskDeleted
  }
}
