import UserEntity from '../Domain/user.entity.js'
import { UUIDUtils } from '../../Shared/Infraestructure/utils/uuids.util.js'
import {PasswordUtil} from '../../Shared/Infraestructure/utils/passwords.util.js'
import "dotenv/config.js"
import e, { response } from 'express'

export class UserUseCases {
    constructor(UserRepository){
        this.UserRepository=UserRepository
        this.uuidUtils = new UUIDUtils()
        this.passwordUtils =  new PasswordUtil()
    }

    createUser = async (data)=>{
      try {
         const {name, email, password, userType }=data
        const uuid = this.uuidUtils.generate()
        const passwordHash = await this.passwordUtils.genetareHashPassword(password)
        const userEntity = new UserEntity(email,name,passwordHash, uuid, userType)
        const user = await this.UserRepository.createOne(userEntity.generateUser())
        return user
      } catch (error) {
        console.log(error)
        return e
      }  
       
    }

    deleteUser = async (uuid)=>{
        const uuidDeleted = await this.UserRepository.deleteOne(uuid)
        return uuidDeleted
    }

    findUser = async (uuid)=>{
        const user = await this.UserRepository.findOne(uuid)
        return user
    }

    getUsers = async (params)=>{
        const users = await this.UserRepository.getAll(params)
        return users
    }

    updateUser = async (fields) =>{
        const {uuid, ...fieldtoUpdate}=fields
        const updatedUser = await this.UserRepository.updateUser(uuid,fieldtoUpdate)
        return updatedUser
    }

}