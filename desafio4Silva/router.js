const { Router } = require("express");
const router = Router();
const Contenedor = require("./Contenedor.js");

module.exports = 

router.get("/productos", (req, res) => {
  const contenedor = new Contenedor("productos.txt");
  contenedor.getAll().then((productos) => res.json(productos));
});

router.get("/productos/:id", (req, res) => {
  const contenedor = new Contenedor("productos.txt");
  contenedor
    .getById(req.params.id)
    .then((producto) => res.json(producto))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Producto no encontrado" });
    });
});

router.post("/productos/", (req, res) => {
  const contenedor = new Contenedor("productos.txt");

  const nuevoProducto = req.body;

  contenedor
    .save(nuevoProducto)
    .then((id) => res.json({ ...nuevoProducto, id: id }));
});

router.put("/productos/:id", (req, res) => {
  const contenedor = new Contenedor("productos.txt");
  const id = req.params.id;
  const nuevoProducto = req.body;

  contenedor
    .update(nuevoProducto, id)
    .then((productos) => res.json(productos))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Producto no encontrado" });
    });
});

router.delete("/productos/:id", async (req, res) => {
  const contenedor = new Contenedor("productos.txt");
  const id = req.params.id;

  contenedor
    .deleteById(id)
    .then((productos) => res.json(productos))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Producto no encontrado" });
    });
});
