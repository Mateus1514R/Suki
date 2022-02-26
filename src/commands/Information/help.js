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

	async execute ({ message, args, lang }) {
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
				lang: lang,
				value: value,
				description: `${lang.commands.help.cmdCategory} **${value}**.`,
				commandList: commands
					.filter((x) => x.category === value)
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((f) => `**${f.name}**`)
					.join(' | '),
			});
		}

		const AJUDA = new this.client.embed(message.author)
			.setAuthor({
				name: `${this.client.user.username} - ${lang.commands.help.embed1.author}`,
				iconURL: this.client.user.displayAvatarURL({ size: 2048 })
			})
			.setColor('#7A0BC0');

		if (!args[0]) return this.menu({ menuOptions, message, lang });

		const name = args[0].toLowerCase();
		const command =
          commands.get(name) ||
          commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));

		if (!command) {
			return message.reply(
				`${e.Error} | ${message.author}, ${lang.commands.help.noCommand}`
			);
		}

		AJUDA.addFields({
			name: String(`${lang.commands.help.helper.info}`),
			value: `> ${e.Dev} | ${lang.commands.help.helper.name}: **${command.name}**\n> ${e.Link} | Aliases: **${
				!command.aliases.length
					? `${lang.commands.help.helper.noAliases}`
					: command.aliases.join(', ')
			}**\n> ${e.Archive} | ${lang.commands.help.helper.desc}: **${
				!command.description.length
					? `${lang.commands.help.helper.noDesc}`
					: command.description
			}**`,
		});

		await message.reply({ embeds: [AJUDA] });
	}

	async menu ({ menuOptions, message, lang = String }) {
		const row = new MessageActionRow();

		const menu = new MessageSelectMenu()
			.setCustomId('MenuSelection')
			.setMaxValues(1)
			.setMinValues(1)
			.setPlaceholder(String(`${lang.commands.help.row.selectMenu}`));

		menuOptions.forEach((option) => {
			switch (option.value) {
				case 'Config': {
					menu.addOptions({
						label: option.label ? option.label : option.value,
						description:
                `${lang.commands.help.categorys.config}`,
						value: option.value,
						emoji: e.Bot,
					});
					break;
				}
				case 'Economy': {
					menu.addOptions({
						label: option.label ? option.label : option.value,
						description: `${lang.commands.help.categorys.economy}`,
						value: option.value,
						emoji: e.Crystal,
					});
					break;
				}
				case 'Information': {
					menu.addOptions({
						label: option.label ? option.label : option.value,
						description: `${lang.commands.help.categorys.info}`,
						value: option.value,
						emoji: e.Archive,
					});
					break;
				}
				case 'Music': {
					menu.addOptions({
						label: option.label ? option.label : option.value,
						description: `${lang.commands.help.categorys.music}`,
						value: option.value,
						emoji: e.Music,
					});
					break;
				}
				case 'Miscellaneous': {
					menu.addOptions({
						label: option.label ? option.label : option.value,
						description: `${lang.commands.help.categorys.misc}`,
						value: option.value,
						emoji: e.World,
					});
					break;
				}
			}
		});

		const server = await this.client.guildDB.findOne({ guildID: message.guild.id });

		const EMBED = new this.client.embed(message.author)
			.setAuthor({
				name: `${this.client.user.username} - ${lang.commands.help.embed2.author}`,
				iconURL: this.client.user.displayAvatarURL({ size: 2048 })
			})
			.setColor('#7A0BC0')
			.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
			.setDescription(String(`${lang.commands.help.embed2.description}`).replace('{author}', message.author).replace('{prefix}', !server. prefix ? 's!' : server.prefix));

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
					content: `${e.Error} | ${r.user}, ${lang.commands.help.noPerm}`,
					ephemeral: true,
				});
			}

			const menuOptionData = menuOptions.find((v) => v.value === r.values[0]);

			EMBED.setDescription(
				`${lang.commands.help.commands} **\`${menuOptionData.value}\`**`
			);
			EMBED.fields = [];
			EMBED.addField(
				String(`${lang.commands.help.field}`),
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
