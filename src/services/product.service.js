import fs from "fs";
import { v4 as uuid } from "uuid";

class ProductService {
  path;
  products = [];

  constructor({ path }) {
    this.path = path;
    if (fs.existsSync(path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.products = [];
    }
  }

  async getAll() {
    return this.products;
  }

  async getById({ id }) {
    return this.products.find(product => product.id === id);
  }

  async create({ title, description, code, price, stock, category, thumbnails = [] }) {
    const id = uuid();
    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails,
    };
    this.products.push(newProduct);
    await this.saveOnFile();
    return newProduct;
  }

  async update({ id, title, description, code, price, stock, category, thumbnails }) {
    const product = this.products.find(p => p.id === id);
    if (!product) return null;

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.code = code ?? product.code;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;
    product.thumbnails = thumbnails ?? product.thumbnails;

    await this.saveOnFile();
    return product;
  }

  async delete({ id }) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return null;
    const deletedProduct = this.products.splice(index, 1);
    await this.saveOnFile();
    return deletedProduct[0];
  }

  async saveOnFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error("Error saving to file:", error);
    }
  }
}

export const productService = new ProductService({ path: "../src/db/products.json" });
