const { Router } = require("express");
const routerProductos = Router();
const Contenedor = require("./Contenedor.js");
const contenedorProductos = new Contenedor("productos.json");

module.exports = routerProductos.get("/", async (req, res) => {
  const productos = await contenedorProductos.getAll();
  res.json(productos);
});

routerProductos.get("/:id", async (req, res) => {
  try{
    const producto = await contenedorProductos.getById(req.params.id);
    res.send(producto);
  }catch{
      res.status(404).send({error: "Product not found!"});
  }
});

routerProductos.post("/", async (req, res) => {
  const { admin } = req.body;
  const { name, price, description, photoUrl, stock } = req.body;
  const timestamp = new Date(Date.now()).toLocaleString();
  admin
    ? res.json(
        await contenedorProductos.save({
          name,
          price,
          description,
          photoUrl,
          stock,
          timestamp,
        })
      )
    : res.status(401).json({
        error: "Unauthorized - You dont have permission to post products",
      });
});

routerProductos.put("/:id", async (req, res) => {
  const { admin } = req.body;
  const { name, price, description, photoUrl, stock } = req.body;
  const timestamp = new Date(Date.now()).toLocaleString();
  try{
    admin
    ? res.json(
        await contenedorProductos.update(
          { name, price, description, photoUrl, stock, timestamp },
          req.params.id
        )
      )
    : res.status(401).json({
        error: "Unauthorized - You dont have permission to update products",
      });
  }catch{
      res.status(404).json({ error: "Product not found!" });
  }
  
});

routerProductos.delete("/:id", async (req, res) => {
  const { admin } = req.body;
  try{
    admin
    ? res.json(await contenedorProductos.deleteById(req.params.id))
    : res.status(401).json({
        error: "Unauthorized - You dont have permission to delete products",
      });
  }catch{
      res.status(404).json({ error: "Product not found!" });
  }
});
