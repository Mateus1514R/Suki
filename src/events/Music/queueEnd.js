const ClientEmbed = require("../../structures/ClientEmbed")

module.exports = class {
    constructor(client) {
      this.client = client;
    }
  
    async run(player) {
      const channel = this.client.channels.cache.get(player.textChannelId);
  
      const Embed = new ClientEmbed(this.client.user)
        .setDescription(
          `A fila de músicas acabou e eu saí do canal !`
        )
  
      player.destroy();
      await channel.send({ embeds: [Embed] });
    }
  };