const routerProductos = require('./routerProductos.js');
const routerCarrito = require('./routerCarrito.js');
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(cors());
app.options('*', cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.use((req, res, next) => {
  res.status(404).send({error: '-2', description: `route ${req.path} method ${req.method} not yet implemented`});
});

const server = app.listen(PORT, ()=> {
  console.log(`Servidor listo y escuchando en ${server.address().port}`);
})
