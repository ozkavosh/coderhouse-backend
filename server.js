const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HTTPServer } = require("http");
const Contenedor = require("./Contenedor.js");
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

const contenedorMensajes = new Contenedor("mensajes.json");
const contenedorProductos = new Contenedor("productos.json");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

const server = httpServer.listen(8080, () => {
  console.log(
    `Servidor listo y escuchando en el puerto ${server.address().port}`
  );
});

app.get("/", async (req, res) => {
  res.render("layouts/index", {});
});

app.get("/productos", async (req, res) => {
  res.render('partials/productRow', {})
});

app.get("/mensajes", async (req, res) => {
  res.render('partials/messageRow', {})
});

io.on("connection", async (socket) => {
  const productos = await contenedorProductos.getAll();
  const mensajes = await contenedorMensajes.getAll();
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  socket.on("productoPost", async (producto) => {
    const productos = await contenedorProductos.save(producto);
    io.sockets.emit('productos', productos);
  });

  socket.on("mensajePost", async (mensaje) => {
    const mensajes = await contenedorMensajes.save({...mensaje, userId: socket.id, date: new Date(Date.now()).toLocaleString()});
    io.sockets.emit('mensajes', mensajes);
  })
});

app.on("error", (err) => console.log(err));
