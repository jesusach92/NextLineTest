export default class TokenSessionEntity {
  constructor(userUUID, userType) {
    this.userUUID = userUUID
    this.userType = userType
  }

  /**
   * Generates a token session entity.
   * @returns {Object} - Token session entity.
   */
  generateTokenSessionEntity = () => {
    const TokenSessionEntity = {
      userUUID: this.userUUID,
      userType: this.userType,
    }
    return Object.freeze(TokenSessionEntity)
  }
}
