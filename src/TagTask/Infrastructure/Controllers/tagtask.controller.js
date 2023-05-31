export default class TagTaskController {
  constructor(tagtaskUseCases) {
    this.tagtaskUseCases = tagtaskUseCases
  }

  /**
   * Handles the request to retrieve tags of a task.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - The response containing the tags of the task.
   */
  getTagsTask = async (req, res) => {
    const tagtasks = await this.tagtaskUseCases.getTagsofATasks(req.params.id)
    if (tagtasks instanceof Error) {
      return res.status(404).json({
        Message: `No se encontraron Etiquetas de la Tarea: ${req.params.id}`,
      })
    }
    return res.status(200).json(tagtasks)
  }

  /**
   * Handles the request to assign tags to a task.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - The response confirming the tags assigned to the task.
   */
  assignTagstoTask = async (req, res) => {
    const tagtask = await this.tagtaskUseCases.assignTagstoTask({
      taskUUID: req.params.id,
      ...req.body,
    })
    if (tagtask instanceof Error) {
      return res.status(400).json(tagtask.message)
    }
    return res.status(200).json(tagtask)
  }

  /**
   * Handles the request to delete a tag-task relationship.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - The response confirming the deletion of the tag-task relationship.
   */
  deleteOne = async (req, res) => {
    const tagtaskDeleted = await this.tagtaskUseCases.deletetagtask(
      req.params.id
    )
    if (tagtaskDeleted instanceof Error) {
      return res.status(400).json('No se logro Quitar la Etiqueta a La Tarea')
    }
    return res.status(200).json(tagtaskDeleted)
  }
}
