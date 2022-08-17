const { Router } = require("express");
const passport = require("../passport");
const authRoute = require("../middlewares/authRoute");
const { routeLogger } = require("../middlewares/logger");
const routerCuenta = Router();

module.exports = routerCuenta.get("/", routeLogger, authRoute, (req, res) => {
  res.render("layouts/index", { nombre: req.user.username });
});

routerCuenta.get("/login", routeLogger, (req, res) => {
  if (req.isUnauthenticated()) {
    res.render("layouts/login", { error: req.flash("error")[0] });
  } else {
    res.redirect("/");
  }
});

routerCuenta.post(
  "/login",
  routeLogger,
  passport.authenticate("login", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

routerCuenta.get("/signup", routeLogger, (req, res) => {
  res.render("layouts/signup", { error: req.flash("error")[0] });
});

routerCuenta.post(
  "/signup",
  routeLogger,
  passport.authenticate("signup", {
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/login");
  }
);

routerCuenta.get("/logout", routeLogger, (req, res) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if (err) console.log(err);
    res.redirect("/login");
  });
});
