const Command = require('../../structures/Command')

module.exports = class Volume extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'volume'
		this.category = 'Music'
		this.description = ''
		this.aliases = ['']
	}

	async execute ({ message, args }) {

    const player = this.client.music.players.get(message.guild.id)

		if(!player) return message.reply('Não tem nada tocando neste servidor!')

		if(!message.member.voice.channel) return message.reply('Você não está em um canal de voz')
    
		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply('Você precisa estar no mesmo canal que eu estou para modificar a fila!')

    if(!args[0]) return message.reply('Insira o volume que deseja setar')

    if(!Number(args[0])) return message.reply('Só aceito numeros')

    if(!args[0] || args[0] < 1 || args[0] > 500) return message.reply('Foreneça um volume entre 0 a 500')

    player.filters.setVolume(Number(args[0]));

    message.reply('O volume da música foi setado com sucesso')

  }
}