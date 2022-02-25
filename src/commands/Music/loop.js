const Command = require('../../structures/Command')

module.exports = class Loop extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'loop'
		this.category = 'Music'
		this.description = 'Coloque a fila atual em Loop.'
		this.aliases = ['lp']
	}

	async execute ({ message, args }) {

    const player = this.client.music.players.get(message.guild.id)
    if(!message.member.voice.channel) return message.reply(`${e.Error} | ${message.author}, você precisa estar em um \`Canal de Voz\` para isso.`)
    if(!player) return message.reply(`${e.Error} | ${message.author}, não há nada tocando neste servidor.`)
    if(!args[0]) return message.reply(`${e.Error} | ${message.author}, você precisa inserir o loop que deseja ativar.\n${e.Right} | Opções Disponíveis:\n> Track | Queue | Disable`)
    
		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`${e.Error} | ${message.author}, você precisa estar no mesmo canal de voz que eu para modificar a fila.`)

    if(['track'].includes(args[0].toLowerCase())) {

      player.setTrackLoop(true)
      player.setQueueLoop(false)

      return message.reply(`${e.Confirm} | ${message.author}, você ativou o \`Track Loop\` com sucesso!`)

    }

    if(['queue'].includes(args[0].toLowerCase())) {

      player.setQueueLoop(true)
      player.setTrackLoop(false)

      return message.reply(`${e.Confirm} | ${message.author}, você ativou o \`Queue Loop\` com sucesso!`)

    }

    if(['disable'].includes(args[0].toLowerCase())) {

      player.setQueueLoop(false)
      player.setTrackLoop(false)

      return message.reply(`${e.Confirm} | ${message.author}, você desativou o \`Loop\` com sucesso!`)
      
    }
  }
}