const Command = require('../../structures/Command')

module.exports = class Loop extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'loop'
		this.category = 'Music'
		this.description = ''
		this.aliases = ['']
	}

	async execute ({ message, args }) {

    const player = this.client.music.players.get(message.guild.id)

		if(!player) return message.reply('Não tem nada tocando neste servidor!')

		if(!message.member.voice.channel) return message.reply('Você não está em um canal de voz')
    
		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply('Você precisa estar no mesmo canal que eu estou para modificar a fila!')

    if(!args[0]) return message.reply('Você não coloco o loop que deseja ativar, opções: \`Track\`, \`Queue\` e \`Disable\` caso queira desativar.')

    if(['track'].includes(args[0].toLowerCase())) {

      player.setTrackLoop(true)
      player.setQueueLoop(false)

      return message.reply('Loop ativado com sucesso')

    }

    if(['queue'].includes(args[0].toLowerCase())) {

      player.setQueueLoop(true)
      player.setTrackLoop(false)

      return message.reply('Loop ativado com sucesso')

    }

    if(['disable'].includes(args[0].toLowerCase())) {

      player.setQueueLoop(false)
      player.setTrackLoop(false)

      return message.reply('Loop desativado com sucesso')
      
    }
  }
}