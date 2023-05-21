import taskshareEntity from '../Domain/taskshare.entity.js'
import { PasswordUtil } from '../../Shared/Infrastructure/utils/password.util.js'
import { UUIDUtils } from '../../Shared/Infrastructure/utils/uuids.util.js'


export class TaskShareUseCases {
    constructor(taskshareRepository, usersUseCases, taskUseCases){
        this.taskshareRepository=taskshareRepository
        this.usersUseCases = usersUseCases
        this.taskUseCases = taskUseCases
        this.uuidUtils = new UUIDUtils()
        this.passwordUtils =  new PasswordUtil()
    }


    shareMultipleUserTask = async (usersUUIDS, responsible, uuidTask)=>{
      try {
       
        const usersIDs = usersUUIDS.map(async (uuid) =>(await this.usersUseCases.findUser(uuid)))
        const taskshareEntitys = usersIDs.map((userID)=> new taskshareEntity())
        const taskshare = await this.taskshareRepository.createOne(taskshareEntity.generatetaskshare())
        const taskshareWithOutPassword = this.quitPassword(taskshare)
        return taskshareWithOutPassword
      } catch (error) {
        return error
      }  
       
    }

    shareTaskperUser = async (useruuid, isResponsable, uuidTask) =>{
      try {
         const task =await this.taskUseCases.findTask(uuidTask)
         const user =await this.usersUseCases.findUser(useruuid)
         taskshareEntity = new taskshareEntity(user.id, task.id )
         const taskshare = await this.taskshareRepository.createOne()
      } catch (error) {
        
      }
    }

    stopSharing = async (uuid)=>{
      try {
         const uuidDeleted = await this.taskshareRepository.deleteOne(uuid)
        return uuidDeleted
      } catch (error) {
        return error
      }
       
    }

    getUsersByTask = async (uuid)=>{
      try
      {  const taskshare = await this.taskshareRepository.findOne(uuid)
        const  taskshareWithOutPassword = this.quitPassword(taskshare) 
          return taskshareWithOutPassword}
          catch (e){
            return e
          }
    }

    getResponsibleTask = async (uuid)=>{
      try{
        const taskshare= await this.taskshareRepository.findOne(uuid)
        const {password} = taskshare
        return password
      }
      catch(error)
      {
        return error
      }
        
    }

    gettaskshares = async (params)=>{
        const taskshares = await this.taskshareRepository.getAll(params)
        if(taskshares && taskshares.length > 0){
        const tasksharesWithoutPassword = taskshares.map(e =>(this.quitPassword(e)))
        return tasksharesWithoutPassword
        }  
    return taskshares
    }

    updatetaskshare = async (fields) =>{
      try{
        let {uuid,password,...fieldtoUpdate}=fields
        if(password){
           const passwordHash = await this.passwordUtils.genetareHashPassword(password)
            fieldtoUpdate.password = passwordHash
        }
        const uuidUpdated = await this.taskshareRepository.updateOne(uuid,fieldtoUpdate)
        if(uuidUpdated === uuid)
        {
           const  taskshareUpdated = await this.findtaskshare(uuidUpdated)
            return taskshareUpdated
        }
        return updatedtaskshare
      }catch(error)
      {
        return error
      }
        
    }

}