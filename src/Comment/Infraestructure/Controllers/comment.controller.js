export default class CommentController {
  constructor(commentUseCases) {
    this.commentUseCases = commentUseCases
  }

  getByTask = async (req, res) => {
    const comments = await this.commentUseCases.getcommentsByTask(req.params.id)
    if (comments instanceof Error) return res.status(404).json(comments.message)
    return res.status(200).json(comments)
  }

  getByComment = async (req, res) => {
    const comment = await this.commentUseCases.findcomment(req.params.id)
    if (comment instanceof Error) return res.status(404).json(comment.message)
    return res.status(200).json(comment)
  }

  createOne = async (req, res) => {
    const comment = await this.commentUseCases.createcomment({
      ...req.userSession,
      ...req.body
    })
    if (comment instanceof Error) return res.status(400).json(comment.message)
    return res.status(201).json(comment)
  }

  deleteOne = async (req, res) => {
    const commentDeleted = await this.commentUseCases.deletecomment(
      req.params.id
    )
    if (commentDeleted instanceof Error)
      return res.status(401).json(commentDeleted.message)
    return res.status(200).json(commentDeleted)
  }

  updateOne = async (req, res) => {
    const commentUpdated = await this.commentUseCases.updatecomment({
      uuid: req.params.id,
      ...req.body
    })
    if (commentUpdated instanceof Error)
      return res.status(400).json(commentUpdated.message)
    return res.status(200).json(commentUpdated)
  }
}
