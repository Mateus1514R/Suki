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
    
    const embed = new MessageEmbed()
    .setTitle('Fui adicionado em um novo servidor')
    .setColor("#7A0BC0")
    .setTimestamp()
    .addFields(
      {
          name: `Nome:`,
          value: `${guild.name}`,
          inline: true,
        },
        {
          name: `ID do Servidor`,
          value: `${guild.id}`,
          inline: true,
        },
        {
          name: `Total de Usuários`,
          value: `${guild.memberCount}`,
          inline: true,
        },
    )

    this.client.channels.cache.get('945345278754582578').send({ embeds: [embed] })
  }
}