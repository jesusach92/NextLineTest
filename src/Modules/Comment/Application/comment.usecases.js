import { UUIDUtils } from '../../../1Shared/Infrastructure/utils/uuids.util.js'
import CommentEntity from '../Domain/comment.entity.js'

export default class CommentUseCases {
  constructor(CommentRepository, userUsesCase, taskUsesCase) {
    this.commentRepository = CommentRepository
    this.taskUsesCase = taskUsesCase
    this.userUsesCase = userUsesCase
    this.uuidUtils = new UUIDUtils()
  }

  getcommentsByTask = async (uuidTask) => {
    try {
      const comments = await this.commentRepository.getAll(uuidTask)
      if (Array.isArray(comments) && comments.length === 0)
        return new Error('No hay comentarios para la Tarea ')
      return { Total: comments.length, comments }
    } catch (error) {
      console.log(error)
      return new Error('No hay comentarios para la Tarea')
    }
  }

  findcomment = async (uuidcomment) => {
    try {
      const comment = await this.commentRepository.findOne(uuidcomment)
      return comment
    } catch (error) {
      return new Error('No se Encontro el Comentario')
    }
  }

  createcomment = async (data) => {
    try {
      const { taskUUID, userUUID, comment } = data
      const uuid = this.uuidUtils.generate()
      const user = await this.userUsesCase.findUser(userUUID)
      const task = await this.taskUsesCase.findTask(taskUUID)
      if (user instanceof Error || task instanceof Error)
        return new Error('No se logro Crear el Comentario')
      const commentEntity = new CommentEntity(uuid, taskUUID, userUUID, comment)
      await this.commentRepository.createOne(commentEntity.generateComment())
      return commentEntity.generateComment()
    } catch (error) {
      return new Error(error.message)
    }
  }

  updatecomment = async (data) => {
    try {
      console.log(data)
      const { uuid, comment } = data
      await this.commentRepository.updateOne(uuid, comment)
      const commentUpdated = await this.commentRepository.findOne(uuid, comment)
      return { Message: 'Comentario Actualizado', commentUpdated }
    } catch (error) {
      console.log(error)
      return new Error('No se logro actualizar el comentario')
    }
  }

  deletecomment = async (uuidcomment) => {
    try {
      const comentToDelete = await this.commentRepository.findOne(uuidcomment)
      await this.commentRepository.deleteOne(uuidcomment)
      return {
        Message: 'Comentario Borrado Exitosamente',
        comment: comentToDelete,
      }
    } catch (error) {
      return new Error(error.message)
    }
  }
}
