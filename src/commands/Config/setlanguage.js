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
		this.cooldown = 5;
	}

	async execute ({ message, lang }) {
		if (!message.member.permissions.has('MANAGE_GUILD') && !this.client.developers.some(x => x === message.author.id)) {
			return message.reply(`${e.Error} | ${message.author}, ${lang.commands.lang.noPerm}`);
		}

		const user = this.client.users.cache.get('847865068657836033');
		const user1 = this.client.users.fetch('417153124147396615');

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

		const filter = i => ['us', 'brazil'].includes(i.customId);

		let embed = new this.client.embed(message.author);
		embed.setTitle(`${lang.commands.lang.embed.title}`);
		embed.setDescription(`${lang.commands.lang.embed.desc}`);
		embed.addField('🇺🇸 English (United States)', String(`${lang.commands.lang.embed.translated} \`${user.username}\``), true);
		embed.addField('🇧🇷 Português (Brasil)', String(`${lang.commands.lang.embed.translated} \`${user.username}\`, \`${user1.username}\``), true);
		embed.addField(`${lang.commands.lang.embed.help}`, `https://crowdin.com/project/suki`, false);

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
		row.addComponents([brazil, us]);


		let disabledRow = new MessageActionRow();
		disabledRow.addComponents([brazil, us]);

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