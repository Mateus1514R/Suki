const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class Prefix extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'prefix';
		this.category = 'Config';
		this.description = 'Altere o prefixo do BOT em seu servidor.';
		this.aliases = ['setprefix', 'prefixo'];
	}

	async execute ({ message, args, lang }) {
		if (!message.member.permissions.has('MANAGE_GUILD') && !this.client.developers.some(x => x === message.author.id)) {
			return message.reply(`${e.Error} | ${message.author}, ${lang.commands.prefix.noPerm}`);
		}

		const guildDBData = await this.client.guildDB.findOne({ guildID: message.guild.id });

		if(!args[0]) return message.reply(`${e.Right} | ${message.author}, ${lang.commands.prefix.noArgs}`.replaceAll('{}', guildDBData.prefix));

		if(args[0].length > 3) {
			return message.reply(`${e.Error} | ${message.author}, ${lang.commands.prefix.threeLength}`);
		}

		if (guildDBData) {
			guildDBData.prefix = args[0];
			await guildDBData.save();
		}
		else {
			await this.client.guildDB.create({
				guildID: message.guild.id,
				prefix: args[0]
			});
		}

		message.reply(`${e.Correct} | ${message.author}, ${lang.commands.prefix.seted}`.replaceAll('{}', args[0]));

	}
};