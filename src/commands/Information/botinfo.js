const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');
const moment = require('moment');
const { MessageButton, MessageActionRow } = require('discord.js');
const Discord = require('discord.js');

module.exports = class BotInfo extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'botinfo';
		this.category = 'Information';
		this.description = 'Veja as informações do BOT.';
		this.aliases = ['bi'];
	}

	async execute ({ message }) {
		moment.locale('pt-BR');

		// Imports
		const users = this.client.guilds.cache.map((g) => g.memberCount).reduce((a, g) => a + g).toLocaleString();
		const servers = this.client.guilds.cache.size;
		const commands = this.client.commands.size;
		const memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
		const system = process.platform.replace('win32', 'Windows').replace('linux', 'Linux');
		const uptime = moment(process.uptime()).format('LT');
		const version = process.version;
		const server = await this.client.guildDB.findOne({ guildID: message.guild.id });
		// Fim dos Imports

		const embed = new this.client.embed(message.author)
			.setAuthor({
				name: `${this.client.user.username}`,
				iconURL: this.client.user.avatarURL({ size: 2048 }),
			})
			.setThumbnail(this.client.user.avatarURL({ size: 2048 }))
			.addFields([
				{
					name: 'Informações Básicas:',
					value: `${e.Bot} | Nome: **[Suki](https://github.com/Niskii3/Suki)**\n${e.Owner} | Criadores: **[Vxk](https://github.com/VCScript)** - **[Niskii](https://github.com/Niskii3)**\n${e.Prefix} | Prefixo: **${server.prefix}**\n${e.User} | Usuários: **${users}**\n${e.World} | Servidores: **${servers}**\n${e.Info} Criada em: **<t:1637891973:d>**`,
					inline: true
				},
				{
					name: 'Informações Técnicas:',
					value: `${e.Archive} | Comandos: **${commands}**\n${e.Loading} | RAM: **${memory}MB**\n${e.Time} | Uptime: **${uptime}**\n${e.NodeJS} | Node.js: **${version}**\n${e.Discord} | Discord.js: **v${Discord.version}**\n${e.Version} | Plataforma: **${system}**`,
					inline: true
				}
			]);

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Me Adicione')
					.setStyle('LINK')
					.setURL('https://discord.com/oauth2/authorize?client_id=913609896505782282&permissions=20887631278&scope=bot')
					.setEmoji(e.Link),
				new MessageButton()
					.setLabel('Suporte')
					.setStyle('LINK')
					.setURL('https://discord.gg/xBe7hABxMD')
					.setEmoji(e.Rules),
				new MessageButton()
					.setLabel('Repositório')
					.setStyle('LINK')
					.setURL('https://github.com/Niskii3/Suki')
					.setEmoji(e.Bot)
			);

		message.reply({ embeds: [embed], components: [row] });
	}
};
