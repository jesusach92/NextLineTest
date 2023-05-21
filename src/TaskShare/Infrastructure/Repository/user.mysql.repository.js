import e from 'express'
import { MySQLConnection } from '../db/MySQL/myslq.config.js'
import { MySQLUtils } from '../db/MySQL/mysql.utils.js'

export class MySQLUserReposiroty {
  constructor() {
    this.MySQL = new MySQLConnection()
    this.MySQLUtils = MySQLUtils
  }

  getAll = async ({ params }) => {
    try {
      const db = await this.MySQL.createConnection()
      const [users] = await db.query("SELECT * FROM users;")
      db.end()
      return {users}
      
    } catch (e) {
      console.log(e)
      throw new Error('Error Desconocido')
    }
  }

  findOne = async (uuid) => {
      try {
          const db = await this.MySQL.createConnection()
          const [[user]] = db.query("SELECT * FROM users WHERE uuid= ?;",[
            uuid
          ])
          await db.end()
          return user
      } catch (error) {
        
      }
  }

  createOne =async(user) => 
  {
    try {
        const db = await this.MySQL.createConnection()
        const [ResultSetHeader] =await db.query('INSERT INTO users SET ?;',[user])  
        await db.end()
        const {password, ...newUser} = user
        console.log(newUser)
        return newUser
        }
     catch (error) {
      throw new Error(error.sqlMessage)
    }
  }

  updateOne = async (id,fieldToUpdate) => {
    try {
      const db= await this.MySQL.createConnection()
      const [[user]] = db.query('UPDATE users SET ? WHERE id ?',[id,fieldToUpdate])
      await db.end()
      return user
    } catch (error) {
      return new Error('Error Inesperado')
    }
  }

  deleteOne = async (uuid) => {
    try {
      const db = await this.MySQL.createConnection()
      const [ResultSetHeader]=await  db.query('DELETE FROM users WHERE uuid=?',[uuid])
     await  db.end()
     console.log(ResultSetHeader.affectedRows)
      if(ResultSetHeader.affectedRows === 0){
        throw new Error('No se pudo borrar')
       }
      return uuid
    } catch (error) {
    return error
    }
  }
}
