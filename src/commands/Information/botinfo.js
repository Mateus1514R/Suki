const Command = require("../../structures/Command");
const { MessageEmbed } = require("discord.js");
const e = require('../../utils/Emojis')

module.exports = class BotInfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "botinfo";
    this.category = "Information";
    this.description = "Veja as informações do BOT.";
    this.aliases = ["bi"];
  }

  async execute({ message, args }) {
    const users = this.client.guilds.cache
      .map((g) => g.memberCount)
      .reduce((a, g) => a + g)
      .toLocaleString();
    const servers = this.client.guilds.cache.size;
    const commands = this.client.commands.size;
    const memory =
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB";
    const ping = Math.ceil(this.client.ws.ping) + "MS";
    const version = process.version;

    const startDB = process.hrtime();
    const user = await this.client.userDB.findOne({ _id: message.author.id });
    const server = await this.client.guildDB.findOne({guildID: message.guild.id })
    const stopDB = process.hrtime(startDB);
    const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6) + "ms";

    const embed = new MessageEmbed()
      .setAuthor({
        name: `${this.client.user.username}`,
        iconURL: this.client.user.avatarURL({ size: 2048 }),
      })
      .addFields([
        {
          name: `Informações Básicas:`,
          value: `${e.Owner} Donos: **[Vxk](https://github.com/VCScript)** | **[Niskii](https://github.com/Niskii3)**\nPrefixo: **${server.prefix}**\nUsuários: **${users}**\nServidores: **${servers}**`,
        },
      ])
      .setColor("#7A0BC0")
      .setTimestamp()
      .setFooter({
        text: `${message.author.tag}`,
        iconURL: message.author.avatarURL({ dynamic: true, size: 2048 }),
      });

    message.reply({ embeds: [embed] });
  }
};
