import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import GeneralRouter from './Shared/Infraestructure/Router/index.js'

export default class Application {
    constructor (port){
        this.port = port
        this.app = express()
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(morgan('dev'))
    }

    start =()=>{
        this.app.use('/Api/v1',GeneralRouter) 
        this.app.listen(this.port,()=>{
        console.log('SERVER ON PORT:',this.port)
     })
    }

} 


