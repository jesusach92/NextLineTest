export class LogBookEntity {
  constructor({ uuid, userId, action, registerDate, status }) {
    this.uuid = uuid
    this.userId = userId
    this.action = action
    this.registerDate = registerDate
    this.status = status
  }
}
