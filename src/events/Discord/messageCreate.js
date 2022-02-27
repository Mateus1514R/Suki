const moment = require('moment');

module.exports = class messageCreate {
	constructor (client) {
		this.client = client;
	}

	async execute (message) {
		if(!message.guild || message.author.bot) return;

		const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

		const server = await this.client.guildDB.findOne({ guildID: message.guild.id });

		var prefix = prefix;
		if(!server) {
			prefix = 's!';
		}
		else {
			prefix = server.prefix;
		}

		let lang = server.lang;
		switch(lang) {
			case 1:
				lang = this.client.langs.pt;
				break;
			case 0:
				lang = this.client.langs.en;
				break;
		  }

		if (message.content.match(GetMention(this.client.user.id))) {
			message.reply(String(lang.events.messageCreate.mention).replaceAll('{}', prefix).replace('$', message.author));
		}

		if (message.content.indexOf(prefix) !== 0) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();
		const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));

		if(!cmd) return;

		if(command) {
			const embedError = new this.client.embed(message.author)
			    .setAuthor({ name: `${this.client.user.username} | Logs`, iconURL: this.client.user.displayAvatarURL({ dynamic: true }) })
				.setDescription(`Comando **${cmd.name}** executado no servidor **${message.guild.name}** (\`${message.guild.id}\`)`)
				.addFields(
					{
						name: 'Args',
						value: `\`${args.join(' ')}\``
					},
					{
						name: 'Usuário',
						value: `**${message.author.tag}** (\`${message.author.id}\`)`
					},
					{
						name: 'Data',
						value: `**${moment(Date.now()).format('L LT')}**`
					},
				);
			this.client.sendLogs(embedError);

			try {
				await cmd.execute({ message, args, lang });
			}
			catch (err) {
				const erro = new this.client.embed(message.author)
					.setTitle(`${lang.events.messageCreate.embed.title}`)
					.setDescription(`${lang.events.messageCreate.embed.description}`);
				await message.reply({ embeds: [erro] });
				console.log(err);
			}
			const user = await this.client.userDB.findOne({ _id: message.author.id });
			if(!user) await this.client.userDB.create({ _id: message.author.id });
		}
	}
};
