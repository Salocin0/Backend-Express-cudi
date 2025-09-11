import mongoose from "mongoose";
const {Schema,model} = mongoose

const productSchema = new Schema({
    name:String,
    price:Number,
    state:Boolean
});

const Product = model("Product",productSchema);
export default Product