const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');
const moment = require('moment');
const { ActionRow, Embed, ButtonComponent, ButtonStyle, Util } = require('discord.js');

module.exports = class BotInfo extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'botinfo';
		this.category = 'Information';
		this.description = 'Veja as informações do BOT.';
		this.aliases = ['bi'];
	}

	async execute ({ message, lang }) {
		moment.locale('pt-BR');

		// Imports
		const users = this.client.guilds.cache
			.map((g) => g.memberCount)
			.reduce((a, g) => a + g)
			.toLocaleString();
		const servers = this.client.guilds.cache.size;
		const commands = this.client.commands.size;
		const memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
		const system = process.platform
			.replace('win32', 'Windows')
			.replace('linux', 'Linux');
		const uptime = moment.duration(this.client.uptime).format('d[d] h[h] m[m] s[s]');
		const version = process.version;
		const server = await this.client.guildDB.findOne({
			guildID: message.guild.id,
		});
		// Fim dos Imports

		const embed = new Embed()
			.setAuthor({
				name: `${this.client.user.username}`,
				iconURL: this.client.user.avatarURL({ size: 2048 }),
			})
			.setThumbnail(this.client.user.avatarURL({ size: 2048 }))
			.setTimestamp()
			.setColor(Util.resolveColor('Purple'))
			.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
			.addFields(
				{
					name: `${lang.commands.botinfo.embed.name1}`,
					value: `${e.Owner} | ${lang.commands.botinfo.embed.owners}: **[Vxk](https://github.com/VCScript)** - **[Niskii](https://github.com/Niskii3)**\n${e.Contributor} | Contributor's: **[Jon4s](https://github.com/yJon4ss)** - **[Splitze](https://github.com/Splitze)**\n${e.Info} | ${lang.commands.botinfo.embed.created}: **<t:1637891973:d>**\n${e.Prefix} | ${lang.commands.botinfo.embed.prefix}: **${server.prefix}**\n${e.User} | ${lang.commands.botinfo.embed.users}: **${users}**\n${e.World} | ${lang.commands.botinfo.embed.servers}: **${servers}**`,
					inline: true,
				},
				{
					name: `${lang.commands.botinfo.embed.name2}:`,
					value: `${e.Archive} | ${lang.commands.botinfo.embed.commands}: **${commands}**\n${e.Loading} | RAM: **${memory}MB**\n${e.Time} | Uptime: **${uptime}**\n${e.NodeJS} | Node.js: **${version}**\n${e.Discord} | Discord.js: **14.0.0-dev**\n${e.Version} | ${lang.commands.botinfo.embed.platform}: **${system}**\n`,
					inline: true,
				});

		const row = new ActionRow().addComponents(
			new ButtonComponent()
				.setLabel(`${lang.commands.botinfo.buttons.add}`)
				.setStyle(ButtonStyle.Link)
				.setURL(
					'https://discord.com/oauth2/authorize?client_id=913609896505782282&permissions=20887631278&scope=bot'
				)
				.setEmoji({
					name: 'Link',
					id: '945676913299574834',
					animated: false
				}),
			new ButtonComponent()
				.setLabel(`${lang.commands.botinfo.buttons.sup}`)
				.setStyle(ButtonStyle.Link)
				.setURL('https://discord.gg/xBe7hABxMD')
				.setEmoji({
					name: 'Rules',
					id: '945677376594018404',
					animated: false
				}),
			new ButtonComponent()
				.setLabel(`${lang.commands.botinfo.buttons.repo}`)
				.setStyle(ButtonStyle.Link)
				.setURL('https://github.com/sukicorp/Suki')
				.setEmoji({
					name: 'Bot',
					id: '945748531594014752',
					animated: false
				})
		);

		message.reply({ embeds: [embed], components: [row] });
	}
};
