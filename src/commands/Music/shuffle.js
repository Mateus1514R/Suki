const Command = require('../../structures/Command');

module.exports = class Shuffle extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'shuffle';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commands.shuffle.noPlayer}`);

		if(!message.member.voice.channel) return message.reply(`${lang.commands.shuffle.channelError}`);

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${lang.commands.shuffle.channelError2}`);

		player.shuffleQueue();

		message.reply(`${lang.commands.shuffle.success}`);

	}
};