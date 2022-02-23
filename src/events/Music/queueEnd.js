const e = require('../../utils/Emojis');

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (player) {
		const channel = this.client.channels.cache.get(player.textChannelId);

		player.destroy();
		await channel.send(`${e.Music} A fila de música acabou, portanto eu sai do canal de voz.`);
	}
};