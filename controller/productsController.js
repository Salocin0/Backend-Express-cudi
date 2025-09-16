import { productsService } from "../service/productsService.js";

//responsable de quitar las variables de la peticion y preparar la salida
const ps = new productsService()

export const getOneProduct = async (req, res) => {
  try {
    //extraer del req las variables
    const { id } = req.params;
    //llamamos al service que resuelve la logica
    const producto = await ps.getOne(id);
    //devolver resultado
    res.send(producto);
  } catch (error) {
    console.log(error)
    res.send(500);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const productos = await ps.getAll();
    res.status(200).json(productos);
  } catch (error) {}
};

export const createOneProduct = async (req, res) => {
  const { name, price } = req.body;
  console.log(name, price);

  if (!name || !price) {
    res.send("faltan parametros");
  }

  const productoCreado = await ps.create(name,price);
  res.send(productoCreado);
};

export const updateOneProduct = async (req, res) => {
  const {id} = req.params
  const {name,price,status} = req.body

  const producto = {
    name,price,status,id:Number(id)
  }

  const productoActualizado = await ps.update(producto)
  res.send(productoActualizado)
};

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const productoEliminado = await ps.deleteLogicoProduct(Number(id))
        res.send(productoEliminado)
    } catch (error) {
        
    }
};
