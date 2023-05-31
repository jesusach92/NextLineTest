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

  // Validates if a tag exists and creates it if it doesn't
  validateTag = async (tag) => {
    try {
      const { uuid } = await this.tagUseCases.findTagbyName(tag)
      if (uuid instanceof ReferenceError || typeof uuid === 'undefined') {
        const { uuid } = await this.tagUseCases.createTag({ tag })
        if (uuid instanceof Error) throw new Error('Failed to create the tag')
        return uuid
      }
      return uuid
    } catch (error) {
      throw new Error('Unknown error')
    }
  }

  // Assigns multiple tags to a task
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
        return new Error('Failed to add tags to the task')
      return TasgsAsigned.map((e) => {
        if (e instanceof Error) throw new Error(e.message)
        return e
      })
    } catch (error) {
      return new Error('Failed to add all tags to the task')
    }
  }

  // Assigns a tag to a task
  assignTagtoTask = async (tag, taskUUID) => {
    try {
      const tagValidated = await this.validateTag(tag)
      const uuid = this.uuidUtils.generate()
      const tagtaskEntity = new TagTaskEntity(uuid, taskUUID, tagValidated)
      await this.tagtaskRepository.createOne(tagtaskEntity.generatetagtask())
      return {
        Message: 'Tag added successfully',
        TagAdded: { tag, ...tagtaskEntity.generatetagtask() },
      }
    } catch (error) {
      return new Error(
        `Message: ${`Failed to add the tag ${tag} to the task`}, Reason: ${
          error.message
        }`
      )
    }
  }

  // Deletes a tag-task relationship
  deletetagtask = async (uuid) => {
    try {
      const tagtask = await this.tagtaskRepository.findOne(uuid)
      await this.tagtaskRepository.deleteOne(uuid)
      return { Message: 'Tag removed successfully', tagtask }
    } catch (error) {
      return new Error('Failed to remove the tag from the task')
    }
  }

  // Retrieves all tags associated with a task
  getTagsofATasks = async (uuidTask) => {
    try {
      const tagtasks = await this.tagtaskRepository.getAll(uuidTask)
      if (Array.isArray(tagtasks) && tagtasks.length > 0) {
        return { Total: tagtasks.length, tagtasks }
      }
      return new Error('No tags to display')
    } catch (error) {
      console.log(error)
      return new Error('Unknown error')
    }
  }
}
