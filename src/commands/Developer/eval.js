const Command = require('../../structures/Command');
const { inspect } = require('util');

module.exports = class Eval extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'eval';
		this.category = 'Developer';
		this.description = 'Executa código';
		this.aliases = ['ev', 'e'];
	}

	async execute ({ message, args }) {
		if(!this.client.developers.some(x => x === message.author.id)) {return;}

		if(!args[0]) {return;}

		const clean = (text) => {
			if (text === 'string') {
				text = text
					.replace(/`/g, `\`${String.fromCharCode(8203)}`)
					.replace(/@/g, `@${String.fromCharCode(8203)}`)
					.replace(new RegExp(process.env.TOKEN, 'gi'), '****');
			}
			return text;
		};

		try {
			const code = args.join(' ');
			let evaled = eval(code);

			if (evaled instanceof Promise) {evaled = await evaled;}

			message.reply(`Output \`\`\`js\n${clean(inspect(evaled, { depth: 0 }))}\n\`\`\``);

		}
		catch (error) {
			message.reply(`Error \`\`\`js\n${error}\n\`\`\``);
		}
	}
};