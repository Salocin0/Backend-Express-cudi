import mongoose from "mongoose";
const {Schema,model} = mongoose

const productSchema = new Schema({
    name:String,
    price:Number,
    status:Boolean,
    id:Number
});

const Product = model("Product",productSchema);
export default Product