export class TaskShareController {
  constructor(TaskShareUseCases) {
    this.taskshareUseCases = TaskShareUseCases
  }

  getAll = async (req, res) => {
    const TasksShared = await this.taskshareUseCases.getTaskShared(req.query)
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
        .json('No se encontrar Usuarios Compartidos de Esta Tarea')
    res.status(200).json(UsersSharedByTask)
  }

  shareTask = async (req, res) => {
    const response = await this.taskshareUseCases.shareTask({
      task: req.params.id,
      ...req.body
    })
    if (response instanceof Error)
      return res.status(400).json('No se dejo de compartir la tarea')
    return res.status(201).json(response)
  }

  stopSharing = async (req, res) => {
    const useruuidDeleted = await this.taskshareUseCases.stopSharing(
      req.params.id
    )
    return res.status(200).json(useruuidDeleted)
  }

}
