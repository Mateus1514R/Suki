const Command = require('../../structures/Command');
const glob = require('glob');
const e = require('../../utils/Emojis');

module.exports = class Reload extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'reload';
		this.category = 'Developer';
		this.description = 'Reinicie um comando.';
		this.aliases = ['rl'];
	}

	async execute ({ message }) {
		if(!this.client.developers.some(x => x === message.author.id)) {return;}

		this.client.commands.sweep(() => true);

		glob(`${__dirname}/../**/*js`, async (err, filePaths) => {
			if (err) return console.log(err);

			filePaths.forEach((file) => {

				delete require.cache[require.resolve(file)];

				const pull = require(file);
				if (pull.name) {
					this.client.commands.set(pull.name, pull);
				}
				if (pull.aliases && Array.isArray(pull.aliases)) {
					pull.aliases.forEach((alias) => {
						this.client.aliases.set(alias, pull.name);
					});
				}
			});
		});
		message.reply(`${e.Dev} | ${message.author}, comandos recarregados com sucesso.`);

	}
};