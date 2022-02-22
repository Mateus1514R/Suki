const Command = require("../../structures/Command");
const e = require("../../utils/Emojis");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = class Welcome extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "welcome";
    this.category = "Config";
    this.description = "Configure as logs de entrada do servidor.";
    this.aliases = ["setentrada"];
  }

  async execute({ message, args }) {
    if (
      message.member.permissions.has("MANAGE_GUILD") &&
      message.author.id !== "847865068657836033" &&
      message.author.id !== "689265428769669155"
    )
      return message.reply(
        `${e.Error} | ${message.author}, você precisa da permissão \`Gerenciar Servidor\` para usar este comando.`
      );

    if (!args[0]) {
      const guildDBData = await this.client.guildDB.findOne({
        guildID: message.guild.id,
      });

      const embed = new this.client.embed(message.author)
        .setAuthor({
          name: message.guild.name,
          iconURL: message.guild.iconURL({ dynamic: true }),
        })
        .setDescription(`🚪 | Sistema de Logs de Entrada:`)
        .addFields([
          {
            name: `Sistema:`,
            value: `> ${e.On} | Status: **${
              guildDBData.welcome.status == false ? "Desligado" : "Ligado"
            }**\n> ${e.World} | Chat: **${
              guildDBData.welcome.channel == "null"
                ? "Sem canal definido."
                : guildDBData.welcome.channel
            }**\n> ${e.Chat} | Mensagem: \`\`\` ${
              guildDBData.welcome.message == "null"
                ? "# Nenhuma mensagem definida."
                : guildDBData.welcome.message
            }\`\`\``,
          },
        ]);

      let row = new MessageActionRow();

      const left = new MessageButton()
        .setCustomId("left")
        .setLabel("")
        .setEmoji(e.Left)
        .setStyle("SECONDARY")
        .setDisabled(true)

      const right = new MessageButton()
        .setCustomId("right")
        .setLabel("")
        .setEmoji(e.Right)
        .setStyle("SECONDARY");

      row.addComponents([left, right]);

      var msg = await message.reply({ embeds: [embed], components: [row] });

      const filter = (interaction) => {
        return interaction.isButton() && interaction.message.id === msg.id;
      };

      const collector = msg
        .createMessageComponentCollector({
          filter: filter,
          time: 60000,
        })

        .on("end", async (r, reason) => {
          if (reason != "time") return;

          right.setDisabled(true);
          left.setDisabled(true);
        })

        .on("collect", async (r) => {
          switch (r.customId) {
            case "right":
              const info = new this.client.embed(message.author)
                .setAuthor({
                  name: message.guild.name,
                  iconURL: message.guild.iconURL({ dynamic: true }),
                })
                .setDescription(`🚪 | Sistema de Logs de Entrada:`)
                .addFields([
                  {
                    name: `Placeholders:`,
                    value: `> **[user]** - Menciona o usuário\n> **[name]** - Mostra o nome do usuário\n> **[guild]** - Mostra o nome do servidor\n> **[total]** - Mostra a quantia atual de membros.`,
                  },
                  {
                    name: `Comandos:`,
                    value: `> **welcome set <chat>** - Defina o canal de Entrada.\n> **welcome msg <msg>** - Defina a mensagem de boas-vindas.\n> **welcome status** - Ativa ou desativa o sistema.`,
                  },
                ]);

              right.setDisabled(true);
              left.setDisabled(false);
              await r.deferUpdate()
              await msg.edit({ embeds: [info] });

            case "left":
              const embed = new this.client.embed(message.author)
                .setAuthor({
                  name: message.guild.name,
                  iconURL: message.guild.iconURL({ dynamic: true }),
                })
                .setDescription(`🚪 | Sistema de Logs de Entrada:`)
                .addFields([
                  {
                    name: `Sistema:`,
                    value: `> ${e.On} | Status: **${
                      guildDBData.welcome.status == false
                        ? "Desligado"
                        : "Ligado"
                    }**\n> ${e.World} | Chat: **${
                      guildDBData.welcome.channel == "null"
                        ? "Sem canal definido."
                        : guildDBData.welcome.channel
                    }**\n> ${e.Chat} | Mensagem: \`\`\` ${
                      guildDBData.welcome.message == "null"
                        ? "# Nenhuma mensagem definida."
                        : guildDBData.welcome.message
                    }\`\`\``,
                  },
                ]);

              right.setDisabled(false);
              left.setDisabled(true);
              await r.deferUpdate()
              await msg.edit({ embeds: [embed] });
          }
        });
    }

    /*if (guildDBData) {
      guildDBData.prefix = args[0];
      await guildDBData.save();
    } else {
      await this.client.guildDB.create({
        guildID: message.guild.id,
        prefix: args[0],
      });
    }*/
  }
};
