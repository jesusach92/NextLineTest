import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import TaskEntity from '../Domain/task.entity.js'

export default class TaskUseCases {
  constructor(taskRepository) {
    this.taskRepository = taskRepository
    this.uuidUtils = new UUIDUtils()
  }

  getTasks = async () => {
    try {
      const Tasks = await this.taskRepository.getAll()
      return { Total: Tasks.length, Tasks }
    } catch (error) {
      return new Error('No hay tareas para Mostrar')
    }
  }

  getPublicTasks = async () => {
    try {
      const Tasks = await this.taskRepository.getPublicTasks()
      return { Total: Tasks.length, Tasks }
    } catch (error) {
      console.log(error)
      return new Error('No hay tareas para Mostrar')
    }
  }

  tasksPonderation = (Tasks) => {
    // const PonderationCritered = {
    //   KeyWord: 100,
    //   status: { PENDING: 100, 'IN PROGRESS': 50, DONE: 30 },
    //   isPublic: 50,
    //   usersShared: 10,
    //   dueDate: 10,
    //   fileFormat: { Documento: 30, Imagen: 20 }
    // }
    // if(Array.isArray(Tasks) && Tasks.length > 0)
    // const PoderatedTasks = Tasks.map(Task =>{
    //   const PoderingValue = 0
    // })
    return Tasks
  }

  findTask = async (uuid) => {
    try {
      const Task = new TaskEntity(await this.taskRepository.findOne(uuid))
      return Task.generateTask()
    } catch (error) {
      return new Error('No se logro encontrar la Tarea')
    }
  }

  createTask = async (data) => {
    try {
      const { title, description, isPublic, dueDate, userUUID } = data
      const uuid = this.uuidUtils.generate()
      const Task = new TaskEntity({
        uuid,
        title,
        description,
        dueDate,
        isPublic,
        createdBy: userUUID,
      })
      await this.taskRepository.createOne(Task.generateTask())
      return Task.generateTask()
    } catch (error) {
      console.log(error)
      return new Error('No se pudo Crear La Tarea')
    }
  }

  updateTask = async (data) => {
    const { uuid, createdBy, ...fieldstoUpdate } = data
    await this.taskRepository.updateOne(uuid, fieldstoUpdate)
    const TaskUpdated = new TaskEntity(await this.taskRepository.findOne(uuid))
    return TaskUpdated.generateTask()
  }

  deleteTask = async (uuid) => {
    try {
      const tasktoDeleted = new TaskEntity(
        await this.taskRepository.findOne(uuid)
      )

      await this.taskRepository.deleteOne(uuid)
      return tasktoDeleted.generateTask()
    } catch (error) {
      return new Error('No se pudo Borrar la Tarea')
    }
  }
}
