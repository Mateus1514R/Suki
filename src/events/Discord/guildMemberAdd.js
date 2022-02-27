const { ButtonComponent, ActionRow, ButtonStyle, Guild } = require('discord.js');

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async execute (member = Guild) {
		let lang = await this.client.guildDB.findOne({ guildID: member.guild.id }) || 0;

		switch(lang.lang) {
		  case 1:
		  lang = this.client.langs.pt;
		  break;
		  case 0:
		  lang = this.client.langs.en;
		  break;
		}


		const server = await this.client.guildDB.findOne({ guildID: member.guild.id });
		if (server.welcome.status == true) {
			const channel = this.client.channels.cache.get(server.welcome.channel);

			const row = new ActionRow().addComponents(
				new ButtonComponent()
					.setCustomId('configured')
					.setLabel(String(`${lang.events.guildmemberadd.button}`.replace('{}', member.guild.name)))
					.setStyle(ButtonStyle.Secondary)
					.setEmoji({
						name: 'Lock',
						id: '945774705904857128',
						animated: false
					})
					.setDisabled(true)
			);

			const msg = await channel.send({
				content: server.welcome.message
					.replace('[user]', `<@${member.id}>`)
					.replace('[name]', `${member.user.username}`)
					.replace('[total]', member.guild.memberCount)
					.replace('[guild]', member.guild.name),
				components: [row],
			});

			setInterval(() => {
				msg.delete();
			}, 60000);
		}
	}
};
