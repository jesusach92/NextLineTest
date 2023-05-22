import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class TokenUtil {
  creteToken = async (TokenSessionEntity) => {
    try {
      const token = jwt.sign(
        {
          TokenSessionEntity
        },
        process.env.PASS_JWT,
        {
          expiresIn: '1h'
        }
      )
      return token
    } catch (error) {
      console.log(error)
      throw new Error('No se logro generar Token')
    }
  }

  verifytoken = async (token) => {
    try {
      return jwt.verify(token, process.env.PASS_JWT)
    } catch (e) {
      throw new Error('Error Inesperado')
    }
  }
}
