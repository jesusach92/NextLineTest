import Application from './app.entry.js'
import 'dotenv/config'

// Create an instance of the Application class with the provided port number or default to 3000
const server = new Application(process.env.PORT_SERVER || 3000)

// Start the server
server.start()
