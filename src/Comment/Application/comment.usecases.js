import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'
import CommentEntity from '../Domain/comment.entity.js'

export default class CommentUseCases {
  constructor(CommentRepository, userUseCase, taskUseCase) {
    this.commentRepository = CommentRepository
    this.taskUseCase = taskUseCase
    this.userUseCase = userUseCase
    this.uuidUtils = new UUIDUtils()
  }

  /**
   * Retrieves comments for a task.
   * @param {string} uuidTask - The UUID of the task.
   * @returns {Object} - Returns an object containing the total number of comments and the comments themselves, or throws an error if there are no comments.
   */
  getcommentsByTask = async (uuidTask) => {
    try {
      const comments = await this.commentRepository.getAll(uuidTask)
      if (Array.isArray(comments) && comments.length === 0) {
        throw new Error('No hay comentarios para la Tarea')
      }
      return { Total: comments.length, comments }
    } catch (error) {
      console.log(error)
      throw new Error('No hay comentarios para la Tarea')
    }
  }

  /**
   * Finds a comment by its UUID.
   * @param {string} uuidcomment - The UUID of the comment.
   * @returns {Object} - Returns the found comment or throws an error if the comment is not found.
   */
  findcomment = async (uuidcomment) => {
    try {
      const comment = await this.commentRepository.findOne(uuidcomment)
      return comment
    } catch (error) {
      throw new Error('No se Encontro el Comentario')
    }
  }

  /**
   * Creates a new comment.
   * @param {Object} data - The comment data including task UUID, user UUID, and comment text.
   * @returns {Object} - Returns the created comment or throws an error if it fails.
   */
  createcomment = async (data) => {
    try {
      const { taskUUID, userUUID, comment } = data
      const uuid = this.uuidUtils.generate()
      const user = await this.userUseCase.findUser(userUUID)
      const task = await this.taskUseCase.findTask(taskUUID)
      if (user instanceof Error || task instanceof Error) {
        throw new Error('No se logro Crear el Comentario')
      }
      const commentEntity = new CommentEntity(uuid, taskUUID, userUUID, comment)
      await this.commentRepository.createOne(commentEntity.generateComment())
      return commentEntity.generateComment()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  /**
   * Updates a comment.
   * @param {Object} data - The updated comment data including UUID and comment text.
   * @returns {Object} - Returns a message and the updated comment, or throws an error if it fails.
   */
  updatecomment = async (data) => {
    try {
      console.log(data)
      const { uuid, comment } = data
      await this.commentRepository.updateOne(uuid, comment)
      const commentUpdated = await this.commentRepository.findOne(uuid)
      return { Message: 'Comentario Actualizado', commentUpdated }
    } catch (error) {
      console.log(error)
      throw new Error('No se logro actualizar el comentario')
    }
  }

  /**
   * Deletes a comment.
   * @param {string} uuidcomment - The UUID of the comment to delete.
   * @returns {Object} - Returns a message and the deleted comment, or throws an error if it fails.
   */
  deletecomment = async (uuidcomment) => {
    try {
      const commentToDelete = await this.commentRepository.findOne(uuidcomment)
      await this.commentRepository.deleteOne(uuidcomment)
      return {
        Message: 'Comentario Borrado Exitosamente',
        comment: commentToDelete,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
