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

  async getAllPaginado(page, limit, offset) {
    const productos = await Product.find().skip(offset).limit(limit);
    const totalProduct = await Product.countDocuments();
    const totalPage = Math.ceil(totalProduct / limit);

    const result = {
      productos,
      totalProduct,
      totalPage,
      currentPage: page,
      prevpage: page > 1,
      postpage: page < totalPage,
    };

    return result;
  }

  async getAllFiltrado(name, pmin, pmax, sortby, order) {
    const filters = { status: true };
    if (name) {
      filters.title = { $regex: name, $options: "i" };
    }
    if (pmin || pmax) {
      filters.price = {};
      if (pmin) {
        filters.price.$gte = Number(pmin);
      }
      if (pmax) {
        filters.price.$lte = Number(pmax);
      }
    }

    const sortOptions = {};
    if (sortby) {
      sortOptions[sortby] = order == "desc" ? -1 : 1;
    }
    const productos = Product.find(filters).sort(sortOptions);
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

  async update(
    id,
    title,
    price,
    desciption,
    image,
    category,
    rate,
    count,
    stock
  ) {
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
