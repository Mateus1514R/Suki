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

	async execute ({ message }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply('Não tem nada tocando neste servidor!');

		if(!message.member.voice.channel) return message.reply('Você não está em um canal de voz');

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply('Você precisa estar no mesmo canal que eu estou para modificar a fila!');

		player.shuffleQueue();

		message.reply('Embaralhei a fila com sucesso');

	}
};