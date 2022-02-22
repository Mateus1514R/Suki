const Command = require("../../structures/Command");

module.exports = class Test extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "test";
    this.category = "Developer";
    this.description = "testa codigo";
    this.aliases = ["t", "teste", "testar"];
  }

  async execute({ message, args }) {
      if(message.author.id !== '847865068657836033' && message.author.id !== '689265428769669155')
      return;

      const user = await this.client.getUser(args[0], message)

      console.log(user)
  }
}