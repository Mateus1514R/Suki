const Command = require('../../structures/Command');
const ms = require('ms');

module.exports = class Seek extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'seek';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, args, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commands.seek.noPlayer}`);

		if(!message.member.voice.channel) return message.reply(`${lang.commands.seek.channelError}`);

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${lang.commands.seek.channelError2}`);

		if(!player.current) return message.reply(`${lang.commands.seek.noPlayer}`);

		if(!args[0]) return message.reply(`${lang.commands.seek.invalidTime}`);

		const time = ms(args[0]);

		if(!Number(time)) return message.reply(`${lang.commands.seek.invalidTime}`);

		if(time > player.current.duration) return message.reply(`${lang.commands.seek.exceeds}`);

		player.seek(time);

		message.reply(`${lang.commands.seek.success}`);

	}
};