export default class TokenSessionEntity {
  constructor(userUUID, userType) {
    this.userUUID = userUUID
    this.userType = userType
  }

  generateTokenSessionEntity = () => {
    const TokenSessionEntity = {
      userUUID: this.userUUID,
      userType: this.userType
    }
    return Object.freeze(TokenSessionEntity)
  }
}
