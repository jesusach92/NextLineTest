export default class AuthenticationEntity {
  constructor(tokenSession) {
    this.tokenSession = tokenSession
  }

  generateSessionEntity = () => {
    const AuthenticationEntity = {
      tokenSession: this.tokenSession
    }
    return Object.freeze(AuthenticationEntity)
  }
}
