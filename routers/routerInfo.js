const { Router } = require("express");
const routerInfo = Router();

module.exports = routerInfo.get("/info", (req, res) => {
  res
    .type("json")
    .send(
      JSON.stringify(
        {
          argumentos: process.argv.slice(2),
          plataforma: process.platform,
          node: process.version,
          rss: process.memoryUsage(),
          path: process.argv[1],
          pid: process.pid,
          carpeta: process.cwd()
        },
        null,
        2
      )
    );
});
