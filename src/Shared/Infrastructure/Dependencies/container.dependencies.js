// User Imposts
import {
  UserUseCases,
  UserController,
  MySQLUserRepository
} from '../../../User'

// Authentication Imports
import {
  AuthenticationUseCases,
  AuthenticationController,
  MySQLAuthenticationRepository
} from '../../../Authentication'

// Comments Imports
import {
  CommentUseCases,
  CommentController,
  MySQLCommentRepository
} from '../../../Comment'

// Files Imports
import {
  FileUseCases,
  FileController,
  MySQLFileRepository,
  StoregeFileRepository
} from '../../../File'

// Tag Imports
import { TagUseCases } from ''
import { TagController } from '../Controllers/tag.controller.js'
import { MySQLTagRepository } from '../Repository/tag.mysql.repository.js'

// Tag-Task Imports
import { TagTaskUseCases } from '../../Application/tagtask.usecases.js'
import { TagTaskController } from '../Controllers/tagtask.controller.js'
import { MySQLTagTaskRepository } from '../Repository/tagtask.mysql.repository.js'

// Task Imports

import { TaskUseCases } from '../../Application/task.usecases.js'
import { TaskController } from '../Controllers/task.controller.js'
import { MySQLTaskRepository } from '../Repository/task.mysql.repository.js'
import { TaskMiddleweres } from '../../../Task/Infraestructure/Middleweres/task.middleweres.js'

// TaskShare Imports
import { TaskShareUseCases } from '../../Application/taskshare.usecases.js'
import { TaskShareController } from '../Controllers/taskshare.controller.js'
import { MySQLTaskShareRepository } from '../Repository/taskshare.mysql.repository.js'

// Task Middleweres

// User Dependencies
// Crear instancia del repositorio de MySQL para usuarios
const userRepository = new MySQLUserRepository()
// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const userUseCases = new UserUseCases(userRepository)
// Crear instancia del controlador y pasar los casos de uso como dependencia
export const userController = new UserController(userUseCases)

// Authentication Dependencies
// Crear instancia del repositorio de MySQL para autenticación
const authenticationRepository = new MySQLAuthenticationRepository()
// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const authenticationUseCases = new AuthenticationUseCases(
  authenticationRepository,
  userUseCases
)
// Crear instancia del controlador y pasar los casos de uso como dependencia
export const authenticationController = new AuthenticationController(
  authenticationUseCases
)

// Task Dependencies

const taskRepository = new MySQLTaskRepository()
export const taskUseCases = new TaskUseCases(taskRepository, userUseCases)
export const taskController = new TaskController(taskUseCases)

// Comment Dependencies
const commentRepository = new MySQLCommentRepository()
export const commentUseCases = new CommentUseCases(
  commentRepository,
  userUseCases,
  taskUseCases
)
export const commentController = new CommentController(commentUseCases)

// File Dependencies
// Crear instancia del repositorio de MySQL para usuarios
const fileRepository = new MySQLFileRepository()
const storageRepository = new StoregeFileRepository()
// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const fileUseCases = new FileUseCases(fileRepository, storageRepository)
// Crear instancia del controlador y pasar los casos de uso como dependencia
export const fileController = new FileController(fileUseCases)

// LogBook Dependencies

// Tag Dependencies
// Crear instancia del repositorio de MySQL para usuarios
const tagRepository = new MySQLTagRepository()

// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const tagUseCases = new TagUseCases(tagRepository)

// Crear instancia del controlador y pasar los casos de uso como dependencia
export const tagController = new TagController(tagUseCases)

// TagTask Dependencies

const tagtaskRepository = new MySQLTagTaskRepository()
// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const tagtaskUseCases = new TagTaskUseCases(
  tagtaskRepository,
  taskUseCases,
  tagUseCases
)
// Crear instancia del controlador y pasar los casos de uso como dependencia
export const tagtaskController = new TagTaskController(tagtaskUseCases)

// TaskShare Dependencies

// Crear instancia del repositorio de MySQL para usuarios
const taskshareRepository = new MySQLTaskShareRepository()

// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const taskshareUseCases = new TaskShareUseCases(
  taskshareRepository,
  userUseCases,
  taskUseCases
)

// Crear instancia del controlador y pasar los casos de uso como dependencia
export const taskshareController = new TaskShareController(taskshareUseCases)

// Task Middleweres
export const taskMiddleweres = new TaskMiddleweres(
  taskUseCases,
  tagtaskUseCases,
  taskshareUseCases,
  commentUseCases,
  fileUseCases
)
