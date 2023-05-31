import TagEntity from '../Domain/tag.entity.js'
import 'dotenv/config.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'

export default class TagUseCases {
  constructor(tagRepository) {
    this.tagRepository = tagRepository
    this.uuidUtils = new UUIDUtils()
  }

  /**
   * Creates a new tag.
   * @param {object} data - The data for the new tag.
   * @returns {object} The created tag.
   */
  createTag = async (data) => {
    try {
      const { tag } = data
      const uuid = this.uuidUtils.generate()
      const tagEntity = new TagEntity(uuid, tag)
      await this.tagRepository.createOne(tagEntity.generateTag())
      return tagEntity.generateTag()
    } catch (error) {
      return new Error('No se logró crear la etiqueta')
    }
  }

  /**
   * Deletes a tag by UUID.
   * @param {string} uuid - The UUID of the tag to delete.
   * @returns {object} The result message and the deleted tag.
   */
  deleteTag = async (uuid) => {
    try {
      const tag = await this.tagRepository.findOne(uuid)
      await this.tagRepository.deleteOne(uuid)
      return { Message: 'Se borró correctamente la Tag con datos:', tag }
    } catch (error) {
      console.log(error)
      return new Error('No se logró borrar la etiqueta')
    }
  }

  /**
   * Finds a tag by UUID.
   * @param {string} uuid - The UUID of the tag to find.
   * @returns {object} The found tag.
   * @throws {ReferenceError} If the tag is not found.
   */
  findTag = async (uuid) => {
    try {
      const tag = await this.tagRepository.findOne(uuid)
      return tag
    } catch (error) {
      return new ReferenceError('No se logró encontrar la etiqueta')
    }
  }

  /**
   * Finds a tag by name.
   * @param {string} tag - The name of the tag to find.
   * @returns {string} The UUID of the found tag.
   * @throws {ReferenceError} If the tag is not found.
   * @throws {Error} If an unknown error occurs.
   */
  findTagbyName = async (tag) => {
    try {
      const uuid = await this.tagRepository.findTagByname(tag)
      return uuid
    } catch (error) {
      if (error instanceof ReferenceError)
        return new ReferenceError(error.message)
      return new Error('No se logró encontrar la etiqueta')
    }
  }

  /**
   * Retrieves all tags.
   * @param {object} params - Additional parameters for retrieving tags.
   * @returns {object} The total count of tags and the tag list.
   * @throws {Error} If no tags are available to show.
   * @throws {Error} If an unknown error occurs.
   */
  getTags = async (params) => {
    try {
      const tags = await this.tagRepository.getAll(params)
      if (Array.isArray(tags) && tags.length > 0)
        return { Total: tags.length, tags }
      return new Error('No hay etiquetas para mostrar')
    } catch (error) {
      console.log(error)
      return new Error('Error desconocido')
    }
  }

  /**
   * Updates a tag.
   * @param {object} fields - The updated fields of the tag.
   * @returns {object} The updated tag.
   * @throws {Error} If the tag update fails.
   */
  updateTag = async (fields) => {
    try {
      const { uuid, tag } = fields
      await this.tagRepository.updateOne(uuid, tag)
      const tagUpdated = await this.tagRepository.findOne(uuid)
      return tagUpdated
    } catch (error) {
      console.log(error)
      return new Error('No se logró actualizar la etiqueta')
    }
  }
}
