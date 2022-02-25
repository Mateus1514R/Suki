const Command = require('../../structures/Command')

module.exports = class NowPlaying extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'nowplaing'
		this.category = 'Music'
		this.description = ''
		this.aliases = ['']
	}

	async execute ({ message }) {

    const player = this.client.music.players.get(message.guild.id)

		if(!player) return message.reply('Não tem nada tocando neste servidor!')

	const embed = new this.client.embed(message.author)
    .setAuthor({ name: 'Tocando agora', iconURL: message.guild.iconURL({}) })
    .setDescription('Informações da música que estou tocando agora')
    .addFields(
      {
        name: 'Nome:',
        value: `**[${player.current.title}](${player.current.uri})**`,
        inline: false
      },
      {
        name: 'Pedida por:',
        value: `\`${player.current.requester.tag}\``,
        inline: false
      },
      {
        name: 'Canal da música:',
        value: `**[${player.current.author}](${player.current.thumbnailUrl})**`,
        inline: false
      },
      {
        name: 'Duração:',
        value: `\`${this.ms(player.position)}\` **${this.progressbar(player.position / 1000 / 50, player.current.duration / 1000 / 50, 15)}** \`${this.ms(player.current.duration)}\``
      }
    )

    message.reply({ embeds: [embed] })

  }

  ms(time) {

    time = Math.round(time / 1000)

    const segundos = time % 60, minutos = ~~((time / 60) % 60), horas = ~~(time / 60 / 60)

    return horas === 0 ? `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}` : `${String(Math.abs(horas) % 24).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`

  }
  progressbar(current, total, size) {

    const progess = Math.round((size * current) / total)

    return ("━".repeat(progess > 0 ? progess - 1 : progess) + "🔘" + "━".repeat(size - progess))

  }
}
