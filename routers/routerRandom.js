const { Router } = require("express");
const routerRandom = Router();
const { fork } = require("child_process");

module.exports = 
    routerRandom.get('/api/random', (req, res) => {
        const child = fork('./utils/calcular.js');
        child.send({ cant: req.query.cant || 100000000 });

        child.on('message', (message) => res.type('json').send(JSON.stringify(message,null,2)));
    });