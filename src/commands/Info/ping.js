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
        .setAuthor(`${this.client.user.username} - Ping`, this.client.user.avatarURL())
        .setColor(`PURPLE`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`)
        .addFields([
            {
                name: `Conexões`,
                value: `Ping da API: **${this.client.ws.ping}**ms`
            }
        ])
        message.reply({embeds: [embed]})

    }
}