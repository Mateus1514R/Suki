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

	async execute ({ message, args }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply('Não tem nada tocando neste servidor!');

		if(!message.member.voice.channel) return message.reply('Você não está em um canal de voz');

		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply('Você precisa estar no mesmo canal que eu estou para modificar a fila!');

		if(!args[0]) return message.reply('Coloque o numero de músicas que deseja pular');

		if(!Number(args[0])) return message.reply('Só aceito numeros');

		if(args[0] < 1) return message.reply('Coloque um numero que seja acima de 1');

		if(args[0] > player.queue.length) return message.reply('Não tem esse numero de músicas na fila');

		player.skip(args[0]);

		if(!player.queue) return message.reply('Todas as músicas que estavam na queue foi pulada');

		message.reply('Pulei as músicas desejadas com sucesso');

	}
};