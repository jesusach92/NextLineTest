import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class TokenUtil {
  createToken = async (TokenSessionEntity) => {
    try {
      const token = jwt.sign(
        {
          ...TokenSessionEntity,
        },
        process.env.PASS_JWT,
        {
          expiresIn: '150h',
        }
      )
      return token
    } catch (error) {
      throw new Error(error.message)
    }
  }

  verifyToken = async ({ token }) => {
    try {
      return jwt.verify(token, process.env.PASS_JWT)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
