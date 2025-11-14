import { PedidoService } from "../service/pedidoService.js";

const pedidoService = new PedidoService();

export const createPedido = async (req, res, next) => {
  try {
    const { status, fecha, userId, detalles } = req.body;

    const pedidoCreado = await pedidoService.create(
      status,
      fecha,
      userId,
      detalles
    );
    res.status(201).json({
      mensage: "Success",
      code: 201,
      data: pedidoCreado,
    });
  } catch (error) {
    next(error);
  }
};

export const getEstadisticas = async (req, res, next) => {
  try {
    const { fechaDesde, fechaHasta } = req.body;
    const data = await pedidoService.estadistica(fechaDesde, fechaHasta);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: data,
    });
  } catch (error) {
    next(error)
  }
};
