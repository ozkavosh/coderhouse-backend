const { Router } = require("express");
const routerCarrito = Router();
const { carts: contenedorCarrito } = require("../daos")();
const middlewares = require("../middlewares.js");

module.exports = routerCarrito.post("/", async (req, res) => {
  const timestamp = new Date(Date.now()).toLocaleString();
  await contenedorCarrito.save({ timestamp, products: [] });
  const carritos = await contenedorCarrito.getAll();
  const id = carritos[carritos.length - 1]?.id || carritos[carritos.length - 1]?._id ;
  res.json({ id });
});

routerCarrito.delete("/:id", async (req, res) => {
  try {
    await contenedorCarrito.deleteById(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: "Cart not found!" });
  }
});

routerCarrito.get("/:id/productos", async (req, res) => {
  try {
    const carrito = await contenedorCarrito.getById(req.params.id);
    res.json(carrito.products);
  } catch {
    res.status(404).json({ error: "Cart not found!" });
  }
});

routerCarrito.post(
  "/:id/productos",
  middlewares.validarProducto(),
  middlewares.validarId(),
  async (req, res) => {
    try {
      const { products, timestamp } = await contenedorCarrito.getById(
        req.params.id
      );
      const productTimestamp = new Date(Date.now()).toLocaleString();
      switch (process.env.STORAGE) {
        case "mongodb":
          products.push({ ...req.body, timestamp: productTimestamp, _id: req.body.id });
          break;
        default:
          products.push({ ...req.body, timestamp: productTimestamp });
          break;
      }
      await contenedorCarrito.update(req.params.id, { products, timestamp });
      res.json({ success: true });
    } catch {
      res.status(404).json({ error: "Cart not found!" });
    }
  }
);

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { products, timestamp } = await contenedorCarrito.getById(
      req.params.id
    );
    const productsAux = products.filter(({ id }) => id != req.params.id_prod);
    productsAux.length === products.length
      ? res.status(404).json({ error: "Product not found in cart!" })
      : res.json(
          await contenedorCarrito.update(req.params.id, {
            products: productsAux,
            timestamp,
          })
        );
  } catch {
    res.status(404).json({ error: "Cart not found!" });
  }
});
