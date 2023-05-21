export class TaskShareController {
  constructor(TaskShareUseCases) {
    this.taskshareUseCases = TaskShareUseCases
  }

  getAll = async (req, res) => {
    const Users = await this.taskshareUseCases.getTaskShared(req.query)
    return res.status(200).json(Users)
  }

  getOne = async (req, res) => {
    const User = await this.taskshareUseCases.findUser(req.params.id)
    return res.status(200).json(User)
  }

  createOne = async (req, res) => {
    const response = await this.taskshareUseCases.shareTask({ ...req.body })

    return res.status(201).json(response)
  }

  deleteOne = async (req, res) => {
    const useruuidDeleted = await this.taskshareUseCases.deleteUser(
      req.params.id
    )
    return res.status(200).json(useruuidDeleted)
  }

  updateOne = async (req, res) => {
    const updatedUser = await this.taskshareUseCases.updateUser(req.body)
    return res.status(200).json(updatedUser)
  }
}
