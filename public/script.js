const socket = io();

//Normalizr
const authorSchema = new normalizr.schema.Entity("author");
const messagesSchema = new normalizr.schema.Entity("messages", {
  author: authorSchema,
});
const chatSchema = new normalizr.schema.Entity("chat", {
  messages: [messagesSchema],
});

socket.on("productos", async (productos) => {
  const contenedor = document.querySelector("#contenedorProductos");
  const fetchRow = await fetch("productos");
  const rowTemplate = await fetchRow.text();

  contenedor.innerHTML = productos
    .map(({ title, price, thumbnail }) => eval(rowTemplate))
    .join("");
});

socket.on("mensajes", async (mensajes) => {
  const contenedor = document.querySelector("#contenedorMensajes");
  const fetchRow = await fetch("mensajes");
  const rowTemplate = await fetchRow.text();
  const mensajesDenormalizados = normalizr.denormalize(
    mensajes.result,
    chatSchema,
    mensajes.entities
  );

  const pesoNormalizado = JSON.stringify(mensajes).length;
  console.log(mensajes, pesoNormalizado);

  const pesoDenormalizado = JSON.stringify(mensajesDenormalizados).length;
  console.log(mensajesDenormalizados, pesoDenormalizado);

  const porcentajeComprimido =
    100 - Math.round((pesoNormalizado * 100) / pesoDenormalizado);

  console.log(`Porcentaje Comprimido: ${porcentajeComprimido}%`);

  document.querySelector(
    ".tituloChat"
  ).innerText = `Chat (Comprimido ${porcentajeComprimido}%)`;

  contenedor.innerHTML = mensajesDenormalizados.messages
    .map((mensaje) => {
      return eval(rowTemplate);
    })
    .join("");
});

const loguear = async (e) => {
  e.preventDefault();
  const nombre = e.target.nombre.value;

  const respuestaRef = await fetch("login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({nombre}),
  });
  
  location.reload();
};

const desloguear = async (e) => {
  const respuestaRef = await fetch("logout");
  const tituloBienvenida = document.querySelector('.tituloBienvenida');
  const contenedorFormProductos = document.querySelector('.contenedorFormProductos');
  const contenedorChat = document.querySelector('.contenedorChat');
  const btnDesloguear = document.querySelector('.btnDesloguear');
  const tablaProductos = document.querySelector('#tablaProductos');
  tituloBienvenida.innerText = tituloBienvenida.innerText.replace("Bienvenido",'Hasta pronto');
  contenedorFormProductos.remove();
  contenedorChat.remove();
  tablaProductos.remove();
  btnDesloguear.remove();

  setTimeout(() => { location.reload() }, 2000)
}

const cargarProducto = async (e) => {
  e.preventDefault();
  const title = document.querySelector("input[name=title]").value;
  const price = document.querySelector("input[name=price]").value;
  const thumbnail = document.querySelector("input[name=thumbnail]").value;

  socket.emit("productoPost", { title, price, thumbnail });
};

const enviarMensaje = async (e) => {
  e.preventDefault();
  const text = document.querySelector("#inputMensaje").value;
  const id = document.querySelector("#inputEmail").value;
  const nombre = document.querySelector("#inputNombre").value;
  const apellido = document.querySelector("#inputApellido").value;
  const edad = document.querySelector("#inputEdad").value;
  const alias = document.querySelector("#inputAlias").value;
  const avatar = document.querySelector("#inputAvatar").value;

  socket.emit("mensajePost", {
    author: { id, nombre, apellido, edad, alias, avatar },
    text,
  });
};
