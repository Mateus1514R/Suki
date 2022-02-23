const Command = require('../../structures/Command');

module.exports = class Test extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'test';
		this.category = 'Developer';
		this.description = 'testa codigo';
		this.aliases = ['t', 'teste', 'testar'];
	}

	async execute ({ message, args }) {
		if(!this.client.developers.some(x => x === message.author.id)) {return;}

		const user = await this.client.getUser(args[0], message);

		console.log(user);
	}
};