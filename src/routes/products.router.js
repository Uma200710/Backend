import express from "express";
import { productService } from "../services/product.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productService.getAll();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const product = await productService.getById({ id: req.params.pid });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const product = await productService.create({ title, description, code, price, stock, category, thumbnails });
  res.status(201).json(product);
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const product = await productService.update({ id: pid, title, description, code, price, stock, category, thumbnails });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productService.delete({ id: pid });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted", product });
});

export default router;
