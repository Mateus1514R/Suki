const Command = require('../../structures/Command')

module.exports = class ForcePlay extends Command {
	constructor (client) {
		super(client)
		this.client = client;

		this.name = 'forceplay'
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

    if(!musica) return message.reply('Coloque o link/nome da música que deseja ouvir')

    if(player.state !== "CONNECTED") player.connect()

    let res = await this.client.music.search(musica)

    if(res.loadType === 'LOAD_FAILED') return message.reply('Ocorreu um erro ' + res.exception.message)

    if(res.loadType === 'NO_MATCHES') return message.reply('Ocorreu um erro ao procurar a música desejada')

    if(res.loadType === 'PLAYLIST_LOADED') {

      for(const track of res.tracks) {

        track.setRequester(message.author)

        player.queue.unshift(track)

      }

      if(player.current) player.skip()

      if(!player.playing && !player.paused) player.play()

      message.reply('Playlist carregada com sucesso')

    }

    if(res.loadType === 'TRACK_LOADED') {

      res.tracks[0].setRequester(message.author)

      player.queue.unshift(res.tracks[0])

      if(player.current) player.skip()

      if(!player.playing && !player.paused) player.play()

      message.reply('Música carregada com sucesso')

    }

    if(res.loadType === 'SEARCH_RESULT') {

      res.tracks[0].setRequester(message.author)

      player.queue.unshift(res.tracks[0])

      if(player.current) player.skip()

      if(!player.playing && !player.paused) player.play()

      message.reply('Música carregada com sucesso')

    }
  }
}