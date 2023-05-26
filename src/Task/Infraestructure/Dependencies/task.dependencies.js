import { TaskUseCases } from '../../Application/task.usecases.js'
import { TaskController } from '../Controllers/task.controller.js'
import { MySQLTaskRepository } from '../Repository/task.mysql.repository.js'
// import { MockTaskRepository } from '../Repository/task.mock.respository.js'
import { userUseCases } from '../../../User/Infrastructure/Routes/user.routes.js'
import { commentUseCases } from '../../../Comment/Infraestructure/Routes/comment.routes.js'
import { fileUseCases } from '../../../File/Infrastructure/Routes/file.routes.js'
import { tagtaskUseCases } from '../../../TagTask/Infrastructure/Routes/tagtask.routes.js'
import { taskshareUseCases } from '../../../TaskShare/Infrastructure/Routes/taskshare.routes.js'

const taskRepository = new MySQLTaskRepository()
export const taskUseCases = new TaskUseCases(taskRepository, userUseCases)
export const taskController = new TaskController(taskUseCases)
