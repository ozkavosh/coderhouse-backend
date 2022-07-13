const express = require("express");
const normalizr = require("normalizr");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { Server: IOServer } = require("socket.io");
const { Server: HTTPServer } = require("http");
const Contenedor = require("./Contenedor.js");
const crearDatos = require("./utils/crearDatos");
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
const dotenv = require("dotenv");
dotenv.config();

const contenedorMensajes = new Contenedor("mensajes.json");
const contenedorProductos = new Contenedor("productos.json");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://ozkavosh:${process.env.MONGO_PASS}@cluster0.y6plr.mongodb.net/desafio-sessions?retryWrites=true&w=majority`,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }),
  secret: "qwerty",
  rolling: true,
  resave: true,
  saveUninitialized: false,
  cookie: { 
    maxAge: 600 * 1000
  }
}))

//EJS
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

//Normalizr
const authorSchema = new normalizr.schema.Entity('author');
const messagesSchema = new normalizr.schema.Entity('messages', { author: authorSchema });
const chatSchema = new normalizr.schema.Entity('chat', { 
  messages: [messagesSchema]
})

//Endpoints
app.get("/", (req, res) => {
  const nombre = req.session.nombre;
  res.render("layouts/index", { nombre });
});

app.post("/login", (req, res) => {
  const { nombre } = req.body;
  req.session.nombre = nombre;
  res.json({ success: true });
})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      console.log(err.message);
    }

    res.status(204).end();
  });
})

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
app.on("error", (err) => console.log(err));

//Websockets
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
    const mensajes = await contenedorMensajes.save({...mensaje, date: new Date(Date.now()).toLocaleString()});
    io.sockets.emit('mensajes', mensajes);
  })
});

const server = httpServer.listen(8080, () => {
  console.log(
    `Servidor listo y escuchando en el puerto ${server.address().port}`
  );
});

