const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: "string" },
  email: { type: "string" },
  password: { type: "string" },
});

module.exports = model("User", userSchema);
