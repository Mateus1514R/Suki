module.exports = class messageCreate {
  constructor(client) {
    this.client = client;
  }

  async execute(message) {
    const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

    const server = await this.client.guildDB.findOne({ guildID: message.guild.id });

    var prefix = prefix;
    prefix = server.prefix;

    if (message.content.match(GetMention(this.client.user.id))) {
      message.reply(`Olá ${message.author}, meu prefixo é **${prefix}**`);
    }

    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));

    if(!cmd) return;

    cmd.execute({ message, args });
  }
};
