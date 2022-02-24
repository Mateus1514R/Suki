module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async execute (player) {
		const channel = this.client.channels.cache.get(player.textChannelId);

		if (player.lastPlayingMsgID) {
			const msg = channel.messages.cache.get(player.lastPlayingMsgID);

			if (msg) msg.delete();
		}

	}
};
