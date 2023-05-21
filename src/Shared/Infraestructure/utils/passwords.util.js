import bcrypt from 'bcrypt'
import 'dotenv/config'

export class PasswordUtil {
  genetareHashPassword = async (passwordPlainText) => {
    const SALT_ROUNDS = Number(process.env.PASSWORD_SALT_ROUNDS || 10)
    const PASSWORD_HASH = await bcrypt.hash(passwordPlainText, SALT_ROUNDS)
    return Object.freeze(PASSWORD_HASH)
  }

  validatePassword = async (passwordPlainText, hashPassword) => {
    return await bcrypt.compare(passwordPlainText, hashPassword)
  }
}
