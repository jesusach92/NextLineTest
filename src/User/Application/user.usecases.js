import UserEntity from '../Domain/user.entity.js'

import 'dotenv/config.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'

export class UserUseCases {
  constructor(UserRepository) {
    this.UserRepository = UserRepository
    this.uuidUtils = new UUIDUtils()
    this.passwordUtils = new PasswordUtil()
  }

  quitPassword = (user) => {
    if (!user) {
      return user
    }
    const { password, ...userWithOutPass } = user
    return userWithOutPass
  }

  createUser = async (data) => {
    try {
      const { name, email, password, userType } = data
      const uuid = this.uuidUtils.generate()
      const passwordHash = await this.passwordUtils.genetareHashPassword(
        password
      )
      const userEntity = new UserEntity(
        email,
        name,
        passwordHash,
        uuid,
        userType
      )
      const user = await this.UserRepository.createOne(
        userEntity.generateUser()
      )
      const userWithOutPassword = this.quitPassword(user)

      return userWithOutPassword
    } catch (error) {
      return error
    }
  }

  deleteUser = async (uuid) => {
    try {
      const uuidDeleted = await this.UserRepository.deleteOne(uuid)
      return uuidDeleted
    } catch (error) {
      return error
    }
  }

  findUser = async (uuid) => {
    try {
      const user = await this.UserRepository.findOne(uuid)
      const userWithOutPassword = this.quitPassword(user)
      return userWithOutPassword
    } catch (e) {
      return e
    }
  }

  getUserPasswordHash = async (uuid) => {
    try {
      const user = await this.UserRepository.findOne(uuid)
      const { password } = user
      return password
    } catch (error) {
      return error
    }
  }

  getUsers = async (params) => {
    const users = await this.UserRepository.getAll(params)
    if (users && users.length > 0) {
      const usersWithoutPassword = users.map((e) => this.quitPassword(e))
      return usersWithoutPassword
    }
    return users
  }

  updateUser = async (fields) => {
    try {
      const { uuid, password, ...fieldtoUpdate } = fields
      if (password) {
        const passwordHash = await this.passwordUtils.genetareHashPassword(
          password
        )
        fieldtoUpdate.password = passwordHash
      }
      const uuidUpdated = await this.UserRepository.updateOne(
        uuid,
        fieldtoUpdate
      )
      if (uuidUpdated === uuid) {
        const userUpdated = await this.findUser(uuidUpdated)
        return userUpdated
      }
      return uuidUpdated
    } catch (error) {
      return error
    }
  }
}
