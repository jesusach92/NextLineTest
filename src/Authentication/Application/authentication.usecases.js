import AuthenticationEntity from '../Domain/authentication.entity.js'
import TokenSessionEntity from '../../TokenSession/Domain/tokensession.entity.js'
import 'dotenv/config.js'
import { TokenUtil } from '../../Shared/Infrastructure/utils/token.util.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
let intentos = 0

export class authenticationUseCases {
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
        const tokenSessionEntity = new TokenSessionEntity(user.uuid)
        const token = await this.tokenUtil.creteToken(
          tokenSessionEntity.generateTokenSessionEntity()
        )
        const authenticationEntity = new AuthenticationEntity(token)
        return authenticationEntity.generateSessionEntity()
      }
      intentos += 1
      throw new Error(`Password Invalido Intento ${intentos}`)
    } catch (error) {
      console.log(error)
      return new Error('No se logro crear la etiqueta')
    }
  }

  validateSession = async (uuid) => {
    try {
      const authentication = await this.authenticationRepository.findOne(uuid)
      const isauthenticationDeleted =
        await this.authenticationRepository.deleteOne(uuid)
      if (isauthenticationDeleted)
        return {
          Message: 'Se Borro Correctamente la authentication con datos : ',
          authentication
        }
    } catch (error) {
      console.log(error)
      return new Error('No se logro Borrar la Etiqueda')
    }
  }

  deleteSession = async (uuid) => {
    try {
      const authentication = await this.authenticationRepository.findOne(uuid)
      return authentication
    } catch (error) {
      console.log(error)
      return new Error('No se Logro Encontrar la Etiqueta')
    }
  }
}
