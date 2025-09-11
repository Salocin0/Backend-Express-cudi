import Product from "../model/productsModel.js";
export class productsService {
  getOne(id) {
    //throw new Error("error al buscar el producto")
    return this.productosMock.find((prod) => prod.id == id);
  }

  async getAll() {
    const productos = await Product.find()
    console.log(productos)
    return productos
  }

  async create(producto) {
    const ProductoCreado = await Product.create(producto)
    return ProductoCreado
  }

  update(producto) {
    //buscar elemento
    const index = this.productosMock.findIndex((prod)=>prod.id==producto.id)
    //actualizar el elemento
    this.productosMock[index] = producto;
    //devolver el elemento actualizado
    return this.productosMock[index]
  }

  updatePartial(producto) {
    const index = this.productosMock.findIndex((prod)=>prod.id==producto.id)

    this.productosMock[index] = {
      ...this.productosMock[index],
      ...producto
    }

    return this.productosMock[index]
  }

  deleteProduct(id) { // borrado fisico o logico
    this.productosMock[id-1].state=false;

    return this.productosMock[id-1]
  }
}
