import Category from "../model/categoryModel.js";
import Product from "../model/productsModel.js";
import { CategoryService } from "./categoryService.js";

const cs = new CategoryService();
export class productsService {
  async getOne(id) {
    const producto = await Product.findById(id);
    return producto;
  }

  async getAll() {
    const productos = await Product.find();
    return productos;
  }

  async getAllPopulado() {
    const productos = await Product.find().populate("category","name");
    return productos;
  }

  async getAllPaginado(page,limit,offset){
    const productos = await Product.find().populate("category","name").skip(offset).limit(limit);
    return productos;
  }

  async getAllProductsCategory(category){
    const categorydb = await Category.findOne({name: category})
    let productos = await Product.find({category: categorydb?._id}).populate("category","name");
    if(!productos || productos.length === 0){
      productos = await Product.find().populate("category","name");
    }
    return productos;
  }

  async create(title, price, desciption, image, category, rate, count, stock) {
    const objectCaregory = await cs.getOneByName(category);
    const producto = {
      title,
      price,
      desciption,
      image,
      stock,
      category: objectCaregory._id,
      rating: {
        rate,
        count,
      },
    };
    const ProductoCreado = await Product.create(producto);
    return ProductoCreado;
  }

  async update(id,title, price, desciption, image, category, rate, count, stock) {
    const producto = {
      title,
      price,
      desciption,
      image,
      stock,
      category,
      rating: {
        rate,
        count,
      },
    };

    const productoActualizado = await Product.findByIdAndUpdate(id, {
      ...producto,
    });
    return productoActualizado;
  }
  // borrado fisico o logico
  async deleteLogicoProduct(id) {
    const productoEliminado = await Product.findByIdAndUpdate(id, {
      status: false,
    });
    return productoEliminado;
  }
  /*
  async deleteFisicoProduct(id) {
    const productoEliminado = await Product.deleteOne({id:id})

    return productoEliminado
  }*/
}
