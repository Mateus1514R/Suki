const Command = require('../../structures/Command')

module.exports = class Pause extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'pause'
		this.category = 'Music'
		this.description = ''
		this.aliases = ['']
	}

	async execute ({ message }) {

    const player = this.client.music.players.get(message.guild.id)

		if(!player) return message.reply('Não tem nada tocando neste servidor!')

		if(!message.member.voice.channel) return message.reply('Você não está em um canal de voz')
    
		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply('Você precisa estar no mesmo canal que eu estou para modificar a fila!')

    if(player.paused) return message.reply('A música já se encontra pausada.')

    player.pause(true)

    message.reply('Música pausada com sucesso')

  }
}