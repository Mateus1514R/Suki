const { MessageEmbed, Guild } = require('discord.js')

module.exports = class guildDelete {
  constructor(client) {
    this.client = client;
  }

  async execute(guild = Guild) {
    this.client.guildDB.findOneAndDelete({ guildID: guild.id });
    
  }
}