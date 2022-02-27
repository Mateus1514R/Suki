const { Embed, Util } = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class NowPlaying extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'nowplaing';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commands.nowplaying.noPlayer}`);

		const embed = new Embed()
			.setAuthor({ name: `${lang.commands.nowplaying.embed.author}`, iconURL: message.guild.iconURL({}) })
			.setDescription(`${lang.commands.nowplaying.embed.description}`)
			.setTimestamp()
			.setColor(Util.resolveColor('Purple'))
			.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
			.addFields(
				{
					name: `${lang.commands.nowplaying.embed.name}`,
					value: `**[${player.current.title}](${player.current.uri})**`,
					inline: false
				},
				{
					name: `${lang.commands.nowplaying.embed.requester}`,
					value: `\`${player.current.requester.tag}\``,
					inline: false
				},
				{
					name: `${lang.commands.nowplaying.embed.channel}`,
					value: `**[${player.current.author}](${player.current.thumbnailUrl})**`,
					inline: false
				},
				{
					name: `${lang.commands.nowplaying.embed.duration}`,
					value: `\`${this.ms(player.position)}\` **${this.progressbar(player.position / 1000 / 50, player.current.duration / 1000 / 50, 15)}** \`${this.ms(player.current.duration)}\``
				}
			);

		message.reply({ embeds: [embed] });

	}

	ms (time) {

		time = Math.round(time / 1000);

		const segundos = time % 60, minutos = ~~(time / 60 % 60), horas = ~~(time / 60 / 60);

		return horas === 0 ? `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}` : `${String(Math.abs(horas) % 24).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

	}
	progressbar (current, total, size) {

		const progess = Math.round(size * current / total);

		return '━'.repeat(progess > 0 ? progess - 1 : progess) + '🔘' + '━'.repeat(size - progess);

	}
};
