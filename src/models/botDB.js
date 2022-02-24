const { Schema, model } = require('mongoose');

let botDB = new Schema({
  botID: {
    required: true,
    type: String,
  },
  blacklist: {
    type: Array,
  },
});

let Bot = model('Bot', botDB);
module.exports = Bot;
