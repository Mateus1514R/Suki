const Command = require("../../structures/Command");
const e = require('../../utils/Emojis')

module.exports = class Ping extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "ping";
    this.category = "Information";
    this.description = "Veja o ping do BOT.";
    this.aliases = ["pong", "🏓", ":ping_pong:"];
  }

  async execute({ message, args }) {
    const startDB = process.hrtime();
    const user = await this.client.userDB.findOne({_id: message.author.id})
    const stopDB = process.hrtime(startDB);

    const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6)

    message.reply(`🏓 | ${message.author}, abaixo estão meus Ping's:\n${e.World} | API Ping: **${this.client.ws.ping}ms**\n${e.Database} | Database Ping: **${pingDB}ms**`);
  }
};
