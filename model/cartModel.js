import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Pendiente", "Pagado"],
    default: "Pendiente",
  },
  fechaHora: {
    type: Date,
    default: Date.now(),
  },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  detalle: [{ type: Schema.Types.ObjectId, ref: "Detail", required: true }],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
