const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

const server = app.listen(8080, ()=>{
    console.log(`Servidor listo y escuchando en el puerto ${server.address().port}`)
})

app.on('error', (err) => console.error(err));