import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import UserRoutes from "./router/UserRoutes.js";
import ItemRoutes from "./router/ItemRoutes.js";


dotenv.config();
const app = express();
const port = process.env.PORT
const DB = process.env.MONGO_URL

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//Routes
app.use("/api",UserRoutes)
app.use("/api",ItemRoutes)

//Server create and Database Connected
app.listen(port,()=>{
    mongoose.connect(DB).then(()=>(
        console.log(`Server on port ${port} and Database_Connected`)
    )).catch(error=>console.log(error))
})