import { productsService } from "../service/productsService.js";

//responsable de quitar las variables de la peticion y preparar la salida
const ps = new productsService()

export const getOneProduct = (req, res) => {
  try {
    //extraer del req las variables
    const { id } = req.params;
    //llamamos al service que resuelve la logica
    const producto = ps.getOne(id);
    //devolver resultado
    res.send(producto);
  } catch (error) {
    //devolvemos error 500: error servidor
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

  if (!name || !price) {
    res.send("faltan parametros");
  }

  const producto = {
    name,
    price,
    status:true
  };
  const productoCreado = await ps.create(producto);
  res.send(productoCreado);
};

export const updateOneProduct = (req, res) => {
  const {id} = req.params
  const {name,price,status} = req.body

  if(!name || !price || !status || !id){
    res.send("faltan parametros");
  }

  const producto = {
    name,price,status,id
  }

  const productoActualizado = ps.update(producto)
  res.send(productoActualizado)
};

export const updatePartialProduct = (req, res) => {
  const {id} = req.params
  const {name,price,status} = req.body

  const producto = {
    name,price,status,id
  }

  const productoActualizado = ps.updatePartial(producto)
  res.send(productoActualizado)
};

export const deleteProduct = (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const productoEliminado = ps.deleteProduct(Number(id))
        res.send(productoEliminado)
    } catch (error) {
        
    }
};
