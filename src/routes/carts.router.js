import express from "express";
import { cartService } from "../services/cart.service.js";

const router = express.Router();

// Ruta para obtener todos los carritos
router.get("/", async (req, res) => {
  const carts = await cartService.getAll();
  res.json(carts);
});

// Ruta para obtener un carrito por ID
router.get("/:cid", async (req, res) => {
  const cart = await cartService.getById({ id: req.params.cid });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  res.json(cart);
});

// Ruta para agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await cartService.addProductToCart({ cid: req.params.cid, pid: req.params.pid });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  res.status(201).json(cart);
});

export default router;
