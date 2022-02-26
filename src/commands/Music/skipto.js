const Command = require('../../structures/Command');

module.exports = class Skipto extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'skipto';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, args, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commads.skipto.noPlayer}`);

		if(!message.member.voice.channel) return message.reply(`${lang.commads.skipto.channelError}`);

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${lang.commads.skipto.channelError2}`);

		if(!args[0]) return message.reply(`${lang.commands.skipto.noArgs}`);

		if(!Number(args[0])) return message.reply(`${lang.commands.skipto.number}`);

		if(args[0] < 1) return message.reply(`${lang.commands.skipto.numberOne}`);

		if(args[0] > player.queue.length) return message.reply(`${lang.commands.skipto.queue}`);

		player.skip(args[0]);

		if(!player.queue) return message.reply(`${lang.commands.skipto.end}`);

		message.reply(`${lang.commands.skipto.sucess}`);

	}
};