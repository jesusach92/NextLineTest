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

  /**
   * Removes the password field from a user object.
   * @param {Object} user - User object.
   * @returns {Object} - User object without password.
   */
  quitPassword = (user) => {
    const { id, password, ...userData } = user
    return userData
  }

  /**
   * Creates a new user.
   * @param {Object} data - User data.
   * @returns {Object} - Created user object without password.
   * @throws {Error} - If an error occurs during the creation process.
   */
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
      throw new Error(error.message)
    }
  }

  /**
   * Deletes a user.
   * @param {string} uuidUser - User UUID.
   * @returns {Object} - Message and deleted user object.
   * @throws {Error} - If an error occurs during the deletion process.
   */
  deleteUser = async (uuidUser) => {
    try {
      const { id, password, ...userToDeleted } =
        await this.UserRepository.findOne(uuidUser)
      await this.UserRepository.deleteOne(uuidUser)
      return { Message: 'Usuario Borrado', user: userToDeleted }
    } catch (error) {
      throw new Error('No se logro borrar el Usuario')
    }
  }

  /**
   * Finds a user by UUID.
   * @param {string} uuidUser - User UUID.
   * @returns {Object} - User object.
   * @throws {Error} - If an error occurs during the search process.
   */
  findUser = async (uuidUser) => {
    try {
      const { id, password, ...userFound } = await this.UserRepository.findOne(
        uuidUser
      )
      return userFound
    } catch (e) {
      console.log(this.UserRepository)
      throw new Error('No se Encontro el Usuario')
    }
  }

  /**
   * Finds a user by email.
   * @param {string} email - User email.
   * @returns {Object} - User object.
   * @throws {Error} - If an error occurs during the search process.
   */
  findUserByEmail = async (email) => {
    try {
      const { id, ...user } = await this.UserRepository.findUserByEmail(email)
      return user
    } catch (error) {
      throw new Error('No se Encontro el Usuario')
    }
  }

  /**
   * Gets the password hash of a user.
   * @param {string} uuid - User UUID.
   * @returns {string} - User password hash.
   * @throws {Error} - If an error occurs during the retrieval process.
   */
  getUserPasswordHash = async (uuid) => {
    try {
      const { password } = await this.UserRepository.findOne(uuid)
      return password
    } catch (error) {
      throw new Error('No se Encontro el Usuario')
    }
  }

  /**
   * Retrieves a list of users.
   * @param {Object} params - Query parameters.
   * @returns {Object} - Total count and array of users.
   * @throws {Error} - If an error occurs during the retrieval process.
   */
  getUsers = async (params) => {
    try {
      const users = await this.UserRepository.getAll(params)
      if (Array.isArray(users) && users.length > 0) {
        return {
          Total: users.length,
          users,
        }
      }
      throw new Error('No hay usuarios para Mostrar')
    } catch (error) {
      throw new Error('No lograron Mostrar Usuarios')
    }
  }

  /**
   * Updates a user.
   * @param {Object} fields - User fields to update.
   * @returns {Object} - Updated user object without password.
   * @throws {Error} - If an error occurs during the update process.
   */
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
      throw new Error('No se logro Actualizar el Usuario')
    }
  }
}
