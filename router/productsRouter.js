import { Router } from "express";
import { getOneProduct,getAllProducts,createOneProduct,updateOneProduct,deleteProduct } from "../controller/productsController.js";
import { postProducto,defaultValidation } from "../validations/productsValidation.js";
import validationMiddleware from "../validations/validationMiddleware.js";
//responsable del ruteo (funciones del controller) + ejecutar middlewares
const productsRouter = Router()
//AMBC / CRUD

//GET con un id: que va a traer un elemento
productsRouter.get("/:id",defaultValidation,validationMiddleware, getOneProduct)

//GET: que va a traer todos los elementos*
productsRouter.get("/",defaultValidation,validationMiddleware, getAllProducts)

//POST datos en el body: crea un elemento
productsRouter.post("/",postProducto,validationMiddleware,  createOneProduct)

//PUT datos en el body + id: actualiza un elemento especifico
productsRouter.put("/:id",defaultValidation,validationMiddleware, updateOneProduct)

//DELETE con un id: eleminar un elemento de la base de datos (logica/fisica)
productsRouter.delete("/:id",defaultValidation,validationMiddleware, deleteProduct)

export default productsRouter