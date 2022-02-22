const { Schema, model } = require("mongoose");

let guildDB = new Schema({
  guildID: { type: String },
  prefix: { type: String, default: "s!" },
  welcome: {
    channel: { type: String, default: "null"},
    message: { type: String, default: "null"},
    status: { type: Boolean, default: false }
  }
});

let Guild = model("Guild", guildDB);
module.exports = Guild;