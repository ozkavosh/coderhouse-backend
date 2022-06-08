const { Router } = require('express');
const routerCarrito = Router();
const Contenedor = require('./Contenedor.js');
const contenedorCarrito = new Contenedor('carrito.json');
const middlewares = require("./middlewares.js");

module.exports = 
routerCarrito.post('/', async (req, res) => {
    const timestamp = new Date(Date.now()).toLocaleString();
    const carritos = await contenedorCarrito.save({timestamp, products: []});
    const id = carritos[carritos.length - 1].id;
    res.json({id});
})

routerCarrito.delete('/:id', async (req, res) => {
    try{
        res.json(await contenedorCarrito.deleteById(req.params.id));
    }catch{
        res.status(404).json({ error: "Cart not found!" });
    }
})

routerCarrito.get('/:id/productos', async (req, res) => {
    try{
        const carrito = await contenedorCarrito.getById(req.params.id);
        res.json(carrito.products);
    }catch{
        res.status(404).json({ error: "Cart not found!" });
    }
})

routerCarrito.post('/:id/productos', middlewares.validarProducto(), middlewares.validarId(), async (req, res) => {
    try{
        const {products, id, timestamp} = await contenedorCarrito.getById(req.params.id);
        const productTimestamp = new Date(Date.now()).toLocaleString();
        products.push({...req.body, timestamp: productTimestamp});
        res.json(await contenedorCarrito.update({products, timestamp}, id));
    }catch{
        res.status(404).json({ error: "Cart not found!" });
    }
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    try{
        const { products, timestamp, id } = await contenedorCarrito.getById(req.params.id);
        const productsAux = products.filter(({id}) => id !== Number(req.params.id_prod));
        productsAux.length === products.length
            ? res.status(404).json({ error: "Product not found in cart!"})
            : res.json(await contenedorCarrito.update({products: productsAux, timestamp}, id));
    }catch{
        res.status(404).json({ error: "Cart not found!" });
    }
})