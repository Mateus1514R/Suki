const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class Ping extends Command {
    constructor(client) {
        super(client)
        this.client = client;

        this.name = "ping"
        this.category = "Info"
        this.description = "Veja o ping do BOT."
        this.aliases = ["pong", "🏓", ":ping_pong:"]
    }

    async execute({message, args}) {

        const embed = new MessageEmbed()
        .setAuthor({name: `${this.client.user.username} - Ping`, iconURL: this.client.user.avatarURL()})
        .setColor(`PURPLE`)
        .setTimestamp()
        .setFooter({text: `${message.author.tag}`, iconURL: message.author.iconURL({ dynamic: true })})
        .addFields([
            {
                name: `Conexões`,
                value: `Ping da API: **${this.client.ws.ping}**ms`
            }
        ])
        message.reply({embeds: [embed]})

    }
}