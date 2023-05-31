export default class TaskController {
  constructor(taskUseCases) {
    this.taskUseCases = taskUseCases
  }

  /**
   * Retrieves tasks based on the user type.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  getTasks = async (req, res, next) => {
    const userSession = req.userSession
    if (userSession.userType === 'User') {
      const tasks = await this.taskUseCases.getPublicTasks()
      if (tasks instanceof Error) return res.status(400).json(tasks.message)
      return res.status(200).json(tasks)
    }
    const tasks = await this.taskUseCases.getTasks(req.query)
    if (tasks instanceof Error) return res.status(400).json(tasks.message)
    req.tasks = tasks.Tasks
    next()
  }

  /**
   * Sorts and filters tasks based on the query parameters.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  tasksPonderated = async (req, res) => {
    const tasks = req.tasks
    if (tasks instanceof Error) return res.status(400).json(tasks.message)

    const tasksPonderated = await this.taskUseCases.tasksPonderation({
      tasks,
      query: req.query,
    })
    res.status(200).json(tasksPonderated)
  }

  /**
   * Retrieves a single task by its ID.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  getTask = async (req, res) => {
    const task = await this.taskUseCases.findTask(req.params.id)
    if (task instanceof Error) return res.status(400).json(task.message)
    return res.status(200).json(task)
  }

  /**
   * Creates a new task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  createTask = async (req, res, next) => {
    const task = await this.taskUseCases.createTask({
      ...req.body,
      ...req.userSession,
    })
    if (task instanceof Error) return res.status(400).json(task.message)
    req.task = task
    next()
  }

  /**
   * Sends the created task as the response.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  returnCreatedFullTask = async (req, res) => {
    const task = req.task
    if (task instanceof Error) res.status(400).json(task.message)
    res.status(201).json(task)
  }

  /**
   * Deletes a task by its ID.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  deleteTask = async (req, res) => {
    const taskDeleted = await this.taskUseCases.deleteTask(req.params.id)
    if (taskDeleted instanceof Error)
      return res.status(400).json(taskDeleted.message)
    return res
      .status(200)
      .json({ Message: 'Tarea Borrada Exitosamente', task: taskDeleted })
  }

  /**
   * Updates a task.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   */
  updateTask = async (req, res) => {
    const taskUpdated = await this.taskUseCases.updateTask({
      uuid: req.params.id,
      ...req.body,
    })
    if (taskUpdated instanceof Error)
      return res.status(400).json(taskUpdated.message)
    return res.status(200).json(taskUpdated)
  }
}
