const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(player, track) {
    const channel = this.client.channels.cache.get(player.textChannelId);

    if (player.lastPlayingMsgID) {
      const msg = channel.messages.cache.get(player.lastPlayingMsgID);

      if (msg) msg.delete();
    }

    const Embed = new ClientEmbed(track.requester).setDescription(
      `[${track.title}](${track.uri}) - [<@${track.requester.id}>]`
    );

    player.lastPlayingMsgID = await channel
      .send({ embeds: [Embed] })
      .then((x) => x.id);
  }
};
