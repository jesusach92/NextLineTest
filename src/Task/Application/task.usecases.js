import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import { TaskEntity } from '../Domain/task.entity.js'

export class TaskUseCases {
  constructor(
    taskRepository,
    userUsesCase,
    fileUsesCase,
    CommentUsesCase,
    TaskShareUsesCase
  ) {
    this.fileUsesCase = fileUsesCase
    this.CommentUsesCase = CommentUsesCase
    this.TaskShareUsesCase = TaskShareUsesCase
    this.taskRepository = taskRepository
    this.userUsesCase = userUsesCase
    this.uuidUtils = new UUIDUtils()
  }

  getTasks = async (params) => {
    const Tasks = await this.taskRepository.getAll(params)
    return { Total: Tasks.length, Tasks }
  }

  findTask = async (uuidTask) => {
    const Task = await this.taskRepository.findOne(uuidTask)
    return Task
  }

  createTask = async (data) => {
    try {
      const {
        title,
        description,
        status,
        isPublic,
        dueDate,
        sharedWith = null,
        comments = null,
        userUUID,
        responsible = null,
        tags = null,
        file = null
      } = data
      const uuid = this.uuidUtils.generate()
      const { id } = await this.userUsesCase.findUser(userUUID)
      const Task = new TaskEntity({
        uuid,
        title,
        description,
        status,
        dueDate,
        isPublic: isPublic === 'true',
        createdBy: id
      })
      const newTask = await this.taskRepository.createOne(Task.generateTask())
      return { ...newTask, userUUID }
    } catch (error) {
      return new Error('No se pudo Crear La Tarea')
    }
  }

  updateTask = async (data) => {
    const {
      uuid,
      sharedWith = null,
      comments = null,
      responsible = null,
      tags = null,
      createdBy,
      file = null,
      ...fieldstoUpdate
    } = data

    const { id, ...TaskUpdated } = await this.taskRepository.updateOne(
      uuid,
      fieldstoUpdate
    )
    return TaskUpdated
  }

  deleteTask = async (uuidTask) => {
    const uuidTaskDeleted = await this.taskRepository.deleteOne(uuidTask)
    return uuidTaskDeleted
  }
}
