const express = require("express");
const normalizr = require("normalizr");
const { Server: IOServer } = require("socket.io");
const { Server: HTTPServer } = require("http");
const Contenedor = require("./Contenedor.js");
const crearDatos = require("./utils/crearDatos");
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

//Normalizr
const authorSchema = new normalizr.schema.Entity('author');
const messagesSchema = new normalizr.schema.Entity('messages', { author: authorSchema });
const chatSchema = new normalizr.schema.Entity('chat', { 
  messages: [messagesSchema]
})

const server = httpServer.listen(8080, () => {
  console.log(
    `Servidor listo y escuchando en el puerto ${server.address().port}`
  );
});

app.get("/", (req, res) => {
  res.render("layouts/index", {});
});

app.get("/productos", (req, res) => {
  res.render('partials/productRow', {})
});

app.get("/mensajes", (req, res) => {
  res.render('partials/messageRow', {})
});

app.get("/api/productos-test", (req, res) => {
  const productos = crearDatos();
  res.type('json').send(JSON.stringify(productos, null, 4));
})

io.on("connection", async (socket) => {
  const productos = await contenedorProductos.getAll();
  const arrayMensajes = await contenedorMensajes.getAll();
  const mensajes = normalizr.normalize({ messages: arrayMensajes, id: 'chat' }, chatSchema);
  
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  socket.on("productoPost", async (producto) => {
    const productos = await contenedorProductos.save(producto);
    io.sockets.emit('productos', productos);
  });

  socket.on("mensajePost", async (mensaje) => {
    const arrayMensajes = await contenedorMensajes.save({...mensaje, date: new Date(Date.now()).toLocaleString()});
    const mensajes = normalizr.normalize({ messages: arrayMensajes, id: 'chat' }, chatSchema);

    io.sockets.emit('mensajes', mensajes);
  })
});

app.on("error", (err) => console.log(err));
