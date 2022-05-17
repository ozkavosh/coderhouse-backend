const express = require("express");

const app = express();

const PORT = 8080;

let count = 0;

app.get("/", (req, res) => {
    res.send("<h1 style='color:blue'>Bienvenidos al servidor Express</h1>")
})

app.get("/visitas", (req, res) => {
    count++;
    res.send(`Cantidad de visitas: ${count}`)
})

app.get("/fyh", (req, res) => {
    res.json(`${new Date().toLocaleString()}`)
})

const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en ${server.address().port}`)
})

server.on("error", (err) => console.log(error))
