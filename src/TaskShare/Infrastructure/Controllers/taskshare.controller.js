export default class TaskShareController {
  constructor(TaskShareUseCases) {
    this.taskshareUseCases = TaskShareUseCases
  }

  shareTask = async (req, res, next) => {
    const { taskUUID, usersUUIDS, responsible } = req.body
    const taskShared = await this.taskshareUseCases.shareTask(
      taskUUID,
      usersUUIDS
    )
    if (taskShared instanceof Error)
      return res.status(400).json(taskShared.message)
    if (!responsible) return res.status(201).json(taskShared)
    req.taskShared = taskShared
    next()
  }

  toDoResponsible = async (req, res) => {
    const { responsible, taskUUID } = req.body
    const userResponsible = await this.taskshareUseCases.toDoResponsible(
      responsible,
      taskUUID
    )
    if (userResponsible instanceof Error)
      return res.status(400).json(userResponsible.message)
    res.status(200).json({ userResponsible, ...req.taskShared })
  }

  stopSharingUser = async (req, res) => {
    const useruuidDeleted = await this.taskshareUseCases.stopSharingUser(
      req.params.task,
      req.params.user
    )
    if (useruuidDeleted instanceof Error)
      return res.status(400).json(useruuidDeleted.message)
    return res.status(200).json(useruuidDeleted)
  }

  stopSharingAllUser = async (req, res) => {
    const useruuidDeleted = await this.taskshareUseCases.stopSharingTask(
      req.params.task
    )
    return res.status(200).json(useruuidDeleted)
  }

  getSharedTasks = async (req, res) => {
    const TasksShared = await this.taskshareUseCases.getTaskShared()
    if (TasksShared instanceof Error)
      return res
        .status(404)
        .json('No se pudieron devolver las Tareas Compartidas')
    return res.status(200).json(TasksShared)
  }

  getAllUsersShared = async (req, res) => {
    const UsersSharedByTask = await this.taskshareUseCases.AllUsersByTask(
      req.params.id
    )
    if (UsersSharedByTask instanceof Error)
      return res
        .status(404)
        .json('No se encontraron Usuarios Compartidos de Esta Tarea')
    res.status(200).json(UsersSharedByTask)
  }
}
