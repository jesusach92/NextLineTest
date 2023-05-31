import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import fileupload from 'express-fileupload'
import GeneralRouter from './Shared/Infrastructure/Routes/index.routes.js'

export default class Application {
  constructor(port) {
    this.port = port
    this.app = express()
    this.app.use(fileupload({ limits: { fileSize: 50 * 1024 * 1024 } }))
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan('dev'))
  }

  /**
   * Start the application by setting up the routes and listening on the specified port.
   */
  start = () => {
    this.app.use('/Api/v1', GeneralRouter)
    this.app.listen(this.port, () => {
      console.log('SERVER ON PORT:', this.port)
    })
  }
}
