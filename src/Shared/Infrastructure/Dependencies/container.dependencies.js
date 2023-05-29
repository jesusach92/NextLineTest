// User Imposts
import {
  UserUseCases,
  UserController,
  UserMySQLRepository,
} from '../../../User/index.js'

// Authentication Imports
import {
  AuthenticationUseCases,
  AuthenticationController,
  AuthenticationMySQLRepository,
} from '../../../Authentication/index.js'

// Comments Imports
import {
  CommentUsecases,
  CommentController,
  CommentMySQLRepository,
} from '../../../Comment/index.js'

// Files Imports
import {
  FileUsecases,
  FileController,
  FileMySQLRepository,
  FileStorageRepository,
} from '../../../File/index.js'

// Tag Imports
import {
  TagUsecases,
  TagController,
  TagMySQLRepository,
} from '../../../Tag/index.js'

// Tag-Task Imports
import {
  TagTaskUsecases,
  TagTaskMySQLRepository,
  TagTaskController,
} from '../../../TagTask/index.js'

// Task Imports

import {
  TaskUsecases,
  TaskMySQLRepository,
  TaskMiddleweres,
  TaskController,
} from '../../../Task/index.js'

// TaskShare Imports
import {
  TaskShareUsecases,
  TaskShareMySQLRepository,
  TaskShareController,
} from '../../../TaskShare/index.js'

// User

const userRepository = new UserMySQLRepository()
const userUseCases = new UserUseCases(userRepository)
export const userController = new UserController(userUseCases)

// Auth
const authenticationRepository = new AuthenticationMySQLRepository()
const authenticationUseCases = new AuthenticationUseCases(
  authenticationRepository,
  userUseCases
)
export const authenticationController = new AuthenticationController(
  authenticationUseCases
)

// Task

const taskRepository = new TaskMySQLRepository()
const taskUseCases = new TaskUsecases(taskRepository)
export const taskController = new TaskController(taskUseCases)

// Comments

const commentRepository = new CommentMySQLRepository()
const commentUseCases = new CommentUsecases(
  commentRepository,
  userUseCases,
  taskUseCases
)
export const commentController = new CommentController(commentUseCases)

// Tags

const tagRepository = new TagMySQLRepository()
const tagUseCases = new TagUsecases(tagRepository)
export const tagController = new TagController(tagUseCases)

// Files

const fileRepository = new FileMySQLRepository()
const fileStorage = new FileStorageRepository()
const fileUseCases = new FileUsecases(fileRepository, fileStorage)
export const fileController = new FileController(fileUseCases)

// TagTask

const tagtaskRepository = new TagTaskMySQLRepository()
const tagtaskUseCases = new TagTaskUsecases(
  tagtaskRepository,
  taskUseCases,
  tagUseCases
)
export const tagtaskController = new TagTaskController(tagtaskUseCases)

// TaskShare

const taskshareRepository = new TaskShareMySQLRepository()
const taskshareUseCases = new TaskShareUsecases(
  taskshareRepository,
  userUseCases,
  taskUseCases
)
export const taskshareController = new TaskShareController(taskshareUseCases)

// Task Middleweres
export const taskMiddleweres = new TaskMiddleweres(
  tagtaskUseCases,
  taskshareUseCases,
  commentUseCases,
  fileUseCases
)
