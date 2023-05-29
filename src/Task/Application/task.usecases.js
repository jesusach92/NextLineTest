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
      return new Error('No hay Tareas para Mostrar')
    }
  }

  getPublicTasks = async () => {
    try {
      const Tasks = await this.taskRepository.getPublicTasks()
      return { Total: Tasks.length, Tasks }
    } catch (error) {
      console.log(error)
      return new Error('No hay Tareas para Mostrar')
    }
  }

  tasksPonderation = ({ tasks, query }) => {
    if (Array.isArray(tasks.Tasks) && tasks.Tasks.length > 0) {
      const PonderatedTasks = tasks.Tasks.map((task) => {
        const pondetationValue = this.PonderationCalculus(task, query?.KeyWord)

        return { task, pondetationValue }
      })
      PonderatedTasks.sort(
        (task1, task2) => task2.pondetationValue - task1.pondetationValue
      )
      return PonderatedTasks
    }

    return tasks
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

  PonderationCalculus(task, KeyWord) {
    const PonderationCritered = {
      KeyWord: 100,
      status: { PENDING: 100, 'IN PROGRESS': 50, DONE: 30 },
      isPublic: 50,
      usersShared: 10,
      dueDate: 10,
      fileFormat: { jpeg: 10, pdf: 20, png: 10, jpg: 10 },
    }

    let ponderation = 0

    // Aplica la ponderación para cada criterio
    if (task.description.includes(KeyWord)) {
      ponderation += PonderationCritered.KeyWord
    }
    ponderation +=
      task.usersShared?.length ?? 0 * PonderationCritered.usersShared

    const dueDate = this.dueDate(task.dueDate)
    ponderation += dueDate
    ponderation += PonderationCritered.fileFormat[task?.file?.format] ?? 0

    return ponderation
  }

  dueDate(dueDate) {
    // Lógica para calcular los días restantes hasta la fecha de vencimiento
    const today = new Date()
    const dueFinalDate = new Date(dueDate)
    const differ = today.getTime() - dueFinalDate.getTime()
    const restDay = Math.ceil(differ / (1000 * 3600 * 24))
    console.log(restDay)
    return restDay
  }
}
