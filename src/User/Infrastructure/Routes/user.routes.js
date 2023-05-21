import { Router } from 'express'
import { UserUseCases } from '../../Application/user.usecases.js'
import { UserController } from '../Controllers/user.controller.js'
import {MySQLUserReposiroty} from '../Repository/user.mysql.repository.js'
import { MockUserReposiroty } from '../Repository/user.mock.respository.js'

const userRepository = new MySQLUserReposiroty ()
export const userUseCases = new UserUseCases(userRepository)
const userController = new UserController(userUseCases)


const userRouter = Router()
    userRouter.get('/', userController.getAll)
   userRouter.get('/:id', userController.getOne)
   userRouter.post('/',userController.createOne)
   userRouter.patch('/',userController.updateOne)
   userRouter.delete('/:id', userController.deleteOne)

export default userRouter