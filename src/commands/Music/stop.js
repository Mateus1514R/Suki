const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class Stop extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'stop';
		this.category = 'Music';
		this.description = 'Pare a música que está tocando no momento.';
		this.aliases = ['reset', 'disconnect'];
	}

	async execute ({ message, lang }) {
		if (message.guild.me.voice.channel != null) {
			if (
				message.member.voice.channel.id !=
                message.guild.me.voice.channel.id ===
              true
			) {
				return message.reply(
					`${e.Error} | ${message.author}, ${lang.commands.stop.channelError2}`
				);
			}
		}
		const player = message.client.music.players.get(message.guild.id);

		const { channel } = message.member.voice;

		if (!channel) {
			return message.reply(
				`${e.Error} | ${message.author}, ${lang.commands.stop.channelError}`
			);
		}

		if (player) {
			player.destroy();
			await message.react(e.Right);
		}
	}
};