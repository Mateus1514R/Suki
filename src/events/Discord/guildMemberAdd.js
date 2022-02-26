const { MessageActionRow, MessageButton } = require('discord.js');
const e = require('../../utils/Emojis');

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async execute (member) {
		let guild = member.guild;

		const server = await this.client.guildDB.findOne({ guildID: guild.id });
		if (server.welcome.status == true) {
			const channel = this.client.channels.cache.get(server.welcome.channel);

			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('configured')
					.setLabel(`Message configured by ${guild.name} team`)
					.setStyle('SECONDARY')
					.setEmoji(e.Lock)
					.setDisabled(true)
			);

			const msg = await channel.send({
				content: server.welcome.message
					.replace('[user]', `<@${member.id}>`)
					.replace('[name]', `${member.user.username}`)
					.replace('[total]', guild.memberCount)
					.replace('[guild]', guild.name),
				components: [row],
			});

			setInterval(() => {
				msg.delete();
			}, 60000);
		}
	}
};
