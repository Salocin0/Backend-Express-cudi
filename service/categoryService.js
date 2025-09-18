import Category from "../model/categoryModel.js";
export class CategoryService {
  getOne(id) {}

  async getOneByName(name) {
    const category = await Category.findOne({ name });
    return category;
  }

  async getAll() {
    const categories = await Category.find();
    return categories
  }
  async create(name, description, image) {
    const category = await Category.create({name,description,image})
    return category
  }
  update(id, name, description, image) {}
  delete(id) {}
}
