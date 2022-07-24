const { Router } = require("express");
const routerCuenta = Router();
const authRoute = require("../middlewares/authRoute");
const passport = require("../passport");

module.exports = routerCuenta.get("/", authRoute, (req, res) => {
  res.render("layouts/index", { nombre: req.user.username });
});

routerCuenta.get("/login", (req, res) => {
  if(req.isUnauthenticated()){
    res.render("layouts/login", { error: req.flash("error")[0] });
  }else{
    res.redirect('/');
  }
});

routerCuenta.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

routerCuenta.get("/signup", (req, res) => {
  res.render("layouts/signup", { error: req.flash("error")[0] });
});

routerCuenta.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/login");
  }
);

routerCuenta.get("/logout", (req, res) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if(err) console.log(err);
    res.redirect("/login");
  });
});
