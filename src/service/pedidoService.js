import Pedido from "../model/pedidoModel.js";
import Detail from "../model/detailModel.js";

export class PedidoService{
    async create(status,fecha,userid,detalles){
        const detallescreados = await Detail.insertMany(detalles)

        const detallesId = detallescreados.map(detalle => detalle._id)

        const pedido ={
            status,
            fecha,
            userid,
            detalle:detallesId
        }

        const pedidodb= await Pedido.create(pedido)

        return pedidodb
    }

    async estadistica(fechaDesde,fechaHasta){
        const pedidos = await Pedido.find({
            fechaHora:{
                $gte: new Date(fechaDesde),
                $lte:new Date(fechaHasta)
            }
        }).populate("detalle")

        const totalXDia = {}

        for (const pedido of pedidos){
            const fecha = new Date(pedido.fechaHora)
            const dia = fecha.getDate()
            const mes = fecha.getMonth()+1
            const fechaStr = `${dia}/${mes}`

            let totalPedido = 0

            for (const detalle of pedido.detalle){
                totalPedido += detalle.price * detalle.quantity
            }

            if(!totalXDia[fechaStr]){
                totalXDia[fechaStr] = 0
            }
            totalXDia[fechaStr] += totalPedido
        }

        const fechas = []
        const totales = []

        const fechainicio = new Date(fechaDesde)
        const fechaFin = new Date(fechaHasta)

        for(let d = new Date(fechainicio); d <= fechaFin; d.setDate(d.getDate()+1)){
            const dia = d.getDate();
            const mes = d.getMonth()+1
            const fechaStr = `${dia}/${mes}`
            fechas.push(fechaStr)
            totales.push(totalXDia[fechaStr]||0)
        }

        return {fechas,totales}
    }
}