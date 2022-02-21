const { MessageSelectMenu, MessageActionRow, MessageEmbed } = require("discord.js");

const Command = require("../../structures/Command");

module.exports = class Help extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "help";
    this.category = "Information";
    this.description = "Veja todas as minhas funcionalidades.";
    this.aliases = ["ajuda"];
  }

  async execute({ message, args }) {
      const { commands } = this.client;

      const block = [];
      block.push("Developer");

      const list = commands
        .map((x) => x.category)
        .filter((x, f, y) => y.indexOf(x) === f)
        .filter((c) => !block.includes(c));

      const menuOptions = [];

      for (let value of list) {
        menuOptions.push({
          value: value,
          description: `Comandos da categoria **${value}**.`,
          commandList: commands
            .filter((x) => x.category === value)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((f) => `・${f.name}`)
            .join("\n"),
        });
      }

      const AJUDA = new this.client.embed(message.author)
        .setAuthor({
          name: `${this.client.user.username} - Central de Ajuda`,
          iconURL: this.client.user.displayAvatarURL({ size: 2048 })
        })
        .setColor("PURPLE")

      if (!args[0]) return await this.menu({ menuOptions, message });

        const name = args[0].toLowerCase();
        const command =
          commands.get(name) ||
          commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));

        if (!command) {
          return message.reply(
            `Desculpe, não encontrei este comando.`
          );
        }

      AJUDA.addFields({
        name: `Informações do Comando:`,
        value: `> Nome do Comando: **${command.name}**\n> Aliases: **${
          !command.aliases.length
            ? "Este comando não tem aliases."
            : command.aliases.join(", ")
        }**\n> Descrição: **${
          !command.description.length
            ? "Este comando não tem descrição."
            : command.description
        }**`,
      });

      await message.reply({ embeds: [AJUDA] });
  }

  async menu({ menuOptions, message, }) {
      const row = new MessageActionRow();

      const menu = new MessageSelectMenu()
        .setCustomId("MenuSelection")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder(`Selecione a categoria.`);

      menuOptions.forEach((option) => {
        switch (option.value) {
          case "Config": {
            menu.addOptions({
              label: option.label ? option.label : option.value,
              description:
                "Comandos relacionados a configuração do bot na guilda.",
              value: option.value,
              emoji: `🔧`,
            });
            break;
          }
          case "Economy": {
            menu.addOptions({
              label: option.label ? option.label : option.value,
              description: "Comandos para utilizar a economia do bot.",
              value: option.value,
              emoji: ``,
            });
            break;
          }
          case "Information": {
            menu.addOptions({
              label: option.label ? option.label : option.value,
              description: "Comandos de algumas uteis informações diversas.",
              value: option.value,
              emoji: `📚`,
            });
            break;
          }
          case "Miscellaneous": {
            menu.addOptions({
              label: option.label ? option.label : option.value,
              description: "Comandos sem categoria definida.",
              value: option.value,
              emoji: ``,
            });
            break;
          }
          case "Moderation": {
            menu.addOptions({
              label: option.label ? option.label : option.value,
              description: "Comandos para moderadores do servidor.",
              value: option.value,
              emoji: ``,
            });
            break;
          }
          case "Music": {
            menu.addOptions({
              label: option.label ? option.label : option.value,
              description: "Comandos para escutar música utilizando o bot.",
              value: option.value,
              emoji: ``,
            });
            break;
          }
        }
      });

      const EMBED = new this.client.embed(message.author)

      .setAuthor({
        name: `${this.client.user.username} - Central de Ajuda`,
        iconURL: this.client.user.displayAvatarURL({ size: 2048 })
      })
      .setColor("PURPLE")
      .setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true, size: 2048})})
        .setDescription(
          `Seja bem vindo a minha central de ajuda.`
        )

      row.addComponents(menu);

      const msg = await message.reply({
        embeds: [EMBED],
        components: [row],
      });

      const filter = (interaction) => {
        return interaction.isSelectMenu() && interaction.message.id === msg.id;
      };

      const collector = message.channel.createMessageComponentCollector({
        time: 180000,
        filter: filter,
      });

      collector.on("collect", async (r) => {
        if (r.user.id !== message.author.id)
          return r.reply({
            content: `Desculpe, você precisa executar o comando para isso.`,
            ephemeral: true,
          });

        const menuOptionData = menuOptions.find((v) => v.value === r.values[0]);

        EMBED.setDescription(
          `Você está **vendo** os **comandos** da categoria **\`${menuOptionData.value}\`**`
        );
        EMBED.fields = [];
        EMBED.addField(
          `Comandos:`,
          menuOptionData.commandList
        );

        await msg.edit({ embeds: [EMBED] }, true);
        await r.deferUpdate();
      });

      collector.on("end", async (r, reason) => {
        if (reason != "time") return;
        msg.delete();
      });
  }
};
