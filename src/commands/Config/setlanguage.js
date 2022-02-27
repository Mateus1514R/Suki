/* eslint-disable no-return-await */
const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');
const { ActionRow, ButtonStyle, Embed, Util, ButtonComponent } = require('discord.js');

module.exports = class Language extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'language';
		this.category = 'Config';
		this.aliases = ['setlang', 'setlanguage', 'lang'];
	}

	async execute ({ message, lang }) {
		if (!message.member.permissions.has('ManageGuild') && !this.client.developers.some(x => x === message.author.id)) {
			return message.reply(
				`${e.Error} | ${message.author}, ${lang.commands.lang.noPerm}`
			);
		}

		let brazil = new ButtonComponent();
		brazil.setCustomId('brazil');
		brazil.setLabel('Português');
		brazil.setStyle(ButtonStyle.Primary);
		brazil.setEmoji({ name: '🇧🇷' });

		let us = new ButtonComponent();
		us.setCustomId('us');
		us.setLabel('English');
		us.setStyle(ButtonStyle.Primary);
		us.setEmoji({ name: '🇺🇸' });

		let x = new ButtonComponent();
		x.setCustomId('x');
		x.setLabel(String(`${lang.commands.lang.cancel}`));
		x.setStyle(ButtonStyle.Primary);
		x.setEmoji({ name: '❌' });

		const filter = i => ['x', 'us', 'brazil'].includes(i.customId);

		let embed = new Embed();
		embed.setDescription(String(`${lang.commands.lang.embed.desc}`));
		embed.setAuthor({ name: `${lang.commands.lang.embed.select}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 4096 }) });
		embed.setTimestamp();
		embed.setColor(Util.resolveColor('Purple'));
		embed.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

		const collector = message.channel.createMessageComponentCollector({ filter, time: 120000, idle: 120000 });

		const guildDBData = await this.client.guildDB.findOne({
			guildID: message.guild.id,
		});

		switch (guildDBData.lang) {
			case 0:
				us.setDisabled(true);
				us.setStyle(ButtonStyle.Danger);
				break;

			case 1:
				brazil.setDisabled(true);
				brazil.setStyle(ButtonStyle.Danger);
				break;
		}

		let row = new ActionRow().setComponents(brazil, us, x);


		let disabledRow = new ActionRow().setComponents(brazil, us, x);

		let msg = await message.reply({ embeds: [embed], components: [row] });

		collector.on('collect', async (button) => {

			if (collector.users.first().id !== message.author.id) {
				return await button.reply({ content: `${lang.commands.lang.authorOnly}`, ephemeral: true });
			}

			switch(button.customId) {
				case 'brazil':
					await button.deferUpdate().catch();
					await this.client.guildDB.findOneAndUpdate({
						guildID: message.guild.id
					}, {
						$set: {
							lang: 1
						}
					});
					await msg.edit({
						embeds: [{
							description: '🇧🇷 Agora eu falarei em Português neste servidor.',
							color: Util.resolveColor('Purple')
						}],
						components: [disabledRow]
					});
					collector.stop();
					break;

				case 'us':
					await button.deferUpdate().catch();
					await this.client.guildDB.findOneAndUpdate({
						guildID: message.guild.id
					}, {
						$set: {
							lang: 0
						}
					});
					await msg.edit({
						embeds: [{
							description: `🇺🇸 Now I will speak English on this server.`,
							color: Util.resolveColor('Purple')
						}],
						components: [disabledRow]
					});

					collector.stop();
					break;

				case 'x':
					await button.deferUpdate().catch();
					await msg.edit({
						embeds: [{
							description: `${lang.commands.lang.closed}`,
							color: Util.resolveColor('Purple')
						}],
						components: [disabledRow]
					});
					collector.stop();
					break;
			}
		});
	}
};