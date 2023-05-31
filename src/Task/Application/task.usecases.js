import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import TaskEntity from '../Domain/task.entity.js'

export default class TaskUseCases {
  /**
   * Constructor of TaskUseCases.
   * @param {Object} taskRepository - Task repository.
   * @param {Object} taskShareUseCases - Task share use cases.
   * @param {Object} file - File object.
   */
  constructor(taskRepository, taskShareUseCases, file) {
    this.taskRepository = taskRepository
    this.uuidUtils = new UUIDUtils()
  }

  /**
   * Retrieves all tasks.
   * @returns {Object} - Object containing the total count and the tasks.
   */
  getTasks = async () => {
    try {
      const tasks = await this.taskRepository.getAll()
      return { Total: tasks.length, Tasks: tasks }
    } catch (error) {
      return new Error('No hay Tareas para Mostrar')
    }
  }

  /**
   * Retrieves all public tasks.
   * @returns {Object} - Object containing the total count and the public tasks.
   */
  getPublicTasks = async () => {
    try {
      const tasks = await this.taskRepository.getPublicTasks()
      return { Total: tasks.length, Tasks: tasks }
    } catch (error) {
      console.log(error)
      return new Error('No hay Tareas para Mostrar')
    }
  }

  /**
   * Calculates the ponderation value for each task based on a keyword.
   * @param {Object} options - Object containing the tasks and the query parameters.
   * @returns {Object} - Object containing the total count and the ponderated tasks.
   */
  tasksPonderation = ({ tasks, query }) => {
    const { keyWord = '' } = query
    console.log(keyWord)
    if (Array.isArray(tasks) && tasks.length > 0) {
      const ponderatedTasks = tasks
        .filter((task) => task.description.includes(keyWord.toString()))
        .map((task) => {
          const ponderationValue = this.PonderationCalculus(task, keyWord)
          return { task, ponderationValue }
        })
      ponderatedTasks.sort(
        (task1, task2) => task2.ponderationValue - task1.ponderationValue
      )
      return { Total: ponderatedTasks.length, PonderatedTasks: ponderatedTasks }
    }
    return tasks
  }

  /**
   * Finds a task by its UUID.
   * @param {string} uuid - Task UUID.
   * @returns {Object} - Task object.
   */
  findTask = async (uuid) => {
    try {
      const task = new TaskEntity(await this.taskRepository.findOne(uuid))
      return task.generateTask()
    } catch (error) {
      return new Error('No se logró encontrar la Tarea')
    }
  }

  /**
   * Creates a new task.
   * @param {Object} data - Task data.
   * @returns {Object} - Created task object.
   */
  createTask = async (data) => {
    try {
      const { title, description, isPublic, dueDate, userUUID } = data
      const uuid = this.uuidUtils.generate()
      const task = new TaskEntity({
        uuid,
        title,
        description,
        dueDate,
        isPublic,
        createdBy: userUUID,
      })
      await this.taskRepository.createOne(task.generateTask())
      return task.generateTask()
    } catch (error) {
      console.log(error)
      return new Error('No se pudo Crear la Tarea')
    }
  }

  /**
   * Updates a task.
   * @param {Object} data - Updated task data.
   * @returns {Object} - Updated task object.
   */
  updateTask = async (data) => {
    const { uuid, createdBy, ...fieldsToUpdate } = data
    await this.taskRepository.updateOne(uuid, fieldsToUpdate)
    const taskUpdated = new TaskEntity(await this.taskRepository.findOne(uuid))
    return taskUpdated.generateTask()
  }

  /**
   * Deletes a task by its UUID.
   * @param {string} uuid - Task UUID.
   * @returns {Object} - Deleted task object.
   */
  deleteTask = async (uuid) => {
    try {
      const taskToDelete = new TaskEntity(
        await this.taskRepository.findOne(uuid)
      )
      await this.taskRepository.deleteOne(uuid)
      return taskToDelete.generateTask()
    } catch (error) {
      return new Error('No se pudo Borrar la Tarea')
    }
  }

  /**
   * Calculates the ponderation value for a task based on criteria.
   * @param {Object} task - Task object.
   * @param {string} keyword - Keyword to match in the task description.
   * @returns {number} - Ponderation value.
   */
  PonderationCalculus(task, keyword) {
    const PonderationCriteria = {
      KeyWord: 100,
      status: { PENDING: 100, 'IN PROGRESS': 50, DONE: 30 },
      isPublic: 50,
      usersShared: 10,
      fileFormat: { jpeg: 10, pdf: 20, png: 10, jpg: 10 },
    }

    let ponderation = 0

    // Apply the ponderation for each criterion
    if (task.description.includes(keyword.toString())) {
      ponderation += PonderationCriteria.KeyWord
    }
    ponderation += task.usersShared * PonderationCriteria.usersShared

    const dueDate = this.dueDate(task.dueDate)
    ponderation += dueDate
    ponderation += PonderationCriteria.fileFormat[task.fileFormat] ?? 0
    return ponderation
  }

  /**
   * Calculates the number of days remaining until the due date.
   * @param {string} dueDate - Due date string.
   * @returns {number} - Number of days remaining.
   */
  dueDate(dueDate) {
    // Logic to calculate the remaining days until the due date
    const today = new Date()
    const dueFinalDate = new Date(dueDate)
    const differ = today.getTime() - dueFinalDate.getTime()
    const restDay = Math.ceil(differ / (1000 * 3600 * 24))
    return restDay
  }
}
