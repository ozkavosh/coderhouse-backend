const router = require('./router.js');
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('../public'));
app.use('/api', router);
app.engine('hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: `../views/layouts`,
        partialsDir: `../views/partials`
    })
 );
app.set('views', '../views');
app.set('view engine', 'hbs');

const server = app.listen(PORT, ()=>{
    console.log(`Servidor listo y escuchando en el puerto ${server.address().port}`);
});

app.on('error', err => console.log(err));