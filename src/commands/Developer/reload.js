const Command = require('../../structures/Command');
const path = require('path');

module.exports = class Reload extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'reload';
		this.category = 'Developer';
		this.description = 'Reinicie um comando.';
		this.aliases = ['rl'];
	}

	async execute ({ message, args }) {
		if(message.author.id !== '847865068657836033' && message.author.id !== '689265428769669155' && message.author.id !== '680943469228982357' ) {return;}

		if (!args[0]) {
			return message.reply(
				'Você precisa inserir o comando que deseja reiniciar.'
			);
		}

		const cmd =
        this.client.commands.get(args[0].toLowerCase()) ||
        this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()));

		const cmdFile = path.parse(
			`../../commands/${cmd.category}/${cmd.name}.js`
		);

		if (!cmdFile.ext || cmdFile.ext !== '.js') {
			return message.reply(
				'Desculpe, não encontrei o comando inserido.'
			);
		}

		const reload = async (commandPath, commandName) => {
			const props = new (require(`${commandPath}/${commandName}`))(
				this.client
			);
			delete require.cache[require.resolve(`${commandPath}/${commandName}`)];

			this.client.commands.set(props.name, props);
		};

		const response = reload(
			cmdFile.dir,
			`${cmdFile.name}${cmdFile.ext}`
		).catch((error) => {
			if (error) {
				return message.reply(
					`Ocorreu um erro: **${
						error.name
					}** ( \`${error.message}\` )`
				);
			}
		});

		if (response) {
			return message.reply(
				`O comando ${args[0]} foi reiniciado com sucesso!`
			);
		}

	}
};