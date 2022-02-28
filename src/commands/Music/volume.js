const Command = require('../../structures/Command');

module.exports = class Volume extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'volume';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, args, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commands.volume.noPlayer}`);

		if(!message.member.voice.channel) return message.reply(`${lang.commands.volume.channelError}`);

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${lang.commands.volume.channelError2}`);

		if(!args[0]) return message.reply(`${lang.commands.volume.noArgs}`);

		if(!Number(args[0])) return message.reply(`${lang.commands.volume.number}`);

		if(!args[0] || args[0] < 1 || args[0] > 500) return message.reply(`${lang.commands.volume.correctNumber}`);

		player.filters.setVolume(Number(args[0]));

		message.reply(`${lang.commands.volume.success}`);

	}
};