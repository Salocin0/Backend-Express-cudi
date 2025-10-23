import { Router } from "express";
import { getOneProduct,getAllProducts,createOneProduct,updateOneProduct,deleteProduct,getAllProductsPaginado,getAllProductsFiltrado,getAllProductsPopulado,getAllProductsCategory } from "../controller/productsController.js";
import { postProducto,defaultValidation } from "../validations/productsValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import {authMiddleware} from "../middleware/authMiddleware.js"
//responsable del ruteo (funciones del controller) + ejecutar middlewares
const productsRouter = Router()
//AMBC / CRUD

productsRouter.get("/paginado/",defaultValidation,validationMiddleware, getAllProductsPaginado) //?page=4&limit=8
productsRouter.get("/filtrado/",defaultValidation,validationMiddleware, getAllProductsFiltrado)
productsRouter.get("/populado",defaultValidation,validationMiddleware, getAllProductsPopulado) //?page=4&limit=8
//GET con un id: que va a traer un elemento
productsRouter.get("/:id",defaultValidation,validationMiddleware, getOneProduct) 

//get por category
productsRouter.get("/category/:category", getAllProductsCategory)

//GET: que va a traer todos los elementos*
//usuario tenga token, sea user o admin, me comprima la salida, me la valide
productsRouter.get("/",defaultValidation,validationMiddleware, getAllProducts) //?page=4&limit=8


//POST datos en el body: crea un elemento
productsRouter.post("/",authMiddleware,postProducto,validationMiddleware,  createOneProduct)

//PUT datos en el body + id: actualiza un elemento especifico
productsRouter.put("/:id",defaultValidation,validationMiddleware, updateOneProduct)

//DELETE con un id: eleminar un elemento de la base de datos (logica/fisica)
productsRouter.delete("/:id",defaultValidation,validationMiddleware, deleteProduct)

export default productsRouter