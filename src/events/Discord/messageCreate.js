/* eslint-disable no-undef */
const { Embed, Util, Collection } = require('discord.js');
const moment = require('moment');
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

		let lang = server.lang || 0;

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
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));

	  if (!cmd) return;

	  if(message.guild) {
		  let needPermissions = [];

		  cmd.botPermissions.forEach((perm) => {
			  if(['SPEAK', 'CONNECT'].includes(perm)) {
				  if(!message.member.voice.channel) return;
				  if (!message.member.voice.channel.permissionsFor(message.guild.me).has(perm)) {
					  needPermissions.push(perm);
				  }
				}
				else if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
					needPermissions.push(perm);
				}
		  });

		  if (needPermissions.length > 0) {
				const needPerm = [];

				for(let perms of needPermissions) {
				  if(!message.member.permissions.has(perms)) {
					  needPerm.push(perms);
				  }
			 }
				return message.reply(`${e.Error} ${lang.events.messageCreate.noBotPerm}`.replace('{}', needPerm.join(', ')));
			}

			let neededPermissions = [];
			cmd.userPermissions.forEach((perm) => {
				if (!message.channel.permissionsFor(message.member).has(perm)) {
					neededPermissions.push(perm);
				}
			});

			if (neededPermissions.length > 0) {
				const neededPerm = [];

				for(let perms of neededPermissions) {
					  if(!message.member.permissions.has(perms)) {
						  neededPerm.push(perms);
					  }
				 }
				return message.reply(`${e.Error} ${lang.events.messageCreate.noUserPerm}`.replace('{}', neededPerm.join(', ')));
			}
	  }

	  if (cmd.staffOnly && !this.client.developers.some(x => x === message.author.id)) {
			return;
		}

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
			const embedError = new Embed()
			    .setAuthor({ name: `${this.client.user.username} | Logs`, iconURL: this.client.user.displayAvatarURL({ dynamic: true }) })
				.setTimestamp()
				.setColor(Util.resolveColor('Purple'))
				.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
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
				const erro = new Embed()
					.setTitle(`${lang.events.messageCreate.embed.title}`)
					.setDescription(`${lang.events.messageCreate.embed.description}`)
					.setTimestamp()
					.setColor(Util.resolveColor('Purple'))
					.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
				await message.reply({ embeds: [erro] });
				console.log(err);
			}
			const user = await this.client.userDB.findOne({ _id: message.author.id });
			if(!user) await this.client.userDB.create({ _id: message.author.id });
		}
	}
};
