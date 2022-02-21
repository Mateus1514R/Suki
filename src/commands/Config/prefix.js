const Command = require("../../structures/Command");

module.exports = class Prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "prefix";
    this.category = "Config";
    this.description = "Muda o prefixo do bot";
    this.aliases = ["setprefix", "prefixo"];
  }

  async execute({ message, args }) {
      if(message.member.permissions.has('MANAGE_GUILD') && message.author.id !== '847865068657836033' && message.author.id !== '689265428769669155')
      return message.reply('Você precisa da permissão `Gerenciar Servidor` para usar este comando.')

      if(!args[0]) return message.reply(`Digite o novo prefixo do bot.`)

      if(args.length > 5) {
          message.reply('O prefixo não pode ultrapassar 5 caracteres.')
      }

      const guildDBData = await this.client.guildDB.findOne({guildID: message.guild.id })

      if (guildDBData) {
        guildDBData.prefix = args[0];
        await guildDBData.save();
      } else {
        await this.client.guildDB.create({
          guildID: message.guild.id,
          prefix: args[0]
        });
      }

      message.reply(`Prefixo alterado com sucesso para \`${args[0]}\``);

  }
}