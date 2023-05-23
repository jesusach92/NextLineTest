import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import { CommentEntity } from '../Domain/comment.entity.js'

export class CommentUseCases {
  constructor(CommentRepository, userUsesCase, taskUsesCase) {
    this.commentRepository = CommentRepository
    this.taskUsesCase = taskUsesCase
    this.userUsesCase = userUsesCase
    this.uuidUtils = new UUIDUtils()
  }

  getcommentsByTask = async (uuidTask) => {
    const comments = await this.commentRepository.getAll(uuidTask)
    return { Total: comments.length, comments }
  }

  findcomment = async (uuidcomment) => {
    const comment = await this.commentRepository.findOne(uuidcomment)
    return comment
  }

  createcomment = async (data) => {
    try {
      const { uuidTask, uuidUser, comment } = data
      const uuid = this.uuidUtils.generate()
      const user = await this.userUsesCase.findUser(uuidUser)
      const task = await this.taskUsesCase.findTask(uuidTask)
      const commentEntity = new CommentEntity(
        uuid,
        task.id,
        uuidTask,
        user.id,
        uuidUser,
        comment
      )
      const newcomment = await this.commentRepository.createOne(
        commentEntity.generateComment()
      )
      return { ...newcomment }
    } catch (error) {
      return error
    }
  }

  updatecomment = async (data) => {
    const { uuid, comment } = data

    const uuidComment = await this.commentRepository.updateOne(uuid, comment)
    return uuidComment
  }

  deletecomment = async (uuidcomment) => {
    const uuidcommentDeleted = await this.commentRepository.deleteOne(
      uuidcomment
    )
    return uuidcommentDeleted
  }
}