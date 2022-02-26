const Command = require('../../structures/Command');

module.exports = class Pause extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'pause';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commands.pause.noPlayer}`);

		if(!message.member.voice.channel) return message.reply(`${lang.commands.pause.channelError}`);

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${lang.commands.pause.channelError2}`);

		if(player.paused) return message.reply(`${lang.commands.pause.alteradyPause}`);

		player.pause(true);

		message.reply(`${lang.commands.pause.sucess}`);

	}
};