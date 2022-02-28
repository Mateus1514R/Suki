const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class Coins extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'coins';
		this.category = 'Economy';
		this.description = 'Veja quanto de dinheiro você possui.';
		this.aliases = ['atm'];
	}

	async execute ({ message, args, lang }) {

		let USER = await this.client.getUser(args[0], message);
		if(!USER) USER = message.author;

		const user = await this.client.userDB.findOne({ _id: USER.id });

		return message.reply(`${e.Crystal} | ${lang.commands.coins.money.replace('{user}', String(USER.tag)).replace('{value}', user.coins.toLocaleString())}`);

	}
};
