const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class Daily extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'pay';
		this.category = 'Economy';
		this.description = 'Envie dinheiro para um usuário.';
		this.aliases = ['doar', 'pagar', 'enviar'];
	}

	async execute ({ message, args }) {

		const user = this.client.userDB.findOne({ _id: message.author.id });

		const USER = this.client.users.cache.get(args[0]) || message.mentions.users.first();
		if(!USER) return message.reply(`${e.Error} | ${message.author}, você precisa inserir o usuário que deseja fazer o pagamento.`);
		if(USER.id == message.author.id) return message.reply(`${e.Error} | ${message.author}, você não pode enviar dinheiro para si mesmo.`);

		const alvoDB = await this.client.userDB.findOne({ _id: USER.id });

		const money = parseInt(args[1]);
		if(!money) return message.reply(`${e.Error} | ${message.author}, você precisa inserir a quantia de dinheiro que deseja enviar ao usuário.`);
		if(isNaN(money)) return message.reply(`${e.Error} | ${message.author}, você precisa inserir uma quantia válida.`);
		if(money <= 0) return message.reply(`${e.Error} | ${message.author}, a quantia deve ser maior que 0.`);
		if(money > user.coins) return message.reply(`${e.Error} | ${message.author}, você não possui dinheiro suficiente para realizar o pagamento.`);

		if(alvoDB) {
			alvoDB.coins = alvoDB.coins + money;
			await alvoDB.save();
			user.coins = user.coins - money;
			await user.save();
		}
		else {
			await this.client.userDB.create({
				_id: USER.id,
				coins: money,
			});
			user.coins = user.coins - money;
			await user.save();
		}

		return message.reply(`${e.Correct} | ${message.author}, pagamento de **${money.toLocaleString()} coins** feito com sucesso para \`${USER.username}\`.`);

	}
};
