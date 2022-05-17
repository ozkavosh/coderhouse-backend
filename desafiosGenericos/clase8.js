const express = require('express');
const { Router } = express;
const app = express();

const PORT = 8080;

let mascotas = [
    {nombre: 'nombre1', raza: 'raza1' ,edad: 4},
    {nombre: 'nombre2', raza: 'raza2' ,edad: 4},
    {nombre: 'nombre3', raza: 'raza3' ,edad: 4},
    {nombre: 'nombre4', raza: 'raza4' ,edad: 4}
];

let personas = [
    {nombre: 'nombre1', apellido: 'apellido1' ,edad: 21},
    {nombre: 'nombre2', apellido: 'apellido2' ,edad: 21},
    {nombre: 'nombre3', apellido: 'apellido3' ,edad: 21},
    {nombre: 'nombre4', apellido: 'apellido4' ,edad: 21}
];

const routerPersonas = Router();

routerPersonas.get('', (req, res)=>{
    res.json(personas);
})

routerPersonas.post('', (req, res)=>{
    personas.push(req.body);
    res.status(201).json(personas);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/personas', routerPersonas);
app.use(express.static(__dirname + '/public'))

const server = app.listen(PORT, ()=>{
    console.log(`Servidor listo y escuchando en el puerto ${server.address().port}`)
});

app.on('error', err=>console.error(err));