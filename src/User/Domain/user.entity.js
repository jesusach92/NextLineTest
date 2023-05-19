export class UserEntity {
  constructor({ name, email, uuid, userType }) {
    this.name = name
    this.email = email
    this.uuid = uuid
    this.userType = userType
  }

  generateUser = () => {
    const User = {
      name: this.name,
      email: this.email,
      uuid: this.uuid,
      userType: this.userType
    }
    return Object.freeze(User)
  }
}
