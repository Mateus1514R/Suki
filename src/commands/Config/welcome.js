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

	async execute ({ message, args }) {
		if (!message.member.permissions.has('MANAGE_GUILD') && !this.client.developers.some(x => x === message.author.id)) {
			return message.reply(
				`${e.Error} | ${message.author}, você precisa da permissão \`Gerenciar Servidor\` para usar este comando.`
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
				.setDescription('🚪 | Sistema de Logs de Entrada:')
				.addFields([
					{
						name: 'Sistema:',
						value: `> ${e.On} | Status: **${
							guildDBData.welcome.status == false ? 'Desligado' : 'Ligado'
						}**\n> ${e.World} | Chat: **${
							guildDBData.welcome.channel == 'null'
								? 'Sem canal definido.'
								: `<#${guildDBData.welcome.channel}>`
						}**\n> ${e.Chat} | Mensagem: \`\`\` ${
							guildDBData.welcome.message == 'null'
								? '# Nenhuma mensagem definida.'
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
								.setDescription('🚪 | Sistema de Logs de Entrada:')
								.addFields([
									{
										name: 'Placeholders:',
										value: '> **[user]** - Menciona o usuário\n> **[name]** - Mostra o nome do usuário\n> **[guild]** - Mostra o nome do servidor\n> **[total]** - Mostra a quantia atual de membros.',
									},
									{
										name: 'Comandos:',
										value: '> **welcome set <chat>** - Defina o canal de Entrada.\n> **welcome msg <msg>** - Defina a mensagem de boas-vindas.\n> **welcome status** - Ativa ou desativa o sistema.',
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
										name: 'Sistema:',
										value: `> ${e.On} | Status: **${
											guildDBData.welcome.status == false
												? 'Desligado'
												: 'Ligado'
										}**\n> ${e.World} | Chat: **${
											guildDBData.welcome.channel == 'null'
												? 'Sem canal definido.'
												: `<#${guildDBData.welcome.channel}>`
										}**\n> ${e.Chat} | Mensagem: \`\`\` ${
											guildDBData.welcome.message == 'null'
												? '# Nenhuma mensagem definida.'
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
					`${e.Error} | ${message.author}, você precisa inserir o canal.`
				);
			}
			else if (channel.id == guildDBData.welcome.channel) {
				return message.reply(
					`${e.Error} | ${message.author}, o canal inserido é o mesmo definido atualmente.`
				);
			}
			else if (!channel.type === 'text') {
				return message.reply(
					`${e.Error} | ${message.author}, você precisa inserir um canal de texto.`
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
					`${e.Correct} | ${message.author}, canal de entrada definido com sucesso para ${channel}.`
				);
			}
			return;
		}

		if (['message', 'msg'].includes(args[0].toLowerCase())) {
			let msg = args.slice(1).join(' ');

			if (!msg) {
				return message.reply(
					`${e.Error} | ${message.author}, você precisa inserir a mensagem.`
				);
			}
			else if (msg == guildDBData.welcome.message) {
				return message.reply(
					`${e.Error} | ${message.author}, a mensagem inserida é o mesma definida atualmente.`
				);
			}
			else if (msg.length > 200) {
				return message.reply(
					`${e.Error} | ${message.author}, a mensagem deve ter no máximo 200 caracteres.`
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
					`${e.Correct} | ${message.author}, mensagem de boas-vindas definida com sucesso para \`\`\`${msg}\`\`\``
				);
			}
			return;
		}

		if (['stats', 'status', 'on', 'off'].includes(args[0].toLowerCase())) {
			if (guildDBData.welcome.status == false) {
				if (guildDBData.welcome.channel == 'null') {
					return message.reply(
						`${e.Error} | ${message.author}, você precisa definir o canal de entrada para ligar o sistema.`
					);
				}
				else if (guildDBData.welcome.message == 'null') {
					return message.reply(
						`${e.Error} | ${message.author}, você precisa definir a mensagem de boas-vindas para ligar o sistema.`
					);
				}
				else {
					guildDBData.welcome.status = true;
					await guildDBData.save();

					return message.reply(`${e.Correct} | ${message.author}, sistema ligado com sucesso!`);
				}
			}
			if (guildDBData.welcome.status == true) {
				guildDBData.welcome.status = false;
				await guildDBData.save();

				return message.reply(`${e.Correct} | ${message.author}, sistema desligado com sucesso!`);
			}
		}

	}
};
