const Command = require('../../structures/Command');

module.exports = class Test extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'test';
		this.category = 'Developer';
		this.description = 'testa codigo';
		this.aliases = ['t', 'teste', 'testar'];
		this.staffOnly = true;
	}

	async execute ({ message, args }) {

		const user = await this.client.getUser(args[0], message);

		console.log(user);
	}
};