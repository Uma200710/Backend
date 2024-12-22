import fs from "fs";
import { v4 as uuid } from "uuid";  // Si usas UUID para los IDs de los carritos

class CartService {
  path;
  carts = [];

  constructor({ path }) {
    this.path = path;
    if (fs.existsSync(path)) {
      this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.carts = [];
    }
  }

  // Método para obtener todos los carritos
  async getAll() {
    return this.carts;
  }

  // Otros métodos como create, getById, etc.
  async create() {
    const id = uuid();
    const newCart = {
      id,
      products: [],
    };
    this.carts.push(newCart);
    await this.saveOnFile();
    return newCart;
  }

  async getById({ id }) {
    return this.carts.find(cart => cart.id === id);
  }

  async addProductToCart({ cid, pid }) {
    const cart = this.carts.find(c => c.id === cid);
    if (!cart) return null;

    const productInCart = cart.products.find(p => p.product === pid);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.saveOnFile();
    return cart;
  }

  async saveOnFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error("Error saving to file:", error);
    }
  }
}

// Exportando la instancia del servicio
export const cartService = new CartService({ path: "../src/db/carts.json" });
