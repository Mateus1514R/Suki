const Command = require('../../structures/Command')
const ms = require('ms')

module.exports = class Seek extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'seek'
		this.category = 'Music'
		this.description = ''
		this.aliases = ['']
	}

	async execute ({ message, args }) {

    const player = this.client.music.players.get(message.guild.id)

		if(!player) return message.reply('Não tem nada tocando neste servidor!')

		if(!message.member.voice.channel) return message.reply('Você não está em um canal de voz')
    
		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply('Você precisa estar no mesmo canal que eu estou para modificar a fila!')

    if(!player.current) return message.reply('Não tem nada tocando atualmente')

    if(!args[0]) return message.reply('Coloque o tempo, exemplo: \`1M\`')

    const time = ms(args[0])

    if(!Number(time)) return message.reply('Decsulpe, aceito apenas numeros.')

    if(time > player.current.duration) return message.reply('Esse tempo que você colocou excede o da música')

    player.seek(time)

    message.reply('Pulei para o tempo desejado com sucesso')

  }
}