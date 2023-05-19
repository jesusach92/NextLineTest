import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class TokenUtils {
  generateToken = async (data, expirationTime) => {
    try {
      const token = jwt.sign({ data }, process.env.PASS_JWT, {
        expiresIn: expirationTime
      })
      return token
    } catch (error) {
      console.log(error)
      throw new Error('No se pudo generar el Token')
    }
  }

  verifytoken = async (token) => {
    try {
      return jwt.verify(token, process.env.PASS_JWT)
    } catch (e) {
      throw new Error('No se pudo verificar el Token')
    }
  }
}
