const { MessageSelectMenu, MessageActionRow } = require('discord.js');
const Command = require('../../structures/Command')

module.exports = class Search extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'search'
		this.category = 'Music'
		this.description = ''
		this.aliases = ['']
	}

	async execute ({ message, args }) {

    const musica = args.join(' ')

    const player = this.client.music.createPlayer({
			guildId: message.guild.id,
			voiceChannelId: message.member.voice.channel.id,
			textChannelId: message.channel.id,
			selfDeaf: true,
		})

		if(!message.member.voice.channel) return message.reply('Você não está em um canal de voz')
    
		if(message.client.music.players.get(message.guild.id) != null && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply('Você precisa estar no mesmo canal que eu estou para modificar a fila!')

    if(!musica) return message.reply('Coloque o nome da música que deseja ouvir')

    if(player.state !== "CONNECTED") player.connect()

    let res = await this.client.music.search(musica)

    if(res.loadType === 'LOAD_FAILED') return message.reply('Ocorreu um erro ' + res.exception.message)

    if(res.loadType === 'NO_MATCHES') return message.reply('Ocorreu um erro ao procurar a música desejada')

    if(res.loadType === 'PLAYLIST_LOADED') return message.reply('Não aceito links!')

    if(res.loadType === 'TRACK_LOADED') return message.reply('Não aceito links!')

    if(res.loadType === 'SEARCH_RESULT') {

      let max = 15, collected, filter = (inter) => ['MusicSelector'].includes(inter.customId)

      if(res.tracks.length < max) max = res.tracks.length;

      let options = res.tracks.slice(0, max).map(({ title, identifier, author }) => { return { title, identifier, author } })

      const menu = new MessageSelectMenu()
      .setMinValues(1)
      .setMaxValues(max)
      .setCustomId('MusicSelector')
      .setPlaceholder("Selecione as músicas a por na fila")

      let i = 0;

      for(const track of options) {

        i++

        menu.addOptions([
          {
            label: `${i}. ${track.title.slice(0, 30)}`,
            description: track.title.slice(0, 50),
            value: track.identifier
          }
        ])

      }

      let index = 1;

      const results = res.tracks.slice(0, max).map((track) => `**${index++}. [${track.title.slice(0, 50)}](${track.uri})**`)

      const embed = new this.client.embed(message.author)
      .setAuthor({ name: 'Resultados', iconURL: message.guild.iconURL({}) })
      .setDescription(results)

      const row = new MessageActionRow()
      .addComponents(menu)

      message.reply({ embeds: [embed], components: [row] }).then((msg) => {

        const collector = message.channel.createMessageComponentCollector({ time: 60000, idle: 60000 })

        collector.on('collect', async(inter) => {

          if(inter.member.user.id !== message.author.id) return inter.reply({ content: 'Use o comando para poder usar o menu', ephemeral: true })

          switch(inter.customId) {

            case 'MusicSelector': {

              try {

                await msg.delete()

              } catch(E) { console.log(E) }

              let tracks = []

              res.tracks.forEach((value) => { value.setRequester(message.author) })

              for(const id of inter.values) tracks.push(res.tracks.find((x) => x.identifier === id))

              tracks.forEach((value) => { player.queue.push(value) })

              if(!player.playing && !player.paused) player.play()

              message.reply('Adicionei todas as músicas desejadas na fila')
              
            }
          }
        })
      })
    }
  }
}