import TagEntity from '../Domain/tag.entity.js'
import 'dotenv/config.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'

export class TagUseCases {
  constructor(tagRepository) {
    this.tagRepository = tagRepository
    this.uuidUtils = new UUIDUtils()
  }

  createTag = async (data) => {
    try {
      const { tag } = data
      const uuid = this.uuidUtils.generate()
      const tagEntity = new TagEntity(uuid, tag)
      const istagCreted = await this.tagRepository.createOne(
        tagEntity.generateTag()
      )
      if (istagCreted) return tagEntity.generateTag()
    } catch (error) {
      console.log(error)
      return new Error('No se logro crear la etiqueta')
    }
  }

  deleteTag = async (uuid) => {
    try {
      const tag = await this.tagRepository.findOne(uuid)
      const isTagDeleted = await this.tagRepository.deleteOne(uuid)
      if (isTagDeleted)
        return { Message: 'Se Borro Correctamente la Tag con datos : ', tag }
    } catch (error) {
      console.log(error)
      return new Error('No se logro Borrar la Etiqueda')
    }
  }

  findTag = async (uuid) => {
    try {
      const tag = await this.tagRepository.findOne(uuid)
      return tag
    } catch (error) {
      console.log(error)
      return new Error('No se Logro Encontrar la Etiqueta')
    }
  }

  getTags = async (params) => {
    try {
      const tags = await this.tagRepository.getAll(params)
      if (Array.isArray(tags) && tags.length > 0)
        return { Total: tags.length, tags }
      return new Error('No hay Etiquedas para Mostrar')
    } catch (error) {
      console.log(error)
      return new Error('Error Desconocido')
    }
  }

  updateTag = async (fields) => {
    try {
      const { uuid, tag } = fields
      const isTagUpdated = await this.tagRepository.updateOne(uuid, tag)
      if (isTagUpdated) {
        return fields
      }
      return new Error('No se logro Actualizar la Etiqueda')
    } catch (error) {
      console.log(error)
      return new Error('Error Desonocido')
    }
  }
}
