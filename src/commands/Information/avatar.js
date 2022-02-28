const Command = require('../../structures/Command');
const { ActionRow, Embed, Util, ButtonStyle } = require('discord.js');
const { ButtonComponent } = require('@discordjs/builders');

module.exports = class Avatar extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'avatar';
		this.category = 'Information';
		this.description = 'Veja e baixe o avatar de um usuário';
		this.aliases = ['foto'];
	}

	async execute ({ message, args, lang }) {

		let user = await this.client.getUser(args[0], message);
		if(!user) user = message.author;

		const avatar = user.displayAvatarURL({ dynamic: true, size: 2048 });

		const embed = new Embed()
			.setAuthor({ name: user.username, iconURL: user.avatarURL({ dynamic: true }) })
			.setDescription(`${lang.commands.avatar.embed}`)
			.setImage(avatar)
			.setTimestamp()
			.setColor(Util.resolveColor('Purple'))
			.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

		const row = new ActionRow()
			.addComponents(
				new ButtonComponent()
					.setURL(`${avatar}`)
					.setLabel('Download')
					.setStyle(ButtonStyle.Link)
			);

		message.reply({ embeds: [embed], components: [row] });
	}
};
