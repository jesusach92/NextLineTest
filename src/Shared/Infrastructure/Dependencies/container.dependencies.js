// User Imports
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

import {
  FileTaskController,
  FileTaskMySQLRepository,
  FileTaskUseCases,
} from '../../../FileTask/index.js'

// User
const userRepository = new UserMySQLRepository() // Instantiate the user repository
const userUseCases = new UserUseCases(userRepository) // Instantiate the user use cases
export const userController = new UserController(userUseCases) // Instantiate the user controller

// Auth
const authenticationRepository = new AuthenticationMySQLRepository() // Instantiate the authentication repository
const authenticationUseCases = new AuthenticationUseCases(
  authenticationRepository,
  userUseCases
) // Instantiate the authentication use cases
export const authenticationController = new AuthenticationController(
  authenticationUseCases
) // Instantiate the authentication controller

// Task
const taskRepository = new TaskMySQLRepository() // Instantiate the task repository
const taskUseCases = new TaskUsecases(taskRepository) // Instantiate the task use cases
export const taskController = new TaskController(taskUseCases) // Instantiate the task controller

// Comments
const commentRepository = new CommentMySQLRepository() // Instantiate the comment repository
const commentUseCases = new CommentUsecases(
  commentRepository,
  userUseCases,
  taskUseCases
) // Instantiate the comment use cases
export const commentController = new CommentController(commentUseCases) // Instantiate the comment controller

// Tags
const tagRepository = new TagMySQLRepository() // Instantiate the tag repository
const tagUseCases = new TagUsecases(tagRepository) // Instantiate the tag use cases
export const tagController = new TagController(tagUseCases) // Instantiate the tag controller

// Files
const fileRepository = new FileMySQLRepository() // Instantiate the file repository
const fileStorage = new FileStorageRepository() // Instantiate the file storage
const fileUseCases = new FileUsecases(fileRepository, fileStorage) // Instantiate the file use cases
export const fileController = new FileController(fileUseCases) // Instantiate the file controller

// File Task
const fileTaskRepository = new FileTaskMySQLRepository() // Instantiate the file task repository
const fileTaskUseCases = new FileTaskUseCases(
  fileTaskRepository,
  fileUseCases,
  taskUseCases
) // Instantiate the file task use cases
export const fileTaskController = new FileTaskController(fileTaskUseCases) // Instantiate the file task controller

// TagTask
const tagtaskRepository = new TagTaskMySQLRepository() // Instantiate the tag task repository
const tagtaskUseCases = new TagTaskUsecases(
  tagtaskRepository,
  taskUseCases,
  tagUseCases
) // Instantiate the tag task use cases
export const tagtaskController = new TagTaskController(tagtaskUseCases) // Instantiate the tag task controller

// TaskShare
const taskshareRepository = new TaskShareMySQLRepository() // Instantiate the task share repository
const taskshareUseCases = new TaskShareUsecases(
  taskshareRepository,
  userUseCases,
  taskUseCases
) // Instantiate the task share use cases
export const taskshareController = new TaskShareController(taskshareUseCases) // Instantiate the task share controller

// Task Middleweres
export const taskMiddleweres = new TaskMiddleweres(
  tagtaskUseCases,
  taskshareUseCases,
  commentUseCases,
  fileUseCases,
  fileTaskUseCases
) // Instantiate the task middlewares
