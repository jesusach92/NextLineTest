/**
 * This class contains the use cases for authentication.
 * It provides methods for creating, validating, and deleting user sessions.
 */

import AuthenticationEntity from '../Domain/authentication.entity.js'
import TokenSessionEntity from '../../TokenSession/Domain/tokensession.entity.js'
import 'dotenv/config.js'
import { TokenUtil } from '../../Shared/Infrastructure/utils/token.util.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'

export default class AuthenticationUseCases {
  constructor(AuthenticationRepository, UserUseCases) {
    this.AuthenticationRepository = AuthenticationRepository
    this.UserUseCases = UserUseCases
    this.tokenUtil = new TokenUtil()
    this.passwordUtil = new PasswordUtil()
  }

  /**
   * Creates a new user session.
   * @param {Object} data - Data containing the user's email and password.
   * @returns {Object|Error} - Returns the created session entity or an error if the credentials are invalid.
   */
  createSession = async (data) => {
    try {
      const { email, password } = data
      const user = await this.UserUseCases.findUserByEmail(email)
      const passwordValidate = await this.passwordUtil.validatePassword(
        password,
        user.password
      )
      if (passwordValidate) {
        const tokenSessionEntity = new TokenSessionEntity(
          user.uuid,
          user.userType
        )
        const token = await this.tokenUtil.createToken(
          tokenSessionEntity.generateTokenSessionEntity()
        )
        const authenticationEntity = new AuthenticationEntity(token)
        await this.AuthenticationRepository.createOne(
          authenticationEntity.generateSessionEntity()
        )
        return authenticationEntity.generateSessionEntity()
      }
      return new Error(`Valida tus Credenciales`)
    } catch (error) {
      console.log(error.message)
      return new Error('No se logró crear la sesión')
    }
  }

  /**
   * Validates a user session token.
   * @param {string} token - The user session token.
   * @returns {Object|Error} - Returns the user session data or an error if the session is invalid.
   */
  validateSession = async (token) => {
    try {
      const tokenClean = token.split(' ')[1]
      const tokenSession = await this.AuthenticationRepository.findOne(
        tokenClean
      )
      const decodeToken = await this.tokenUtil.verifyToken(tokenSession)
      if (decodeToken instanceof Error) {
        await this.AuthenticationRepository.deleteOne(tokenClean)
        return new Error('No cuentas con una sesión válida')
      }
      const userSession = {
        userUUID: decodeToken.userUUID,
        userType: decodeToken.userType,
      }
      return userSession
    } catch (error) {
      console.log(error)
      return new Error('No cuentas con una sesión válida')
    }
  }

  /**
   * Deletes a user session.
   * @param {string} token - The user session token.
   * @returns {Object|Error} - Returns a success message or an error if the session could not be closed.
   */
  deleteSession = async (token) => {
    try {
      const tokeClean = token.split(' ')[1]
      const authentication = await this.AuthenticationRepository.findOne(
        tokeClean
      )
      if (authentication) {
        await this.AuthenticationRepository.deleteOne(tokeClean)
        return {
          Message: 'Se cerró correctamente la sesión',
        }
      }
    } catch (error) {
      return new Error('No se logró cerrar la sesión')
    }
  }
}
