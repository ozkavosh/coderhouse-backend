const socket = io();

socket.on("productos", async (productos) => {
  const contenedor = document.querySelector("#contenedorProductos");
  const fetchRow = await fetch('productos');
  const rowTemplate = await fetchRow.text();

  contenedor.innerHTML = productos
    .map(
      ({ title, price, thumbnail }) => eval(rowTemplate)
    )
    .join("");
});

socket.on("mensajes", async (mensajes) => {
  const contenedor = document.querySelector("#contenedorMensajes");
  const fetchRow = await fetch('mensajes');
  const rowTemplate = await fetchRow.text();

  contenedor.innerHTML = mensajes
    .map(
      ({ email, message, userId, date }) => {
        const clases = userId == socket.id ? `"col-4 align-self-end"` : `"col-4"`;
        return (eval(rowTemplate))
      }
    )
    .join("");
});

const cargarProducto = async (e) => {
  e.preventDefault();
  const title = document.querySelector("input[name=title]").value;
  const price = document.querySelector("input[name=price]").value;
  const thumbnail = document.querySelector("input[name=thumbnail]").value;

  socket.emit('productoPost', {title, price, thumbnail});
};

const enviarMensaje = async (e) => {
  e.preventDefault();
  const message = document.querySelector("#inputMensaje").value;
  const email = document.querySelector("#inputEmail").value;

  socket.emit('mensajePost', {message, email});
}
