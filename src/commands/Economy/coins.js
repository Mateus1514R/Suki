const Command = require("../../structures/Command");
const e = require('../../utils/Emojis')
const moment = require("moment");
require("moment-duration-format");

module.exports = class Coins extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "coins";
    this.category = "Information";
    this.description = "Veja quanto de dinheiro você possui.";
    this.aliases = ["atm"];
  }

  async execute({ message, args }) {
    
    let USER = await this.client.getUser(args[0], message)
    if(!USER) USER = message.author

    const user = this.client.userDB.findOne({_id: USER.id})

    return message.reply(`${e.Crystal} | ${message.author}, você possui **${user.coins}** coins.`)

  }
};
