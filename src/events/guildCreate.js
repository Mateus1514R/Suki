const { MessageEmbed, Guild } = require('discord.js')

module.exports = class guildCreate {
  constructor(client) {
    this.client = client;
  }

  async execute(guild = Guild) {
    this.client.guildDB.create({
        guildID: guild.id,
        prefix: 's!'
    })
    
  }
}