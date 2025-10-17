import { CartService } from "../service/cartService";

const cartService = new CartService()

export const getOneCart = async () => {
  try {
    const user = req.user;
    const cart = cartService.getOne(user.id);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const getAllCarts = async () => {
  try {
    const carts = cartService.getAll();
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: carts,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const addProduct = async () => {
  try {
    const user = req.user;
    const {idProducto,quantity} = req.body
    const cart = cartService.addProduct(user.id,idProducto,quantity);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const removeProduct = async () => {
  try {
    const user = req.user;
    const {idProducto} = req.body
    const cart = cartService.removeProduct(user.id);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const removeOneProduct = async () => {
  try {
    const user = req.user;
    const {idProducto} = req.body
    const cart = cartService.removeOneProduct(user.id,idProducto);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const ClearCart = async () => {
  try {
    const user = req.user;
    const cart = cartService.ClearCart(user.id);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};
