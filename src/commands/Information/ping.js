const Command = require('../../structures/Command')

module.exports = class Ping extends Command {
    constructor(client) {
        super(client)
        this.client = client;

        this.name = "ping"
        this.category = "Information"
        this.description = "Veja o ping do BOT."
        this.aliases = ["pong", "🏓", ":ping_pong:"]
    }

    async execute({message, args}) {

        const embed = new this.client.embed(message.author)
        .setAuthor({name: `${this.client.user.username} - Ping`, iconURL: this.client.user.avatarURL()})
        .setColor(`PURPLE`)
        .addFields([
            {
                name: `Conexões`,
                value: `Ping da API: **${this.client.ws.ping}**ms`
            }
        ])

        message.reply({embeds: [embed]})
    }
}