import express from "express"
import productsRouter from "./router/productsRouter.js"
import env from "dotenv"
import mongoose from "mongoose"
env.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use("/api/products",productsRouter)
//app.use("/api/category",categoriesRouter)

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("base de datos conectada a " + process.env.MONGOURL)
}).catch((error)=>{
    console.log(error)
})

app.listen(PORT,()=>{
    console.log(`running in http://localhost:${PORT}`)
})