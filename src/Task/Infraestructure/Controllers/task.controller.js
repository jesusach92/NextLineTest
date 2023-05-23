export class TaskController {
  constructor(taskUseCases) {
    this.taskUseCases = taskUseCases
  }

  getAll = async (req, res) => {
    const tasks = await this.taskUseCases.getTasks(req.query)

    return res.status(200).json(tasks)
  }

  getOne = async (req, res) => {
    const task = await this.taskUseCases.findTask(req.params.id)
    return res.status(200).json(task)
  }

  createOne = async (req, res) => {
    const task = await this.taskUseCases.createTask({
      ...req.body,
      ...req.userSession,
      file: req?.files?.file ?? null
    })
    if (task instanceof Error) return res.status(400).json(task.message)
    return res.status(201).json(task)
  }

  deleteOne = async (req, res) => {
    const taskuuidDeleted = await this.taskUseCases.deleteTask(req.params.id)
    return res.status(200).json(taskuuidDeleted)
  }

  updateOne = async (req, res) => {
    const updatedtask = await this.taskUseCases.updateTask({
      ...req.body,
      file: req.files.file
    })
    return res.status(200).json(updatedtask)
  }
}
