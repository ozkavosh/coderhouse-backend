const router = require('./router.js');
const express = require('express');
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use('/api', router);

const server = app.listen(PORT, ()=>{
    console.log(`Servidor listo y escuchando en el puerto ${server.address().port}`);
});

app.on('error', err => console.log(err));