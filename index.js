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
    methods:["GET","PUT","POST","DELETE"],
    allowedHeaders: ["Content-Type"]
}

app.use(express.json({ limit: '10mb' }))    
app.use(cors(corsOptions))

app.use("/api/products",productsRouter) //ABMC
app.use("/api/category",categoryRouter)
//app.use(api/pedidos)


app.use((req,res)=>{
    res.status(404).json({
      mensage: "Route not found",
      code: 404,
      data: {},
    });
});

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("base de datos conectada a " + process.env.MONGOURL)
}).catch((error)=>{
    console.log(error)
})

app.listen(PORT,()=>{
    console.log(`running in http://localhost:${PORT}`)
})