import Cart from "../model/cartModel.js";
import Detail from "../model/detailModel.js";
import Product from "../model/productsModel.js";

export class CartService {
  async getOne(idUsuario) {
    const cart = await Cart.findOne({ userid: idUsuario }).populate({
      path: "detalle",
      populate: "product",
    });
    return cart;
  }

  async getAllCarts() {
    const cart = await Cart.find().populate({
      path: "detalle",
      populate: "product",
    });
    return cart;
  }

  async addProduct(idUsuario, idProducto, quantity) {
    const product = await Product.findById(idProducto);
    if (!product) throw new Error("producto no encontrado");

    let cart = await Cart.findOne({ userid: idUsuario });
    if (!cart) cart = await Cart.create({ userid: idUsuario });

    // Buscar si ya existe un detail para este producto en el carrito
    const existingDetail = await Detail.findOne({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (existingDetail) {
      // Si existe, actualizar la cantidad
      existingDetail.quantity += quantity;
      existingDetail.price = product.price;
      await existingDetail.save();
    } else {
      // Si no existe, crear un detail nuevo
      const newDetail = await Detail.create({
        product: idProducto,
        quantity,
        price: product.price,
      });
      // Agregar el detail al carrito
      cart.detalle.push(newDetail._id);
      await cart.save();
    }

    return await this.getOne(idUsuario);
  }

  async removeProduct(idUsuario, idProducto) {
    const cart = await Cart.findOne({ userid: idUsuario });
    if (!cart) throw new Error("carrito no encontrado");

    const detail = await Detail.findOne({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (detail) {
      await Detail.findByIdAndDelete(detail._id);
      cart.detalle = cart.detalle.filter(
        (id) => id.toString() !== detail._id.toString()
      );
      await cart.save();
    }

    return await this.getOne(idUsuario);
  }

  async removeOneProduct(idUsuario, idProducto) {
    const cart = await Cart.findOne({ userid: idUsuario });
    if (!cart) throw new Error("carrito no encontrado");

    const detail = await Detail.findOne({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (detail) {
      detail.quantity -= 1;
      if (detail.quantity <= 0) {
        await Detail.findByIdAndDelete(detail._id);
        cart.detalle = cart.detalle.filter(
          (id) => id.toString() !== detail._id.toString()
        );
        await cart.save();
      } else {
        await detail.save();
      }
    }

    return await this.getOne(idUsuario);
  }

  async ClearCart(idUsuario) {
    const cart = await Cart.findOne({ userid: idUsuario });
    if (!cart) throw new Error("carrito no encontrado");

    await Detail.deleteMany({_id:{ $in: cart.detalle }});
    cart.detalle = [];
    await cart.save();

    return await this.getOne(idUsuario);
  }
}

/*
///////////////////////////////////////////////
const cart = await Cart.findById(cartId).populate({
  path: "detalle",
  populate: {
    path: "product",
    populate: {
      path: "category",
      populate: {
        path: "supplier",
      },
    },
  },
});


//////////////////////////////////////////////////////////////////
const cart = await Cart.findById(cartId)
  .populate({
    path: "detalle",
    select: "quantity price product", // qué traer del detalle
    populate: {
      path: "product",
      select: "name price category", // qué traer del producto
      populate: {
        path: "category",
        select: "name supplier", // qué traer de la categoría
        populate: {
          path: "supplier",
          select: "name country", // qué traer del proveedor
        },
      },
    },
  });

*/
