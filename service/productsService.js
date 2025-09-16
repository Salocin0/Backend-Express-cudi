import Product from "../model/productsModel.js";
export class productsService {
  async getOne(id) {
    console.log(id)
    const producto = await Product.findOne({id:Number(id)})
    return producto
  }

  async getAll() {
    const productos = await Product.find()
    return productos
  }

  async create(name,price) {
    const idGenerado = Math.ceil((Math.random()*1000000)+1)
      const producto = {
    name,
    price,
    status:true,
    id:idGenerado
  };
    const ProductoCreado = await Product.create(producto)
    return ProductoCreado
  }

  async update(producto) {
    const productoActualizado = await Product.updateOne({id:producto.id},{...producto})
    return productoActualizado
  }
  // borrado fisico o logico
  async deleteLogicoProduct(id) { 
    const productoEliminado = await Product.updateOne({id:id}, {status:false})
    return productoEliminado
  }
/*
  async deleteFisicoProduct(id) {
    const productoEliminado = await Product.deleteOne({id:id})

    return productoEliminado
  }*/
}
