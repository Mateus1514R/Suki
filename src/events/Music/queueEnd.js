const e = require('../../utils/Emojis');

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async execute (player) {
		const channel = this.client.channels.cache.get(player.textChannelId);

		let lang = await this.client.guildDB.findOne({ guildId: channel.guild.id }) || 0;

		switch(lang) {
		  case 1:
		  lang = this.client.langs.pt;
		  break;
		  case 0:
		  lang = this.client.langs.en;
		  break;
		}

		player.destroy();
		await channel.send(`${e.Music} **${lang.events.musicEvents.queueEnd}**`);
	}
};