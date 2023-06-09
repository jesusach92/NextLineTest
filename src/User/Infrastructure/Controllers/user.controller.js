export default class UserController {
  constructor(userUseCases) {
    this.userUseCases = userUseCases
  }

  /**
   * Retrieves all users.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response object with users or error message.
   */
  getAll = async (req, res) => {
    const Users = await this.userUseCases.getUsers(req.query)
    if (Users instanceof Error) return res.status(400).json(Users.message)

    return res.status(200).json(Users)
  }

  /**
   * Retrieves a single user by ID.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response object with the user or error message.
   */
  getOne = async (req, res) => {
    const User = await this.userUseCases.findUser(req.params.id)
    if (User instanceof Error) return res.status(400).json(User.message)
    return res.status(200).json(User)
  }

  /**
   * Creates a new user.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response object with the created user or error message.
   */
  createOne = async (req, res) => {
    const newUser = await this.userUseCases.createUser(req.body)
    if (newUser instanceof Error) return res.status(400).json(newUser.message)
    return res.status(201).json(newUser)
  }

  /**
   * Deletes a user by ID.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response object with the deleted user or error message.
   */
  deleteOne = async (req, res) => {
    const userDeleted = await this.userUseCases.deleteUser(req.params.id)
    if (userDeleted instanceof Error)
      return res.status(400).json(userDeleted.message)
    return res.status(200).json(userDeleted)
  }

  /**
   * Updates a user by ID.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @returns {Object} - Response object with the updated user or error message.
   */
  updateOne = async (req, res) => {
    const userUpdated = await this.userUseCases.updateUser({
      uuid: req.params.id,
      ...req.body,
    })
    if (userUpdated instanceof Error)
      return res.status(400).json(userUpdated.message)

    return res.status(200).json(userUpdated)
  }
}
