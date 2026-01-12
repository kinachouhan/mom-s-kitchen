import express from "express"
import dotenv from "dotenv"
dotenv.config()
import {dbConnect} from "./dbConfig/dbConnect.js"

const app = express()
const PORT = process.env.PORT || 5100
dbConnect()



app.listen(PORT , ()=>{
     console.log(`Server is listening on ${PORT} port`)
})