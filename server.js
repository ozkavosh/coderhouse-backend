const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HTTPServer } = require("http");
const session = require("express-session");
const passport = require("./passport");
const MongoStore = require("connect-mongo");
const normalizr = require("normalizr");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const Contenedor = require("./Contenedor.js");
const { chatSchema } = require("./utils/normalizrSchemas");
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
const routerCuenta = require("./routers/routerCuenta");
const routerProductos = require("./routers/routerProductos");
const routerMensajes = require("./routers/routerMensajes");
dotenv.config();

mongoose.connect(
  `mongodb+srv://ozkavosh:${process.env.MONGO_PASS}@cluster0.y6plr.mongodb.net/users?retryWrites=true&w=majority`
);

const contenedorMensajes = new Contenedor("mensajes.json");
const contenedorProductos = new Contenedor("productos.json");

//Middlewares
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://ozkavosh:${process.env.MONGO_PASS}@cluster0.y6plr.mongodb.net/desafio-sessions?retryWrites=true&w=majority`,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "qwerty",
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 600 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//EJS
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

//Endpoints
app.use(routerCuenta);
app.use(routerProductos);
app.use(routerMensajes);
app.on("error", (err) => console.log(err));

//Websockets
io.on("connection", async (socket) => {
  const productos = await contenedorProductos.getAll();
  const arrayMensajes = await contenedorMensajes.getAll();
  const mensajes = normalizr.normalize(
    { messages: arrayMensajes, id: "chat" },
    chatSchema
  );

  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  socket.on("productoPost", async (producto) => {
    const productos = await contenedorProductos.save(producto);
    io.sockets.emit("productos", productos);
  });

  socket.on("mensajePost", async (mensaje) => {
    const arrayMensajes = await contenedorMensajes.save({
      ...mensaje,
      date: new Date(Date.now()).toLocaleString(),
    });
    const mensajes = normalizr.normalize(
      { messages: arrayMensajes, id: "chat" },
      chatSchema
    );

    io.sockets.emit("mensajes", mensajes);
  });
});

const server = httpServer.listen(8080, () => {
  console.log(
    `Servidor listo y escuchando en el puerto ${server.address().port}`
  );
});