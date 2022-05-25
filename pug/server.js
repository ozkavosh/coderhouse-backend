const router = require('./router.js');
const express = require('express');
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('../public'));
app.use('/api', router);
app.set('views', '../views');
app.set('view engine', 'pug');

const server = app.listen(PORT, ()=>{
    console.log(`Servidor listo y escuchando en el puerto ${server.address().port}`);
});

app.on('error', err => console.log(err));