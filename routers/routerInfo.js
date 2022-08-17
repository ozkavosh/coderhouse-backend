const { Router } = require("express");
const compression = require("compression");
const { routeLogger } = require("../middlewares/logger");
const routerInfo = Router();
const numCpus = require("os").cpus().length;

module.exports = routerInfo.get(
  "/info",
  routeLogger,
  compression(),
  (req, res) => {
    console.log({
      argumentos: process.argv.slice(2),
      plataforma: process.platform,
      node: process.version,
      rss: process.memoryUsage(),
      path: process.argv[1],
      pid: process.pid,
      carpeta: process.cwd(),
      numProcesadores: numCpus,
    });
    res.type("json").send(
      JSON.stringify(
        {
          argumentos: process.argv.slice(2),
          plataforma: process.platform,
          node: process.version,
          rss: process.memoryUsage(),
          path: process.argv[1],
          pid: process.pid,
          carpeta: process.cwd(),
          numProcesadores: numCpus,
        },
        null,
        2
      )
    );
  }
);
