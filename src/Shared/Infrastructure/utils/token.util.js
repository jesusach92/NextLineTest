import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class TokenUtil {
  creteToken = async (TokenSessionEntity) => {
    try {
      const token = jwt.sign(
        {
          ...TokenSessionEntity
        },
        process.env.PASS_JWT,
        {
          expiresIn: '150h'
        }
      )
      return token
    } catch (error) {
      return new Error('No se logro generar Token')
    }
  }

  verifytoken = async ({ token }) => {
    try {
      return jwt.verify(token, process.env.PASS_JWT)
    } catch (e) {
      return new Error('Error Inesperado')
    }
  }
}
