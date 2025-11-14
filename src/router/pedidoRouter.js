import { Router } from "express";
import { createPedido,getEstadisticas } from "../controller/pedidoController.js";

const pedidosRouter = Router()

pedidosRouter.post("/",createPedido)

pedidosRouter.post("/estadisticas",getEstadisticas)

export default pedidosRouter