import { MySQLConnection } from '../db/MySQL/myslq.config'
import { MySQLUtils } from '../db/MySQL/mysql.utils'

export class TaskMySQLReposiroty {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async ({ params }) => {
    try {
      const db = await this.MySQL.createConnection()
      const query = new this.MySQLUtils('tasks')
      const Taks = db.query(query.execute(params))
      return Taks
    } catch (e) {
      throw new Error('Error Desconocido')
    }
  }

  findOne = async () => {}

  createOne = (async) => {}

  updateOne = async () => {}

  deleteOne = async () => {}
}
