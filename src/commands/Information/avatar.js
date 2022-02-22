const Command = require("../../structures/Command");
const e = require('../../utils/Emojis')
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = class Avatar extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "avatar";
    this.category = "Information";
    this.description = "Veja e baixe o avatar de um usuário";
    this.aliases = ["foto"];
  }

  async execute({ message, args }) {
    
    let user = await this.client.getUser(args[0], message)
    if(!user) user = message.author;

    const avatar = user.displayAvatarURL({ dynamic: true, size: 2048 });

    const embed = new this.client.embed(message.author)
      .setAuthor({name: user.username, iconURL: user.avatarURL({ dynamic: true })})
      .setDescription(`Clique no botão abaixo para baixar a imagem.`)
      .setImage(avatar)

      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setURL(`${avatar}`)
        .setLabel('Download')
        .setStyle('LINK')
      )

    message.reply({ embeds: [embed], components: [row] });
  }
};
