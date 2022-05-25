const { Router } = require("express");
const router = Router();
const Contenedor = require("../Contenedor.js");

module.exports = 

router.get("/productos", (req, res) => {
  const contenedor = new Contenedor("../productos.txt");
  contenedor.getAll().then((productos) => res.render("layouts/main", {productos}));
});

router.post("/productos/", (req, res) => {
  const contenedor = new Contenedor("../productos.txt");

  const nuevoProducto = req.body;

  contenedor
    .save(nuevoProducto)
    .then(() => res.redirect('/'));
});