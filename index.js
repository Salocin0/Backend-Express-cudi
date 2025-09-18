import express from "express"
import productsRouter from "./router/productsRouter.js"
import categoryRouter from "./router/categoryRouter.js"
import env from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
env.config()

const PORT = process.env.PORT

const app = express()

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods:["GET","PUT","POST","DELETE"], //no bloquea directamente sino que es lo que responde al tirar el options
    allowedHeaders: ["Content-Type"]
}

app.use(express.json())
app.use(cors(corsOptions))

app.use("/api/products",productsRouter) //ABMC
app.use("/api/category",categoryRouter)

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("base de datos conectada a " + process.env.MONGOURL)
}).catch((error)=>{
    console.log(error)
})

app.listen(PORT,()=>{
    console.log(`running in http://localhost:${PORT}`)
})