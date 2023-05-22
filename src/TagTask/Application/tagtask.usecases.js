import TagTaskEntity from '../Domain/tagtask.entity.js'

import 'dotenv/config.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'

export class TagTaskUseCases {
  constructor(tagtaskRepository, taskUseCases, tasgsUseCases) {
    this.tagtaskRepository = tagtaskRepository
    this.taskUseCases = taskUseCases
    this.tasgsUseCases = tasgsUseCases
    this.uuidUtils = new UUIDUtils()
    this.passwordUtils = new PasswordUtil()
  }

  createtagtask = async (data) => {
    try {
      const { taskUUID, tagUUID } = data
      const uuid = this.uuidUtils.generate()
      const task = await this.taskUseCases.findTask(taskUUID)
      const tag = await this.tasgsUseCases.findTag(tagUUID)
      console.log(tag)
      const tagtaskEntity = new TagTaskEntity(
        uuid,
        task.id,
        taskUUID,
        tag.id,
        tagUUID
      )
      const tagtask = await this.tagtaskRepository.createOne(
        tagtaskEntity.generatetagtask()
      )
      if (tagtask) return tagtaskEntity.generatetagtask()
    } catch (error) {
      console.log(error)
      return new Error('No se pudo Agregar la Etiquea a la Tarea')
    }
  }

  deletetagtask = async (uuid) => {
    try {
      const tagtask = await this.tagtaskRepository.findOne(uuid)
      const isTagTaskDeleted = await this.tagtaskRepository.deleteOne(uuid)
      if (isTagTaskDeleted)
        return {
          Message: 'Se Borro Correctamente la Tag con datos : ',
          tagtask
        }
    } catch (error) {
      return new Error('No se logro Quitar la Etiqueta a La Tarea')
    }
  }

  getTagsofATasks = async (uuidTask) => {
    try {
      const tagtasks = await this.tagtaskRepository.getAll(uuidTask)
      if (Array.isArray(tagtasks) && tagtasks.length > 0) {
        return { Total: tagtasks.length, tagtasks }
      }
      return new Error('No hay Etiquedas para Mostrar')
    } catch (error) {
      console.log(error)
      return new Error('Error Desconocido')
    }
  }
}
