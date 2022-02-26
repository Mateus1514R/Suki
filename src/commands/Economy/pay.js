const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class Pay extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'pay';
		this.category = 'Economy';
		this.description = 'Envie dinheiro para um usuário.';
		this.aliases = ['doar', 'pagar', 'enviar'];
	}

	async execute ({ message, args, lang }) {

		const user = await this.client.getUser(args[0], message);

		const authorDB = await this.client.userDB.findOne({ _id: message.author.id });

		if(!user) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.pay.noMention}`);

		const targetDB = await this.client.userDB.findOne({ _id: user.id });

		if (user.id == message.author.id) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.pay.payYourSelf}!`);

		const value = parseInt(args[1]);

		if (!args[1] || value < 0 || isNaN(value)) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.pay.validValue}`);

		if(!targetDB) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.pay.neverUsed}!`);

		if (authorDB.value < value) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.pay.noDiamonds}!`);

	 message.reply(`${e.Correct} | ${message.author}, ${lang.commands.pay.payed.replace('{user}', String(user.username)).replace('{}', value.toLocaleString())}`);

		await this.client.userDB.findOneAndUpdate({ _id: message.author.id },
			{
			  $set: {
					coins: authorDB.coins - value
			  }
			});
		  await this.client.userDB.findOneAndUpdate({ _id: user.id },
			{
			  $set: {
					coins: targetDB.coins + value
			  }
			});
	}
};
