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

		const user = await this.client.getUser(args[0], message);

		const authorDB = await this.client.userDB.findOne({ _id: message.author.id })

		const targetDB = await this.client.userDB.findOne({ _id: user.id })

		if(!user) return message.reply(`${e.Error} | ${message.author}, você precisa inserir o usuário que deseja fazer o pagamento.`)

		if (user.id == message.author.id) return message.reply(`${e.Error} | ${message.author}, você não pode enviar dinheiro para si mesmo.`);

		const value = parseInt(args[1])

		if (!args[1] || value < 0 || isNaN(value)) return message.reply(`${e.Error} | ${message.author}, você precisa inserir a quantia de dinheiro que deseja enviar ao usuário.`);

		if(!targetDB) return message.reply(`${e.Error} | ${message.author}, este usuário não está registrado em meu banco de dados, peça a ele para usar um comando primeiro.`)

		if (authorDB.value < value) return message.reply(`${e.Error} | ${message.author}, você não possui dinheiro suficiente para realizar o pagamento.`);

	 message.reply(`${e.Correct} | ${message.author}, pagamento de **${value.toLocaleString()} coins** feito com sucesso para \`${user.username}\`.`);

        await this.client.userDB.findOneAndUpdate({ _id: message.author.id },
			{
			  $set: {
				coins: authorDB.coins - value
			  }
			})
		  await this.client.userDB.findOneAndUpdate({ _id: user.id },
			{
			  $set: {
				coins: targetDB.coins + value
			  }
			})
	}
};
