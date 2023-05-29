import AuthenticationEntity from '../Domain/authentication.entity.js'
import TokenSessionEntity from '../../TokenSession/Domain/tokensession.entity.js'
import 'dotenv/config.js'
import { TokenUtil } from '../../../1Shared/Infrastructure/utils/token.util.js'
import { PasswordUtil } from '../../../1Shared/Infrastructure/utils/password.util.js'

export default class AuthenticationUseCases {
  constructor(authenticationRepository, userUseCases) {
    this.authenticationRepository = authenticationRepository
    this.userUseCases = userUseCases
    this.tokenUtil = new TokenUtil()
    this.passwordUtil = new PasswordUtil()
  }

  createSession = async (data) => {
    try {
      const { email, password } = data
      const user = await this.userUseCases.findUserByEmail(email)
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
        await this.authenticationRepository.createOne(
          authenticationEntity.generateSessionEntity()
        )
        return authenticationEntity.generateSessionEntity()
      }
      return new Error(`Valida tus Credenciales`)
    } catch (error) {
      return new Error('No se logro crear la sesion')
    }
  }

  validateSession = async (token) => {
    try {
      const tokeClean = token.split(' ')[1]
      const tokenSession = await this.authenticationRepository.findOne(
        tokeClean
      )
      const decodeToken = await this.tokenUtil.verifytoken(tokenSession)
      if (decodeToken instanceof Error) {
        await this.authenticationRepository.deleteOne(tokeClean)
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
      const authentication = await this.authenticationRepository.findOne(
        tokeClean
      )
      if (authentication) {
        await this.authenticationRepository.deleteOne(tokeClean)
        return {
          Message: 'Se Cerro correctamente la Sesion',
        }
      }
    } catch (error) {
      return new Error('No se logro cerrar la sesion')
    }
  }
}
