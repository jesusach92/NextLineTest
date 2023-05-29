import AuthenticationEntity from '../Domain/authentication.entity.js'
import TokenSessionEntity from '../../TokenSession/Domain/tokensession.entity.js'
import 'dotenv/config.js'
import { TokenUtil } from '../../Shared/Infrastructure/utils/token.util.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'

export default class AuthenticationUsecases {
  constructor(AuthenticationRepository, UserUseCases) {
    this.AuthenticationRepository = AuthenticationRepository
    this.UserUseCases = UserUseCases
    this.tokenUtil = new TokenUtil()
    this.passwordUtil = new PasswordUtil()
  }

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
        const token = await this.tokenUtil.creteToken(
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
      return new Error('No se logro crear la sesion')
    }
  }

  validateSession = async (token) => {
    try {
      const tokeClean = token.split(' ')[1]
      const tokenSession = await this.AuthenticationRepository.findOne(
        tokeClean
      )
      const decodeToken = await this.tokenUtil.verifytoken(tokenSession)
      if (decodeToken instanceof Error) {
        await this.AuthenticationRepository.deleteOne(tokeClean)
        return new Error('No cuentas con una sesion valida')
      }
      const userSession = {
        userUUID: decodeToken.userUUID,
        userType: decodeToken.userType,
      }
      return userSession
    } catch (error) {
      return new Error('No cuentas con una sesion valida')
    }
  }

  deleteSession = async (token) => {
    try {
      const tokeClean = token.split(' ')[1]
      const authentication = await this.AuthenticationRepository.findOne(
        tokeClean
      )
      if (authentication) {
        await this.AuthenticationRepository.deleteOne(tokeClean)
        return {
          Message: 'Se Cerro correctamente la Sesion',
        }
      }
    } catch (error) {
      return new Error('No se logro cerrar la sesion')
    }
  }
}
