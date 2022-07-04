require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//Firebase
if (process.env.STORAGE == "firebase") {
  const admin = require("firebase-admin");
  const serviceAccount = require("./config/ecommercecoderhouse-2f872-9d1109101c0e.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

//Middlewares
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routers
const routerProductos = require("./routers/routerProductos");
const routerCarritos = require("./routers/routerCarritos");
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarritos);
app.use((req, res, next) => {
  res.status(404).send({error: '-2', description: `route ${req.path} method ${req.method} not yet implemented`});
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

app.on("error", console.error);
