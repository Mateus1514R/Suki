const Command = require('../../structures/Command')
const lyrics = require('music-lyrics')

module.exports = class Lyrics extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'lyrics'
		this.category = 'Music'
		this.description = ''
		this.aliases = ['']
	}

	async execute({ message }) {

    const player = this.client.music.players.get(message.guild.id)

		if(!player) return message.reply('Não tem nada tocando neste servidor!')

    if(!player.current) return message.reply('Não tem nada tocando atualmente')

    try {

      const music = await lyrics.search(player.current.title)

      if(music) {

        const embed = new this.client.embed(message.author)
        .setAuthor({ name: 'Lyrics', iconURL: message.guild.iconURL({}) })
        .setDescription(`Letra da música\n\n${music}`)

        message.reply({ embeds: [embed] })

      }

    } catch(E) {

      console.log(E)

      return message.reply('Não consegui achar a letra da música')

    }
  }
}