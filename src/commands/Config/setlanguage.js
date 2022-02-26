/* eslint-disable no-return-await */
const Command = require('../../structures/Command');
const { MessageActionRow, MessageButton } = require('discord.js');
const e = require('../../utils/Emojis');

module.exports = class Language extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'language';
		this.category = 'Config';
		this.aliases = ['setlang', 'setlanguage', 'lang'];
	}

	async execute ({ message, lang }) {
		if (!message.member.permissions.has('MANAGE_GUILD') && !this.client.developers.some(x => x === message.author.id)) {
			return message.reply(`${e.Error} | ${message.author}, ${lang.commands.lang.noPerm}`);
		}

		let brazil = new MessageButton();
		brazil.setCustomId('brazil');
		brazil.setLabel('Português');
		brazil.setStyle('PRIMARY');
		brazil.setEmoji('🇧🇷');

		let us = new MessageButton();
		us.setCustomId('us');
		us.setLabel('English');
		us.setStyle('PRIMARY');
		us.setEmoji('🇺🇸');

		let x = new MessageButton();
		x.setCustomId('x');
		x.setLabel(String(`${lang.commands.lang.cancel}`));
		x.setStyle('PRIMARY');
		x.setEmoji('❌');

		const filter = i => ['x', 'us', 'brazil'].includes(i.customId);

		let embed = new this.client.embed(message.author);
		embed.setDescription(`${lang.commands.lang.embed.desc}`);
		embed.setAuthor({ name: `${lang.commands.lang.embed.select}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 4096 }) });

		const collector = message.channel.createMessageComponentCollector({ filter, time: 120000, idle: 120000 });

		const guildDBData = await this.client.guildDB.findOne({
			guildID: message.guild.id,
		});

		switch (guildDBData.lang) {
			case 0:
				us.setDisabled(true);
				us.setStyle('DANGER');
				break;

			case 1:
				brazil.setDisabled(true);
				brazil.setStyle('DANGER');
				break;
		}

		let row = new MessageActionRow();
		row.addComponents([brazil, us, x]);


		let disabledRow = new MessageActionRow();
		disabledRow.addComponents([brazil, us, x]);

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
							color: '#7A0BC0',
							timestamp: Date.now()
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
							color: '#7A0BC0',
							timestamp: Date.now()
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
							color: '#7A0BC0',
							timestamp: Date.now()
						}],
						components: [disabledRow]
					});
					collector.stop();
					break;
			}
		});
	}
};