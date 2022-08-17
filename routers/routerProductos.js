const { Router } = require("express");
const { routeLogger, errorLogger } = require("../middlewares/logger");
const crearDatos = require("../utils/crearDatos");
const routerProductos = Router();

module.exports = routerProductos.get("/productos", routeLogger, (req, res) => {
  try {
    res.render("partials/productRow", {});
  } catch (err) {
    errorLogger(err);
  }
});

routerProductos.get("/api/productos-test", routeLogger, (req, res) => {
  try {
    const productos = crearDatos();
    res.type("json").send(JSON.stringify(productos, null, 4));
  } catch (err) {
    errorLogger(err);
  }
});
