const Command = require('../../structures/Command')

module.exports = class Remove extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'remove'
		this.category = 'Music'
		this.description = ''
		this.aliases = ['']
	}

	async execute ({ message }) {

    const player = this.client.music.players.get(message.guild.id)

		if(!player) return message.reply('Não tem nada tocando neste servidor!')

		if(!message.member.voice.channel) return message.reply('Você não está em um canal de voz')
    
		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply('Você precisa estar no mesmo canal que eu estou para modificar a fila!')

    if(!args[0]) return message.reply('Digite o numero da música que deseja tirar da fila, para ver o numero de uma música utilize o comando de \`Queue\`')

    if(!Number(args[0])) return message.reply('Aceito só numeros')

    if(args[0] > player.queue.length) return message.reply('Não tem uma música com essa numeração')

    player.queue.splice(args[0] -1, 1)

    message.reply('Música removida da fila com sucesso')

  }
}