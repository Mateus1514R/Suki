const { Schema, model } = require('mongoose');

let userDB = new Schema({
	_id: { type: String, required: true },
	coins: { type: Number, default: 0 },
	daily: { type: Number, default: 0 },
});

let User = model('User', userDB);
module.exports = User;
