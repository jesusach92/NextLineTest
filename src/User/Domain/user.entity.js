export default class UserEntity {
  constructor(email, name, passwordHash, uuid, userType) {
    this.name = name
    this.email = email
    this.userType = userType
    this.password = passwordHash
    this.uuid = uuid
  }

  generateUser = () => {
    const User = {
      name: this.name,
      email: this.email,
      userType: this.userType,
      password: this.password,
      uuid: this.uuid
    }
    return Object.freeze(User)
  }
}
