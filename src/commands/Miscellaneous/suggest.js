const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class Suggest extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'suggest';
		this.category = 'Miscellaneous';
		this.description = 'Envie uma sugestão para o Bot.';
		this.aliases = ['sugerir', 'sugestão'];
	}

	async execute ({ message, args }) {

		const suggest = args.slice(0).join(' ');
		if(!suggest) return message.reply(`${e.Error} | ${message.author}, você precisa inserir a sugestão que deseja enviar.`);

		const channel = this.client.channels.cache.get('946386176871383120');
		const embed = new this.client.embed(message.author)
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
			.addFields([
				{
					name: `${e.User} | Autor:`,
					value: `> **Tag:** ${message.author.tag}\n> **ID:** ${message.author.id}`
				},
				{
					name: `${e.Chat} Sugestão:`,
					value: `> ${suggest}`
				}
			]);
		const msg = await channel.send({ embeds: [embed] });
		await msg.react(e.Confirm);
		await msg.react(e.Error);
		await message.reply(`${e.Confirm} | ${message.author}, sugestão enviada com sucesso, agradecemos a colaboração!`);

	}
};
