export default class CommentController {
  constructor(commentUseCases) {
    this.commentUseCases = commentUseCases
  }

  /**
   * Retrieves comments by task ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} - Returns JSON response with comments or error message.
   */
  getByTask = async (req, res) => {
    const comments = await this.commentUseCases.getcommentsByTask(req.params.id)
    if (comments instanceof Error) {
      return res.status(404).json(comments.message)
    }
    return res.status(200).json(comments)
  }

  /**
   * Retrieves a comment by comment ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} - Returns JSON response with comment or error message.
   */
  getByComment = async (req, res) => {
    const comment = await this.commentUseCases.findcomment(req.params.id)
    if (comment instanceof Error) {
      return res.status(404).json(comment.message)
    }
    return res.status(200).json(comment)
  }

  /**
   * Creates a new comment.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} - Returns JSON response with created comment or error message.
   */
  createOne = async (req, res) => {
    const comment = await this.commentUseCases.createcomment({
      ...req.userSession,
      ...req.body,
    })
    if (comment instanceof Error) {
      return res.status(400).json(comment.message)
    }
    return res.status(201).json(comment)
  }

  /**
   * Deletes a comment by comment ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} - Returns JSON response with deleted comment or error message.
   */
  deleteOne = async (req, res) => {
    const commentDeleted = await this.commentUseCases.deletecomment(
      req.params.id
    )
    if (commentDeleted instanceof Error) {
      return res.status(401).json(commentDeleted.message)
    }
    return res.status(200).json(commentDeleted)
  }

  /**
   * Updates a comment by comment ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} - Returns JSON response with updated comment or error message.
   */
  updateOne = async (req, res) => {
    const commentUpdated = await this.commentUseCases.updatecomment({
      uuid: req.params.id,
      ...req.body,
    })
    if (commentUpdated instanceof Error) {
      return res.status(400).json(commentUpdated.message)
    }
    return res.status(200).json(commentUpdated)
  }
}
