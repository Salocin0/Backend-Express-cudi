import Cart from "../model/cartModel.js";
import Detail from "../model/detailModel.js";
import Product from "../model/productsModel.js";

export class CartService {
  async getOne(idUsuario) {
    const cart = await Cart.find({ userid: idUsuario }).populate({
      path: "detail",
      populate: "product",
    });
    return cart;
  }

  async getAllCarts() {
    const cart = await Cart.find().populate({
      path: "detail",
      populate: "product",
    });
    return cart;
  }

  async addProduct(idUsuario, idProducto, quantity) {
    const product = await Product.findById(idProducto);
    if (!product) throw new Error("producto no encontrado");

    const cart = await Cart.findOne({ userid: idUsuario });
    if (!cart) cart = await Cart.create({ userid: idUsuario });

    //buscamos los detalles del carrito que product sea igual a idproducto
    const detail = await Detail.find({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (detail) {
      //si existe sumamos queantity a la cantidad
      detail.quantity += quantity;
      detail.price = product.price;
      await detail.save();
    } else {
      //sino creamos un detail nuevo asociado al producto
      detail = await Detail.create({
        product: idProducto,
        quantity,
        price: product.price,
      });
    }
    await cart.save();

    return this.getOne(idUsuario);
  }

  async removeProduct(idUsuario, idProducto) {
    const cart = await Cart.find({ userid: idUsuario });
    if (!cart) cart = await Cart.create({ userid: idUsuario });

    const detail = await Detail.find({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (detail) {
      await Detail.findByIdAndDelete(detail._id);
      cart.detail = cart.detail.filter(
        (id) => id.toString() !== detail._id.toString()
      );
      await cart.save();
    }

    return this.getOne(idUsuario);
  }

  async removeOneProduct(idUsuario, idProducto) {
    const cart = await Cart.find({ userid: idUsuario });
    if (!cart) cart = await Cart.create({ userid: idUsuario });

    const detail = await Detail.find({
      product: idProducto,
      _id: { $in: cart.detalle },
    });

    if (detail) {
      detail.quantity -= 1;
      if (detail.quantity <= 0) {
        await Detail.findByIdAndDelete(detail._id);
        cart.detail = cart.detail.filter(
          (id) => id.toString() !== detail._id.toString()
        );
        await cart.save();
      }
    }

    return this.getOne(idUsuario)
  }

  async ClearCart(idUsuario) {
    const cart = await Cart.find({ userid: idUsuario });
    if (!cart) cart = await Cart.create({ userid: idUsuario });

    await Detail.deleteMany({_id:{ $in: cart.detalle }})
    cart.detail = []
    await cart.save()

    return this.getOne(idUsuario)
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
