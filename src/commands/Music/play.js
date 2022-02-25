const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class Play extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'play';
		this.category = 'Music';
		this.description = 'Peça uma música para eu tocar.';
		this.aliases = ['p'];
	}

	async execute ({ message, args }) {
		if(this.client.music.players.get(message.guild.id)) {
		if (message.member.voice.channel?.id !== message.guild.me.voice.channel?.id) {
			return message.reply(
				`${e.Error} | ${message.author}, você precisa estar no mesmo canal de voz que eu para modificar a fila.`
			);
		}
	}

		const music = args.join(' ');

		if (!music) {
			return message.reply(
				`${e.Error} | ${message.author}, você precisa inserir a música que deseja que eu toque.`
			);
		}

		const result = await message.client.music.search(music, message.author);
		var msg = await message.reply(`${e.Music} | ${message.author}, pesquisando \`${music}\`...`);

		if (result.loadType === 'LOAD_FAILED') {
			return message.reply(
				`${e.Error} | ${message.author}, desculpe, mas o link/nome que você inseriu não é válido.`
			);
		}
		if (result.loadType === 'NO_MATCHES') {
			return message.reply(
				`${e.Error} | ${message.author}, não encontrei a música que você deseja.`
			);
		}

		const player = message.client.music.createPlayer({
			guildId: message.guild.id,
			voiceChannelId: message.member.voice.channel.id,
			textChannelId: message.channel.id,
			selfDeaf: true,
		});

		player.connect();

		if (result.loadType === 'PLAYLIST_LOADED') {
			for (const track of result.tracks) {
				player.queue.push(track);
				track.setRequester(message.author);
			}

			if (!player.playing) player.play();

			const embed = new this.client.embed(message.author)
				.setDescription(`[${result.playlistInfo.name}](${args[0]})`)
				.addFields({
					name: 'Duração:',
					value: `${formatTime(
						convertMilliseconds(result.playlistInfo?.duration),
						'hh:mm:ss'
					)}`,
					inline: true,
				});

			msg.edit({ content: ' ', embeds: [embed] });
		}
		else {
			const tracks = result.tracks;
			const msc = tracks[0];
			msc.setRequester(message.author);
			player.queue.push(msc);

			if (message.client.music.players.get(message.guild.id)) {

				  const startingMusic = new this.client.embed(message.author)
					.setAuthor({ name: 'Começando a tocar', iconURL: message.guild.iconURL() })
					.addFields(
				  {
							name: `${e.Music} | Música:`,
							value: `> [${tracks[0].title}](${tracks[0].uri})`,
				  },
				  {
							name: `${e.Time} | Duração:`,
							value: `> ${formatTime(
					  convertMilliseconds(tracks[0].duration),
					  'mm:ss'
							)}`,
				  },
				  {
							name: `${e.User} | Pedido por:`,
							value: `> ${message.author}`,
				  }
					);

				msg.edit({ content: ' ', embeds: [startingMusic] });
			  }

			if (!player.playing) player.play();
		}
	}
};

function convertMilliseconds (ms) {
	const seconds = ~~(ms / 1000);
	const minutes = ~~(seconds / 60);
	const hours = ~~(minutes / 60);

	return {
		hours: hours % 24,
		minutes: minutes % 60,
		seconds: seconds % 60,
	};
}

function formatTime (time, format, twoDigits = true) {
	const formats = {
		dd: 'days',
		hh: 'hours',
		mm: 'minutes',
		ss: 'seconds',
	};

	return format.replace(/dd|hh|mm|ss/g, (match) =>
		time[formats[match]].toString().padStart(twoDigits ? 2 : 0, '0')
	);
}
