import mongoose from "mongoose";
import { Schema } from "mongoose";

const pedidoSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Pagado",
  },
  fechaHora: {
    type: Date,
    default: Date.now(),
  },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  detalle: [{ type: Schema.Types.ObjectId, ref: "Detail", required: true }],
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

export default Pedido;
