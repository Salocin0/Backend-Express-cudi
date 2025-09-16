import { Router } from "express";
import { getOneProduct,getAllProducts,createOneProduct,updateOneProduct,deleteProduct } from "../controller/productsController.js";
//responsable del ruteo (funciones del controller) + ejecutar middlewares
const productsRouter = Router()
//AMBC / CRUD

//GET con un id: que va a traer un elemento
productsRouter.get("/:id", getOneProduct)

//GET: que va a traer todos los elementos*
productsRouter.get("/", getAllProducts)

//POST datos en el body: crea un elemento
productsRouter.post("/", createOneProduct)

//PUT datos en el body + id: actualiza un elemento especifico
productsRouter.put("/:id", updateOneProduct)

//DELETE con un id: eleminar un elemento de la base de datos (logica/fisica)
productsRouter.delete("/:id", deleteProduct)

export default productsRouter