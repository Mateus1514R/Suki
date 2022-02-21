const { Schema, model } = require("mongoose");

let userDB = new Schema({
  _id: { type: String, required: true },
});

let User = model("User", userDB);
module.exports = User;