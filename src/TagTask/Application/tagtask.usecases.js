import TagTaskEntity from '../Domain/tagtask.entity.js'

import 'dotenv/config.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'

export class tagtaskUseCases {
  constructor(tagtaskRepository) {
    this.tagtaskRepository = tagtaskRepository
    this.uuidUtils = new UUIDUtils()
    this.passwordUtils = new PasswordUtil()
  }

  quitPassword = (tagtask) => {
    if (!tagtask) {
      return tagtask
    }
    const { password, ...tagtaskWithOutPass } = tagtask
    return tagtaskWithOutPass
  }

  createtagtask = async (data) => {
    try {
      const { name, email, password, tagtaskType } = data
      const uuid = this.uuidUtils.generate()
      const passwordHash = await this.passwordUtils.genetareHashPassword(
        password
      )
      const tagtaskEntity = new TagTaskEntity(
        email,
        name,
        passwordHash,
        uuid,
        tagtaskType
      )
      const tagtask = await this.tagtaskRepository.createOne(
        tagtaskEntity.generatetagtask()
      )
      const tagtaskWithOutPassword = this.quitPassword(tagtask)

      return tagtaskWithOutPassword
    } catch (error) {
      return error
    }
  }

  deletetagtask = async (uuid) => {
    try {
      const uuidDeleted = await this.tagtaskRepository.deleteOne(uuid)
      return uuidDeleted
    } catch (error) {
      return error
    }
  }

  findtagtask = async (uuid) => {
    try {
      const tagtask = await this.tagtaskRepository.findOne(uuid)
      const tagtaskWithOutPassword = this.quitPassword(tagtask)
      return tagtaskWithOutPassword
    } catch (e) {
      return e
    }
  }

  gettagtaskPasswordHash = async (uuid) => {
    try {
      const tagtask = await this.tagtaskRepository.findOne(uuid)
      const { password } = tagtask
      return password
    } catch (error) {
      return error
    }
  }

  gettagtasks = async (params) => {
    const tagtasks = await this.tagtaskRepository.getAll(params)
    if (tagtasks && tagtasks.length > 0) {
      const tagtasksWithoutPassword = tagtasks.map((e) => this.quitPassword(e))
      return tagtasksWithoutPassword
    }
    return tagtasks
  }

  updatetagtask = async (fields) => {
    try {
      const { uuid, password, ...fieldtoUpdate } = fields
      if (password) {
        const passwordHash = await this.passwordUtils.genetareHashPassword(
          password
        )
        fieldtoUpdate.password = passwordHash
      }
      const uuidUpdated = await this.tagtaskRepository.updateOne(
        uuid,
        fieldtoUpdate
      )
      if (uuidUpdated === uuid) {
        const tagtaskUpdated = await this.findtagtask(uuidUpdated)
        return tagtaskUpdated
      }
      return uuidUpdated
    } catch (error) {
      return error
    }
  }
}
