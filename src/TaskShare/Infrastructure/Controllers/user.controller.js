
export class UserController {
  constructor(userUseCases){
    this.userUseCases = userUseCases
  }

  getAll = async(req, res)=>{
    const  Users = await this.userUseCases.getUsers(req.query)
      return res.status(200).json(Users)
  }
 getOne = async (req, res)=>{
    const User =await this.userUseCases.findUser(req.params.id)
  return res.status(200).json(User)
  }

  createOne =async (req, res)=>{
        const useruuid =await this.userUseCases.createUser(req.body)
  
        return res.status(201).json(useruuid)
  }

  deleteOne=async (req, res)=>{
      const useruuidDeleted =await this.userUseCases.deleteUser(req.params.id)
      return res.status(200).json(useruuidDeleted)
    }

  updateOne = async(req, res)=>{
    const updatedUser =await this.userUseCases.updateUser(req.body)
    return res.status(200).json(updatedUser)
  }

}