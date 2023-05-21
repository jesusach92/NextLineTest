import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import { TaskEntity } from '../Domain/task.entity.js'

export class TaskUseCases {
  constructor(taskRepository, userUsesCase, fileUsesCase, CommentUsesCase, TaskShareUsesCase ) {
    this.fileUsesCase =fileUsesCase
    this.CommentUsesCase = CommentUsesCase
    this.TaskShareUsesCase = TaskShareUsesCase
    this.taskRepository = taskRepository
    this.userUsesCase = userUsesCase
    this.uuidUtils = new UUIDUtils()
  }

  getTasks = ( params ) => {
    const Tasks = this.taskRepository.getAll(params)
    return Tasks
  }

  findTask = (uuidTask ) => {
    const Task = this.taskRepository.findOne(uuidTask)
    return Task
  }

  createTask =async (data) => {

  try {
     const {
      title,
      description,
      status,
      isPublic,
      dueDate,
      sharedWith = null,
      comments = null,
      createdBy,
      responsible = null,
      tags = null,
      file = null
    } = data
    const uuid = this.uuidUtils.generate()
    const {id} = await this.userUsesCase.findUser(createdBy)
    console.log(sharedWith.split(','), comments, responsible, tags.split(','), file)
    const Task = new TaskEntity({
      uuid,
      title,
      description,
      status,
      dueDate,
      isPublic: isPublic === 'true' ? true : false,
      createdBy : id
    })
    const newTask =await this.taskRepository.createOne(Task.generateTask())

    return {...newTask, createdBy:createdBy}
  } 
  catch (error) {
    console.log(error)
    return error
   }
  }

  updateTask = async (data) => {
    const {uuid,
      sharedWith = null,
      comments = null,
      responsible = null,
      tags = null,
      createdBy,
      file = null,...fieldstoUpdate} = data

    const {id,...TaskUpdated} =await this.taskRepository.updateOne(uuid, fieldstoUpdate)
    return TaskUpdated
  }

  deleteTask = ( uuidTask ) => {
    const uuidTaskDeleted = this.taskRepository.deleteOne(uuidTask)
    return uuidTaskDeleted
  }
}
