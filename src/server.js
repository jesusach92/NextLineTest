import Application from "./app.entry.js";
import "dotenv/config"

const server = new Application(process.env.PORT_SERVER || 3000)

server.start()