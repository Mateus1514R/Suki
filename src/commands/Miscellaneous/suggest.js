const { Embed, Util } = require('discord.js');
const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

const yaml = require('js-yaml');
const { readFileSync } = require('fs');

const env = yaml.load(readFileSync('./envirovments.yml', 'utf8'));

module.exports = class Suggest extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'suggest';
		this.category = 'Miscellaneous';
		this.description = 'Envie uma sugestão para o Bot.';
		this.aliases = ['sugerir', 'sugestão'];
	}

	async execute ({ message, args, lang }) {

		const suggest = args.slice(0).join(' ');
		if(!suggest) return message.reply(`${e.Error} | ${message.author}, ${lang.commands.suggest.noArgs}`);

		const channel = this.client.channels.cache.get(env.suggest_channel);

		message.reply(`${e.Correct} | ${message.author}, ${lang.commands.suggest.send}`);
		const embed = new Embed()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
			.setTimestamp()
			.setColor(Util.resolveColor('Purple'))
			.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
			.addFields(
				{
					name: `${e.User} | Autor:`,
					value: `> **Tag:** ${message.author.tag}\n> **ID:** ${message.author.id}`
				},
				{
					name: `${e.Chat} Sugestão:`,
					value: `> ${suggest}`
				}
			);
		const msg = await channel.send({ embeds: [embed] });
		await msg.react(`${e.Correct}`);
		await msg.react(`${e.Error}`);
	}
};
