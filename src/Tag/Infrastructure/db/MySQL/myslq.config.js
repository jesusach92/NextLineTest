import 'dotenv/config'
import mysql from 'mysql2/promise'

export class MySQLConnection {
  constructor() {
    this.host = process.env.MYSQL_HOST || 'localhost'
    this.user = process.env.MYSQL_USER || 'root'
    this.password = process.env.MYSQL_PASSWORD
    this.database = process.env.MYSQL_NAME
  }

  createConnection = async () => {
    const config = Object.freeze({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    })
    return await mysql.createConnection(config)
  }
}
