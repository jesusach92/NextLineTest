import { asClass, createContainer } from 'awilix'

// User Imposts
import {
  UserUseCases,
  UserController,
  UserMySQLRepository,
} from '../../../Modules/User/index.js'

// Authentication Imports
import {
  AuthenticationUsecases,
  AuthenticationController,
  AuthenticationMySQLRepository,
} from '../../../Modules/Authentication/index.js'

// Comments Imports
import {
  CommentUsecases,
  CommentController,
  CommentMySQLRepository,
} from '../../../Modules/Comment/index.js'

// Files Imports
import {
  FileUsecases,
  FileController,
  FileMySQLRepository,
  FileStorageRepository,
} from '../../../Modules/File/index.js'

// Tag Imports
import {
  TagUsecases,
  TagController,
  TagMySQLRepository,
} from '../../../Modules/Tag/index.js'

// Tag-Task Imports
import {
  TagTaskUsecases,
  TagTaskMySQLRepository,
  TagTaskController,
} from '../../../Modules/TagTask/index.js'

// Task Imports

import {
  TaskUsecases,
  TaskMySQLRepository,
  TaskMiddleweres,
  TaskController,
} from '../../../Modules/Task/index.js'

// TaskShare Imports
import {
  TaskShareUsecases,
  TaskShareMySQLRepository,
  TaskShareController,
} from '../../../Modules/TaskShare/index.js'

const container = createContainer()

const setup = () => {
  container.register({
    authenticationRepository: asClass(AuthenticationMySQLRepository),
    authenticationUseCases: asClass(AuthenticationUsecases),
    authenticationController: asClass(AuthenticationController),

    userRepository: asClass(UserMySQLRepository),
    userUseCases: asClass(UserUseCases),
    userController: asClass(UserController),

    taskRepository: asClass(TaskMySQLRepository),
    taskUseCases: asClass(TaskUsecases),
    taskController: asClass(TaskController),
    commentRepository: asClass(CommentMySQLRepository),
    commentUseCases: asClass(CommentUsecases),
    commentController: asClass(CommentController),
    fileRepository: asClass(FileMySQLRepository),
    storageRepository: asClass(FileStorageRepository),
    fileUseCases: asClass(FileUsecases),
    fileController: asClass(FileController),
    tagRepository: asClass(TagMySQLRepository),
    tagUseCases: asClass(TagUsecases),
    tagController: asClass(TagController),
    tagtaskRepository: asClass(TagTaskMySQLRepository),
    tagtaskUseCases: asClass(TagTaskUsecases),
    tagtaskController: asClass(TagTaskController),
    taskshareRepository: asClass(TaskShareMySQLRepository),
    taskshareUseCases: asClass(TaskShareUsecases),
    taskshareController: asClass(TaskShareController),
    taskMiddleweres: asClass(TaskMiddleweres),
  })
}
setup()
export default container
