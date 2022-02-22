const Command = require("../../structures/Command");
const e = require('../../utils/Emojis')
const moment = require("moment");
require("moment-duration-format");

module.exports = class Daily extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "daily";
    this.category = "Information";
    this.description = "Ganhe seu dinheiro diário.";
    this.aliases = ["diario"];
  }

  async execute({ message, args }) {
    const user = this.client.userDB.findOne({_id: message.author.id})

    let cooldown = 8.64e7;
    let coins = Math.floor(Math.random() * 3000);
    let daily = user.daily;
    let atual = user.coins;
    let time = cooldown - (Date.now() - daily);

    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
        return message.reply(
            `${e.Error} | ${message.author}, aguarde **${moment
              .duration(time)
              .format(
                "h[h] m[m] e s[s]"
              )}** até pegar o prêmio diário novamente.`
          );
    } else {
        message.reply(
          `${e.Correct} | ${message.author}, você resgatou seu prêmio diário e conseguiu **${coins.toLocaleString()}** coins.`
        );
  
        user.coins = coins + atual;
        user.daily = Date.now()
        await user.save();
      }

  }
};
