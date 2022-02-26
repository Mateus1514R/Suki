const Command = require('../../structures/Command');

module.exports = class Resume extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'resume';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commands.resume.noPlayer}`);

		if(!message.member.voice.channel) return message.reply(`${lang.commands.resume.channelError}`);

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${lang.commands.resume.channelError2}`);

		if(!player.paused) return message.reply(`${lang.commands.resume.alteradyPause}`);

		player.pause(false);

		message.reply(`${lang.commands.resume.sucess}`);

	}
};