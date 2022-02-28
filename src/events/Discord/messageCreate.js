const moment = require('moment');
const { Collection } = require('discord.js');
const e = require('../../utils/Emojis');

module.exports = class messageCreate {
	constructor (client) {
		this.client = client;
	}

	async execute (message) {
		const { cooldowns } = this.client;
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

	  if (!cmd) return;

	  if (!cooldowns.has(cmd)) cooldowns.set(cmd, new Collection());

	  const now = Date.now();
	  const timestamps = cooldowns.get(cmd);
	  const cooldownAmount = (cmd.cooldown || 3) * 1000;

	  if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
		  const timeLeft = (expirationTime - now) / 1000;
		  return message.reply({ content: `${e.Error} ${String(lang.events.messageCreate.cooldown).replace('{}', timeLeft.toFixed(1)) }` });
			}
	  }
	  timestamps.set(message.author.id, now);

	  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

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
