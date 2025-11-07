import { logger } from "../config/Winston.js"

export const errorHandler = (err,req,res,next) =>{
    logger.error(`${req.method} - ${req.url} - ${err.message}`);

    res.status(500).json({
        mensage: "Error: internal server",
        code: 500,
    })
}