/* eslint-disable no-unused-vars */
const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const e = require('../../utils/Emojis');

module.exports = class Ping extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'ping';
		this.category = 'Information';
		this.description = 'Veja o ping do BOT.';
		this.aliases = ['pong', '🏓', ':ping_pong:'];
	}

	async execute ({ message }) {
		const startDB = process.hrtime();
		await this.client.userDB.findOne({ idU: message.author.id });
		const stopDB = process.hrtime(startDB);

		const startLL = process.hrtime();
		await fetch('http://lavalinkeua.herokuapp.com/version', {
			headers: { Authorization: `${process.env.LAVALINKPASSWORD}` }
		});
		const stopLL = process.hrtime(startLL);

		const lavalinkPing = Math.round((stopLL[0] * 1e9 + stopLL[1]) / 1e6);
		const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6);

		message.reply(`🏓 | ${message.author}, abaixo estão meus Ping's:\n${e.World} | API Ping: **${this.client.ws.ping}ms**\n${e.Database} | Database Ping: **${pingDB}ms**\n${e.Lava} | Lavalink Ping: **${lavalinkPing}ms**`);
	}
};
