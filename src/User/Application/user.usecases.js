import UserEntity from '../Domain/user.entity.js'

import 'dotenv/config.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'

export default class UserUseCases {
  constructor(UserRepository) {
    this.UserRepository = UserRepository
    this.uuidUtils = new UUIDUtils()
    this.passwordUtils = new PasswordUtil()
  }

  quitPassword = (user) => {
    const { id, password, ...userData } = user
    return userData
  }

  createUser = async (data) => {
    try {
      const { name, email, password, userType = 'User' } = data
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
      await this.UserRepository.createOne(userEntity.generateUser())
      const userWithOutPassword = this.quitPassword(userEntity.generateUser())
      return userWithOutPassword
    } catch (error) {
      return new Error(error.message)
    }
  }

  deleteUser = async (uuidUser) => {
    try {
      const { id, password, ...userToDeleted } =
        await this.UserRepository.findOne(uuidUser)
      await this.UserRepository.deleteOne(uuidUser)
      return { Message: 'Usuario Borrado', user: userToDeleted }
    } catch (error) {
      return new Error('No se logro borrar el Usuario')
    }
  }

  findUser = async (uuidUser) => {
    try {
      const { id, password, ...userFound } = await this.UserRepository.findOne(
        uuidUser
      )
      return userFound
    } catch (e) {
      console.log(this.UserRepository)
      return new Error('No se Encontro el Usuario')
    }
  }

  findUserByEmail = async (email) => {
    try {
      const { id, ...user } = await this.UserRepository.findUserByEmail(email)
      return user
    } catch (error) {
      return new Error('No se Encontro el Usuario')
    }
  }

  getUserPasswordHash = async (uuid) => {
    try {
      const { password } = await this.UserRepository.findOne(uuid)
      return password
    } catch (error) {
      return new Error('No se Encontro el Usuario')
    }
  }

  getUsers = async (params) => {
    try {
      const users = await this.UserRepository.getAll(params)
      if (Array.isArray(users) && users.length > 0) {
        return {
          Total: users.length,
          users,
        }
      }
      return new Error('No hay usuarios para Mostrar')
    } catch (error) {
      return new Error('No lograron Mostrar Usuarios')
    }
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
      await this.UserRepository.updateOne(uuid, fieldtoUpdate)
      const { id, ...user } = await this.findUser(uuid)
      const userUpdated = this.quitPassword(user)
      return userUpdated
    } catch (error) {
      return new Error('No se logro Actualizar el Usuario')
    }
  }
}
