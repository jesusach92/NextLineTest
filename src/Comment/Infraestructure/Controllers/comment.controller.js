export class CommentController {
  constructor(commentUseCases) {
    this.commentUseCases = commentUseCases
  }

  getByTask = async (req, res) => {
    const comments = await this.commentUseCases.getcommentsByTask(req.params.id)

    return res.status(200).json(comments)
  }

  getByComment = async (req, res) => {
    const comment = await this.commentUseCases.findcomment(req.params.id)
    return res.status(200).json(comment)
  }

  createOne = async (req, res) => {
    const commentuuid = await this.commentUseCases.createcomment(req.body)
    return res.status(201).json(commentuuid)
  }

  deleteOne = async (req, res) => {
    const commentuuidDeleted = await this.commentUseCases.deletecomment(
      req.params.id
    )
    return res.status(200).json(commentuuidDeleted)
  }

  updateOne = async (req, res) => {
    const updatedcomment = await this.commentUseCases.updatecomment(req.body)
    return res.status(200).json(updatedcomment)
  }
}
