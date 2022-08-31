const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
const { productModel } = require("../../models/productModel");

module.exports = class ProductosDaosMongoDB extends ContenedorMongoDB {
  constructor() {
    super("mongodb+srv://ozkavosh:v7dIAZIKkLVVr5mo@cluster0.y6plr.mongodb.net", "ecommerce", productModel);
  }
};
