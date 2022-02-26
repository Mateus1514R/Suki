const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = class Welcome extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'welcome';
		this.category = 'Config';
		this.description = 'Configure as logs de entrada do servidor.';
		this.aliases = ['setentrada'];
	}

	async execute ({ message, args, lang }) {
		if (!message.member.permissions.has('MANAGE_GUILD') && !this.client.developers.some(x => x === message.author.id)) {
			return message.reply(
				`${e.Error} | ${message.author}, ${lang.commands.welcome.noPerm}`
			);
		}

		const guildDBData = await this.client.guildDB.findOne({
			guildID: message.guild.id,
		});

		if (!args[0]) {
			const embed = new this.client.embed(message.author)
				.setAuthor({
					name: message.guild.name,
					iconURL: message.guild.iconURL({ dynamic: true }),
				})
				.setDescription(`${lang.commands.welcome.embedHelp.title}`)
				.addFields([
					{
						name: `${lang.commands.welcome.embedHelp.fields.system}`,
						value: `> ${e.On} | Status: **${
							guildDBData.welcome.status == false ? `${lang.commands.welcome.embedHelp.fields.off}` : `${lang.commands.welcome.embedHelp.fields.on}`
						}**\n> ${e.World} | Chat: **${
							guildDBData.welcome.channel == 'null'
								? `${lang.commands.welcome.embedHelp.fields.noChannel}`
								: `<#${guildDBData.welcome.channel}>`
						}**\n> ${e.Chat} | ${lang.commands.welcome.embedHelp.fields.message}: \`\`\` ${
							guildDBData.welcome.message == 'null'
								? `${lang.commands.welcome.embedHelp.fields.noMessage}`
								: guildDBData.welcome.message
						}\`\`\``,
					},
				]);

			let row = new MessageActionRow();

			const left = new MessageButton()
				.setCustomId('left')
				.setLabel('')
				.setEmoji(e.Left)
				.setStyle('SECONDARY')
				.setDisabled(true);

			const right = new MessageButton()
				.setCustomId('right')
				.setLabel('')
				.setEmoji(e.Right)
				.setStyle('SECONDARY');

			row.addComponents([left, right]);

			let msg = await message.reply({ embeds: [embed], components: [row] });

			const filter = (interaction) => {
				return interaction.isButton() && interaction.message.id === msg.id;
			};

			msg.createMessageComponentCollector({
				filter: filter,
				time: 60000,
			})

				.on('end', async (r, reason) => {
					if (reason != 'time') return;

					right.setDisabled(true);
					left.setDisabled(true);
				})

				.on('collect', async (r) => {
					if(r.user.id !== message.author.id) {
						return r.deferUpdate();
					}
					switch (r.customId) {
						case 'right': {
							const info = new this.client.embed(message.author)
								.setAuthor({
									name: message.guild.name,
									iconURL: message.guild.iconURL({ dynamic: true }),
								})
								.setDescription(`${lang.commands.welcome.embed2.title}`)
								.addFields([
									{
										name: 'Placeholders:',
										value: `> **[user]** - ${lang.commands.welcome.embed2.fields.user}\n> **[name]** - ${lang.commands.welcome.embed2.fields.name}\n> **[guild]** - ${lang.commands.welcome.embed2.fields.guild}\n> **[total]** - ${lang.commands.welcome.embed2.fields.total}.`,
									},
									{
										name: 'Comandos:',
										value: `> **welcome set <chat>** - ${lang.commands.help.embed2.fields.set}\n> **welcome msg <msg>** - ${lang.commands.help.embed2.fields.msg}\n> **welcome status** - ${lang.commands.help.embed2.fields.status}`,
									},
								]);

							right.setDisabled(true);
							left.setDisabled(false);
							await r.deferUpdate();
							await msg.edit({ embeds: [info], components: [row] });
							break;
						}
						case 'left': {
							const embed = new this.client.embed(message.author)
								.setAuthor({
									name: message.guild.name,
									iconURL: message.guild.iconURL({ dynamic: true }),
								})
								.setDescription('🚪 | Sistema de Logs de Entrada:')
								.addFields([
									{
										name: `${lang.commands.welcome.embedHelp.fields.system}`,
										value: `> ${e.On} | Status: **${
											guildDBData.welcome.status == false ? `${lang.commands.welcome.embedHelp.fields.off}` : `${lang.commands.welcome.embedHelp.fields.on}`
										}**\n> ${e.World} | Chat: **${
											guildDBData.welcome.channel == 'null'
												? `${lang.commands.welcome.embedHelp.fields.noChannel}`
												: `<#${guildDBData.welcome.channel}>`
										}**\n> ${e.Chat} | ${lang.commands.welcome.embedHelp.fields.message}: \`\`\` ${
											guildDBData.welcome.message == 'null'
												? `${lang.commands.welcome.embedHelp.fields.noMessage}`
												: guildDBData.welcome.message
										}\`\`\``,
									},
								]);

							right.setDisabled(false);
							left.setDisabled(true);
							await r.deferUpdate();
							await msg.edit({ embeds: [embed], components: [row] });
							break;
						}
					}
				});
			return;
		}

		if (['set', 'channel', 'chat', 'canal'].includes(args[0].toLowerCase())) {
			const channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[1]);

			if (!channel) {
				return message.reply(
					`${e.Error} | ${message.author}, ${lang.commands.welcome.subs.set.noChannel}`
				);
			}
			else if (channel.id == guildDBData.welcome.channel) {
				return message.reply(
					`${e.Error} | ${message.author}, ${lang.commands.welcome.subs.set.hasChannel}`
				);
			}
			else if (!channel.type === 'text') {
				return message.reply(
					`${e.Error} | ${message.author}, ${lang.commands.welcome.subs.set.noArgsChannel}`
				);
			}
			else {
				if (guildDBData) {
					guildDBData.welcome.channel = channel.id;
					await guildDBData.save();
				}
				else {
					await this.client.guildDB.create({
						'guildID': message.guild.id,
						'welcome.channel': channel,
					});
				}
				await message.reply(
					`${e.Correct} | ${message.author}, ${lang.commands.welcome.subs.set.success.replace('{}', channel)}.`
				);
			}
			return;
		}

		if (['message', 'msg'].includes(args[0].toLowerCase())) {
			let msg = args.slice(1).join(' ');

			if (!msg) {
				return message.reply(
					`${e.Error} | ${message.author}, ${lang.commands.welcome.subs.msg.noArgs}`
				);
			}
			else if (msg == guildDBData.welcome.message) {
				return message.reply(
					`${e.Error} | ${message.author}, ${lang.commands.welcome.subs.msg.hasMessage}`
				);
			}
			else if (msg.length > 200) {
				return message.reply(
					`${e.Error} | ${message.author}, ${lang.commands.welcome.subs.msg.length}`
				);
			}
			else {
				if (guildDBData) {
					guildDBData.welcome.message = msg;
					await guildDBData.save();
				}
				else {
					await this.client.guildDB.create({
						'guildID': message.guild.id,
						'welcome.message': msg,
					});
				}
				await message.reply(
					`${e.Correct} | ${message.author}, ${lang.commands.welcome.subs.msg.success.replace('{}', msg)}`
				);
			}
			return;
		}

		if (['stats', 'status', 'on', 'off'].includes(args[0].toLowerCase())) {
			if (guildDBData.welcome.status == false) {
				if (guildDBData.welcome.channel == 'null') {
					return message.reply(
						`${e.Error} | ${message.author}, ${lang.commands.welcome.status.noChannel}`
					);
				}
				else if (guildDBData.welcome.message == 'null') {
					return message.reply(
						`${e.Error} | ${message.author}, ${lang.commands.welcome.status.noMessage}`
					);
				}
				else {
					guildDBData.welcome.status = true;
					await guildDBData.save();

					return message.reply(`${e.Correct} | ${message.author}, ${lang.commands.welcome.status.on}`);
				}
			}
			if (guildDBData.welcome.status == true) {
				guildDBData.welcome.status = false;
				await guildDBData.save();

				return message.reply(`${e.Correct} | ${message.author}, ${lang.commands.welcome.status.off}`);
			}
		}

	}
};
