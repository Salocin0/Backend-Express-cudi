import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  desciption: { type: String, default: "" },
  image: { type: String, default: "" },
  stock: { type: Number, default: 20 },

  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },

  rating: {
    rate: Number,
    count: Number,
  },
  status: { type: Boolean, default: true },
});

const Product = model("Product", productSchema);
export default Product;
