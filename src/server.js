import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const PORT = 8080;

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
