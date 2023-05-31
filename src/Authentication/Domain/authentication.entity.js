/**
 * This class represents the entity for an authentication session.
 * It encapsulates the session token.
 */

export default class AuthenticationEntity {
  constructor(tokenSession) {
    this.token = tokenSession
  }

  /**
   * Generates the session entity object.
   * @returns {Object} - Returns the session entity object with the token.
   */
  generateSessionEntity = () => {
    const AuthenticationEntity = {
      token: this.token,
    }
    return Object.freeze(AuthenticationEntity)
  }
}
