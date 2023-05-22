export default class TokenSessionEntity {
  constructor(userUUID) {
    this.userUUID = userUUID
  }

  generateTokenSessionEntity = () => {
    const TokenSessionEntity = {
      userUUID: this.userUUID
    }
    return Object.freeze(TokenSessionEntity)
  }
}
