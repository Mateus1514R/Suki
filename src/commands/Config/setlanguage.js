/* eslint-disable no-return-await */
const Command = require('../../structures/Command');
const { ActionRow, ButtonStyle, Embed, Util, ButtonComponent } = require('discord.js');

module.exports = class Language extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'language';
		this.category = 'Config';
		this.aliases = ['setlang', 'setlanguage', 'lang'];
		this.cooldown = 5;

		this.userPermissions = ['ManageGuild'];
	}

	async execute ({ message, lang }) {

		const user = await this.client.users.fetch('847865068657836033');
		const user1 = await this.client.users.fetch('417153124147396615');

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

		const filter = i => ['us', 'brazil'].includes(i.customId);

		let embed = new Embed();
		embed.setTitle(`${lang.commands.lang.embed.title}`);
		embed.setDescription(`${lang.commands.lang.embed.desc}`);
		embed.addField({ name: '🇺🇸 English (United States)', value: String(`${lang.commands.lang.embed.translated} \`${user.username}\``), inline: true });
		embed.addField({ name: '🇧🇷 Português (Brasil)', value: String(`${lang.commands.lang.embed.translated} \`${user.username}\`, \`${user1.username}\``), inline: true });
		embed.addField({ name: `${lang.commands.lang.embed.help}`, value: `https://crowdin.com/project/suki`, inline: false });
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


		let row = new ActionRow().setComponents(brazil, us);

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
					await msg.delete();
					message.reply({ content: '🇧🇷 Agora eu falarei em Português neste servidor.' });

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
					await msg.delete();
					message.reply({ content: `🇺🇸 Now I will speak English on this server.` });

					collector.stop();
					break;
			}
		});
	}
};