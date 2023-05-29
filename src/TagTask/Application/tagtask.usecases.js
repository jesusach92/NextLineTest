import TagTaskEntity from '../Domain/tagtask.entity.js'
import 'dotenv/config.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'

export default class TagTaskUseCases {
  constructor(tagtaskRepository, taskUseCases, tagUseCases) {
    this.tagtaskRepository = tagtaskRepository
    this.taskUseCases = taskUseCases
    this.tagUseCases = tagUseCases
    this.uuidUtils = new UUIDUtils()
    this.passwordUtils = new PasswordUtil()
  }

  validateTag = async (tag) => {
    try {
      const { uuid } = await this.tagUseCases.findTagbyName(tag)
      if (uuid instanceof ReferenceError || typeof uuid === 'undefined') {
        const { uuid } = await this.tagUseCases.createTag({ tag })
        if (uuid instanceof Error)
          throw new Error('No se logro crear la etiqueta')
        return uuid
      }
      return uuid
    } catch (error) {
      throw new Error('Error Desconocido')
    }
  }

  assignTagstoTask = async (data) => {
    try {
      const { taskUUID, tags } = data
      await this.taskUseCases.findTask(taskUUID)
      const tagstoTaskPromises = tags.map((tag) =>
        this.assignTagtoTask(tag, taskUUID)
      )
      const TasgsAsigned = await Promise.all(tagstoTaskPromises)
        .then((value) => value)
        .catch((error) => {
          console.log(error.name)
          return error.message
        })
      if (!Array.isArray(TasgsAsigned))
        return new Error('No se logran Agregar las Etiquetas a la Tarea')
      return TasgsAsigned.map((e) => {
        if (e instanceof Error) throw new Error(e.message)
        return e
      })
    } catch (error) {
      return new Error('No se logran Agregar todas las Etiquetas a la Tarea')
    }
  }

  assignTagtoTask = async (tag, taskUUID) => {
    try {
      const tagValidated = await this.validateTag(tag)
      const uuid = this.uuidUtils.generate()
      const tagtaskEntity = new TagTaskEntity(uuid, taskUUID, tagValidated)
      await this.tagtaskRepository.createOne(tagtaskEntity.generatetagtask())
      return {
        Message: 'Se Agrero La Etiqueta',
        TagAdded: { tag, ...tagtaskEntity.generatetagtask() },
      }
    } catch (error) {
      return new Error(
        `Mensaje: ${`No se logro Agregar la Etiqueta ${tag} a la Tarea`}, Razon: ${
          error.message
        }`
      )
    }
  }

  deletetagtask = async (uuid) => {
    try {
      const tagtask = await this.tagtaskRepository.findOne(uuid)
      await this.tagtaskRepository.deleteOne(uuid)
      return { Message: 'Se Borro Correctamente la Tag con datos : ', tagtask }
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
