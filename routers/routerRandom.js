const { Router } = require("express");
const {routeLogger} = require("../middlewares/logger");
const calcular = require("../utils/calcular");
const routerRandom = Router();

module.exports = 
    routerRandom.get('/api/random', routeLogger, (req, res) => {
        const result = calcular(req.query.cant || 10000);
        res.type('json').send(JSON.stringify(result,null,2));
    });