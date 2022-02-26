const Command = require('../../structures/Command');

module.exports = class Remove extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'remove';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, args, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commands.remove.noPlayer}`);

		if(!message.member.voice.channel) return message.reply(`${lang.commands.remove.channelError}`);

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${lang.commands.remove.channelError2}`);

		if(!args[0]) return message.reply(`${lang.commands.remove.noArgs}`);

		if(!Number(args[0])) return message.reply(`${lang.commands.remove.number}`);

		if(args[0] > player.queue.length) return message.reply(`${lang.commands.remove.noMusic}`);

		player.queue.splice(args[0] - 1, 1);

		message.reply(`${lang.commands.remove.success}`);

	}
};
