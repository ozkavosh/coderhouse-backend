exports.validarProducto = () =>{
  return (req, res, next) => {
    const producto = req.body;
    if (
      !producto.name ||
      !producto.description ||
      !producto.code ||
      !producto.photoUrl ||
      !producto.price ||
      !producto.stock
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    next();
  };
};
 
exports.validarId = () => {
  return (req, res, next) => {
    const producto = req.body;
    if (!producto.id) {
      return res.status(400).json({ error: "Product must have an id" });
    }
    next();
  };
};
