const { MessageEmbed, Guild } = require('discord.js')

module.exports = class guildDelete {
  constructor(client) {
    this.client = client;
  }

  async execute(guild = Guild) {
    this.client.guildDB.findOneAndDelete({ guildID: guild.id });

    const embed = new MessageEmbed()
    .setTitle('Fui removido de um servidor')
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