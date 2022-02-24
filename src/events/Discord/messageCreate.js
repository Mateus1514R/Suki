const moment = require('moment');


module.exports = class messageCreate {
	constructor (client) {
		this.client = client;
	}

	async execute (message) {
		const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

		const server = await this.client.guildDB.findOne({ guildID: message.guild.id });

		var prefix = prefix;
		if(!server) {
			prefix = 's!';
		}
		else {
			prefix = server.prefix;
		}

		if (message.content.match(GetMention(this.client.user.id))) {
			message.reply(`Olá ${message.author}, Eu sou a **Suki**. Meu prefixo aqui é **${prefix}**. Caso precise de ajuda, utilize o comando **${prefix}help**!`);
		}

		if (message.content.indexOf(prefix) !== 0) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();
		const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));

		if(!cmd) return;

		if(command) {
			this.client.sendLogs(`\`---\`\nData: **${moment(Date.now()).format('L LT')}**\nComando **${cmd.name}** executado no servidor **${message.guild.name}** (\`${message.guild.id}\`)\nArgs: **${args.join(' ')}**\nUsuário: **${message.author.tag}** (\`${message.author.id}\`)\n\`---\``);

			try {
				cmd.execute({ message, args });
			}
			catch (err) {
				const erro = new this.client.embed(message.author)
					.setTitle('❌ Ocorreu um Erro!')
					.setDescription('Desculpe, um erro foi encontrado e o comando não foi executado corretamente. Peço que reporte o Bug aos meus desenvolvedores e aguarde o mesmo ser resolvido.]nObrigado.');
				await message.reply({ embeds: [erro] });
				console.log(err);
			}
			const user = await this.client.userDB.findOne({ _id: message.author.id });
			if(!user) await this.client.userDB.create({ _id: message.author.id });
		}
	}
};
