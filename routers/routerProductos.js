const { Router } = require("express");
const routerProductos = Router();
const crearDatos = require("../utils/crearDatos");

module.exports = routerProductos.get("/productos", (req, res) => {
  res.render("partials/productRow", {});
});

routerProductos.get("/api/productos-test", (req, res) => {
  const productos = crearDatos();
  res.type("json").send(JSON.stringify(productos, null, 4));
});
