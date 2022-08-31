const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
const { cartModel } = require("../../models/cartModel");

module.exports = class CarritosDaosMongoDB extends ContenedorMongoDB {
  constructor() {
    super("mongodb+srv://ozkavosh:v7dIAZIKkLVVr5mo@cluster0.y6plr.mongodb.net", "ecommerce", cartModel);
  }
}
