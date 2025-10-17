import { Router } from "express";
import {getAllCarts, getOneCart,addProduct,removeOneProduct,removeProduct,ClearCart} from "../controller/cartController.js"

const cartRouter = Router()

cartRouter.get("/",getOneCart)
//cartRouter.get("/",getAllCarts)
cartRouter.post("/add",addProduct)
cartRouter.post("/remove",removeProduct)
cartRouter.post("/removeOne",removeOneProduct)
cartRouter.post("/clear",ClearCart)


export default cartRouter