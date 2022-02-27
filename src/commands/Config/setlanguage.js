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
		this.cooldown = 5;
	}

	async execute ({ message, lang }) {
		if (!message.member.permissions.has('ManageGuild') && !this.client.developers.some(x => x === message.author.id)) {
			return message.reply(
				`${e.Error} | ${message.author}, ${lang.commands.lang.noPerm}`
			);
		}

<<<<<<< HEAD
		const user = this.client.users.cache.get('847865068657836033');
		const user1 = this.client.users.fetch('417153124147396615');

		let brazil = new MessageButton();
=======
		let brazil = new ButtonComponent();
>>>>>>> f5cb204 (v14 80% complete)
		brazil.setCustomId('brazil');
		brazil.setLabel('Português');
		brazil.setStyle(ButtonStyle.Primary);
		brazil.setEmoji({ name: '🇧🇷' });

		let us = new ButtonComponent();
		us.setCustomId('us');
		us.setLabel('English');
		us.setStyle(ButtonStyle.Primary);
		us.setEmoji({ name: '🇺🇸' });

<<<<<<< HEAD
		const filter = i => ['us', 'brazil'].includes(i.customId);

		let embed = new this.client.embed(message.author);
		embed.setTitle(`${lang.commands.lang.embed.title}`);
		embed.setDescription(`${lang.commands.lang.embed.desc}`);
		embed.addField('🇺🇸 English (United States)', String(`${lang.commands.lang.embed.translated} \`${user.username}\``), true);
		embed.addField('🇧🇷 Português (Brasil)', String(`${lang.commands.lang.embed.translated} \`${user.username}\`, \`${user1.username}\``), true);
		embed.addField(`${lang.commands.lang.embed.help}`, `https://crowdin.com/project/suki`, false);
=======
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
>>>>>>> f5cb204 (v14 80% complete)

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

<<<<<<< HEAD
		let row = new MessageActionRow();
		row.addComponents([brazil, us]);


		let disabledRow = new MessageActionRow();
		disabledRow.addComponents([brazil, us]);
=======
		let row = new ActionRow().setComponents(brazil, us, x);


		let disabledRow = new ActionRow().setComponents(brazil, us, x);
>>>>>>> f5cb204 (v14 80% complete)

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
<<<<<<< HEAD
					await msg.delete();
					message.reply({ content: '🇧🇷 Agora eu falarei em Português neste servidor.' });
=======
					await msg.edit({
						embeds: [{
							description: '🇧🇷 Agora eu falarei em Português neste servidor.',
							color: Util.resolveColor('Purple')
						}],
						components: [disabledRow]
					});
>>>>>>> f5cb204 (v14 80% complete)
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
<<<<<<< HEAD
					await msg.delete();
					message.reply({ content: `🇺🇸 Now I will speak English on this server.` });
=======
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
>>>>>>> f5cb204 (v14 80% complete)
					collector.stop();
					break;
			}
		});
	}
};