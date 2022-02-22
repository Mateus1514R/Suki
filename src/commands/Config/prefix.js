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

	async execute ({ message, args }) {
		if(message.member.permissions.has('MANAGE_GUILD') && message.author.id !== '847865068657836033' && message.author.id !== '689265428769669155') {return message.reply(`${e.Error} | ${message.author}, você precisa da permissão \`Gerenciar Servidor\` para usar este comando.`);}

		const guildDBData = await this.client.guildDB.findOne({ guildID: message.guild.id });

		if(!args[0]) return message.reply(`${e.Right} | ${message.author}, para alterar meu prefixo em seu servidor, utilize **${guildDBData.prefix}prefix <Prefixo>**.`);

		if(args[0].length > 3) {
			return message.reply(`${e.Error} | ${message.author}, o prefixo deve ter no máximo **3** caracteres.`);
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

		message.reply(`${e.Correct} | ${message.author}, meu prefixo no servidor foi alterado para: **${args[0]}**`);

	}
};