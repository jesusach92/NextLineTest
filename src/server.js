import app from "./app.entry.js";
import "dotenv/config"


app.listen(process.env.PORT,()=>{
    console.log("Server is running")
})