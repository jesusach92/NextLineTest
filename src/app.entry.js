import express,{Router} from 'express'
import cors from 'cors'
import morgan from 'morgan'

export default class Application {
    constructor (port){
        this.port = port
        this.express = express()
        this.express.use
        this.express.use(express.json())
        this.express.use(morgan('dev'))
        this.express.use(cors())

        
    }

} 


