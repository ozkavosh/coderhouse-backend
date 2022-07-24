const { Router } = require("express");
const routerMensajes = Router();

module.exports = routerMensajes.get("/mensajes", (req, res) => {
  res.render("partials/messageRow", {});
});
