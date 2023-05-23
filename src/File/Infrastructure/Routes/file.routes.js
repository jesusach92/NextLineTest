import { Router } from 'express'
import { FileUseCases } from '../../Application/file.usecases.js'
import { FileController } from '../Controllers/file.controller.js'
import { MySQLFileRepository } from '../Repository/file.mysql.repository.js'
import { StoregeFileRepository } from '../Repository/file.storage.repository.js'
// import { MockfileRepository } from '../Repository/file.mock.respository.js'
// Crear instancia del repositorio de MySQL para usuarios
const fileRepository = new MySQLFileRepository()
const storageRepository = new StoregeFileRepository()
// Crear instancias de los casos de uso y pasar el repositorio como dependencia
export const fileUseCases = new FileUseCases(fileRepository, storageRepository)

// Crear instancia del controlador y pasar los casos de uso como dependencia
const fileController = new FileController(fileUseCases)

// Crear instancia del router de usuarios
const fileRouter = Router()

// Definir rutas de usuarios y asignar los métodos del controlador
fileRouter.get('/', fileController.getFiles) // Obtener todos los usuarios
fileRouter.get('/:id', fileController.getFile) // Obtener un usuario por su UUID
fileRouter.post('/', fileController.uploadFile) // Crear un nuevo usuario
fileRouter.delete('/:id', fileController.deleteFile) // Eliminar un usuario por su UUID

// Exportar el router de usuarios
export default fileRouter
