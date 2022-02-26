const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class Loop extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'loop';
		this.category = 'Music';
		this.description = 'Coloque a fila atual em Loop.';
		this.aliases = ['lp'];
	}

	async execute ({ message, args, lang }) {

		const player = this.client.music.players.get(message.guild.id);
		if(!message.member.voice.channel) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.loop.channelError}`);
		if(!player) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.loop.noPlayer}`);
		if(!args[0]) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.loop.noArgs.replace('{}', e.Right)}`);

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${e.Error} | ${message.author}, você precisa estar no mesmo canal de voz que eu para modificar a fila.`);

		if(['track'].includes(args[0].toLowerCase())) {

			player.setTrackLoop(true);
			player.setQueueLoop(false);

			return message.reply(`${e.Confirm} | ${message.author}, ${lang.commands.loop.trackloop}`);

		}

		if(['queue'].includes(args[0].toLowerCase())) {

			player.setQueueLoop(true);
			player.setTrackLoop(false);

			return message.reply(`${e.Confirm} | ${message.author}, ${lang.commands.loop.queueloop}`);

		}

		if(['disable'].includes(args[0].toLowerCase())) {

			player.setQueueLoop(false);
			player.setTrackLoop(false);

			return message.reply(`${e.Confirm} | ${message.author}, ${lang.commands.loop.disable}`);

		}
	}
};