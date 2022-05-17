const express = require('express');
const Contenedor = require('./Contenedor');
const app = express();

const PORT = 8080;
const contenedor = new Contenedor('./productos.txt');

app.get('/productos', (req, res) => {
    contenedor.getAll()
        .then((objetos) => {
            res.send(objetos);
            console.log(`Se listaron todos los productos!`)
        })
        .catch((err) => console.error(`ERROR al listar los productos!\n${err}`))
})

app.get('/productoRandom', (req, res) => {
    contenedor.getRandom()
        .then((objeto) => {
            res.send(objeto);
            console.log(`Se mostro un producto random!`)
        })
        .catch((err) => console.error(`ERROR al mostrar un producto random!\n${err}`))
})

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/index.html')
});

const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', (err) => console.log(err));