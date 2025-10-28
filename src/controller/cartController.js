import { CartService } from "../service/cartService.js";

const cartService = new CartService()

export const getOneCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.getOne(user.id);
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

export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
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

export const addProduct = async (req, res) => {
  try {
    const user = req.user;
    const {idProducto,quantity} = req.body
    const cart = await cartService.addProduct(user.id,idProducto,quantity);
    res.status(200).json({
      mensage: "Success",
      code: 200,
      data: cart,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      mensage: "Error",
      code: 500,
      data: error,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const user = req.user;
    const {idProducto} = req.body
    const cart = await cartService.removeProduct(user.id, idProducto);
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

export const removeOneProduct = async (req, res) => {
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

export const ClearCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.ClearCart(user.id);
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
