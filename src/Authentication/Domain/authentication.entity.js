export default class AuthenticationEntity {
  constructor(tokenSession) {
    this.token = tokenSession
  }

  generateSessionEntity = () => {
    const AuthenticationEntity = {
      token: this.token
    }
    return Object.freeze(AuthenticationEntity)
  }
}
