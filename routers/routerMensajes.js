const { Router } = require("express");
const { routeLogger, errorLogger } = require("../middlewares/logger");
const routerMensajes = Router();

module.exports = routerMensajes.get("/mensajes", routeLogger, (req, res) => {
  try {
    res.render("partials/messageRow", {});
  } catch (err) {
    errorLogger(err);
  }
});
