const { MessageSelectMenu, MessageActionRow } = require('discord.js');
const e = require('../../utils/Emojis');

const Command = require('../../structures/Command');

module.exports = class Help extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'help';
		this.category = 'Information';
		this.description = 'Veja todas as minhas funcionalidades.';
		this.aliases = ['ajuda'];
	}

	async execute ({ message, args }) {
		const { commands } = this.client;

		const block = [];
		block.push('Developer');

		const list = commands
			.map((x) => x.category)
			.filter((x, f, y) => y.indexOf(x) === f)
			.filter((c) => !block.includes(c));

		const menuOptions = [];

		for (let value of list) {
			menuOptions.push({
				value: value,
				description: `Comandos da categoria **${value}**.`,
				commandList: commands
					.filter((x) => x.category === value)
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((f) => `**${f.name}**`)
					.join(' | '),
			});
		}

		const AJUDA = new this.client.embed(message.author)
			.setAuthor({
				name: `${this.client.user.username} - Central de Ajuda`,
				iconURL: this.client.user.displayAvatarURL({ size: 2048 })
			})
			.setColor('#7A0BC0');

		if (!args[0]) return this.menu({ menuOptions, message });

		const name = args[0].toLowerCase();
		const command =
          commands.get(name) ||
          commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));

		if (!command) {
			return message.reply(
				`${e.Error} | ${message.author}, não encontrei o comando solicitado.`
			);
		}

		AJUDA.addFields({
			name: 'Informações do Comando:',
			value: `> ${e.Dev} | Nome do Comando: **${command.name}**\n> ${e.Link} | Aliases: **${
				!command.aliases.length
					? 'Este comando não tem aliases.'
					: command.aliases.join(', ')
			}**\n> ${e.Archive} | Descrição: **${
				!command.description.length
					? 'Este comando não tem descrição.'
					: command.description
			}**`,
		});

		await message.reply({ embeds: [AJUDA] });
	}

	async menu ({ menuOptions, message, }) {
		const row = new MessageActionRow();

		const menu = new MessageSelectMenu()
			.setCustomId('MenuSelection')
			.setMaxValues(1)
			.setMinValues(1)
			.setPlaceholder('Selecione a categoria.');

		menuOptions.forEach((option) => {
			switch (option.value) {
				case 'Config': {
					menu.addOptions({
						label: option.label ? option.label : option.value,
						description:
                'Comandos relacionados a configuração do bot na guilda.',
						value: option.value,
						emoji: e.Bot,
					});
					break;
				}
				case 'Economy': {
					menu.addOptions({
						label: option.label ? option.label : option.value,
						description: 'Comandos para utilizar a economia do bot.',
						value: option.value,
						emoji: e.Crystal,
					});
					break;
				}
				case 'Information': {
					menu.addOptions({
						label: option.label ? option.label : option.value,
						description: 'Comandos de algumas uteis informações diversas.',
						value: option.value,
						emoji: e.Archive,
					});
					break;
				}
			}
		});

		const server = await this.client.guildDB.findOne({ guildID: message.guild.id });

		const EMBED = new this.client.embed(message.author)

			.setAuthor({
				name: `${this.client.user.username} - Central de Ajuda`,
				iconURL: this.client.user.displayAvatarURL({ size: 2048 })
			})
			.setColor('#7A0BC0')
			.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
			.setDescription(
				`Olá ${message.author}, seja bem vindo a minha central de ajuda, aqui você terá acesso a todas as minhas funcionalidades disponíveis para seu uso!\n\nPara receber mais informação de algum comando, utilize **${!server.prefix ? 's!' : server.prefix}ajuda <comando>**.\nSelecione no menu abaixo a categoria que deseja ver.`
			);

		row.addComponents(menu);

		const msg = await message.reply({
			embeds: [EMBED],
			components: [row],
		});

		const filter = (interaction) => {
			return interaction.isSelectMenu() && interaction.message.id === msg.id;
		};

		const collector = message.channel.createMessageComponentCollector({
			time: 180000,
			filter: filter,
		});

		collector.on('collect', async (r) => {
			if (r.user.id !== message.author.id) {
				return r.reply({
					content: `${e.Error} | ${message.author}, você precisa executar o comando para isso.`,
					ephemeral: true,
				});
			}

			const menuOptionData = menuOptions.find((v) => v.value === r.values[0]);

			EMBED.setDescription(
				`Você está **vendo** os **comandos** da categoria **\`${menuOptionData.value}\`**`
			);
			EMBED.fields = [];
			EMBED.addField(
				'Comandos:',
				menuOptionData.commandList
			);

			await msg.edit({ embeds: [EMBED] }, true);
			await r.deferUpdate();
		});

		collector.on('end', async (r, reason) => {
			if (reason != 'time') return;
			msg.delete();
		});
	}
};
