const express = require('express');
const app = express();

const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Servidor listo y escuchando en el puerto ${server.address().port}`);
});

app.get('/api/sumar/:num1/:num2', (req, res) => {
    let suma = Number(req.params.num1) + Number(req.params.num2);
    return res.json({suma});
})

app.get('/api/sumar', (req, res) => {
    let suma = Number(req.query.num1) + Number(req.query.num2);
    return res.json({suma});
})

app.get('/api/operacion/:operandos', (req, res) => {
    let numeros = req.params.operandos.split('+');
    let suma = Number(numeros[0]) + Number(numeros[1]);
    return res.json({suma});
})

app.post('/api', (req, res) =>{
    res.send('ok post');
})

app.put('/api', (req, res) =>{
    res.send('ok put');
})

app.delete('/api', (req, res) =>{
    res.send('ok delete');
})

server.on('error',()=>console.log(err));