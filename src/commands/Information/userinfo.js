/* eslint-disable no-mixed-spaces-and-tabs */
const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');

module.exports = class UserInfo extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'userinfo';
		this.category = 'Information';
		this.description = 'Veja as informações de um usuário.';
		this.aliases = ['ui'];
	}

	async execute ({ message, args }) {
		let USER = await this.client.getUser(args[0], message);
		if (!args[0]) USER = message.author;

		const userI = message.guild.members.cache.get(USER.id);

		var nickname;
		if (userI.nickname == null) {nickname = 'Sem nickname.';}
		else {nickname = userI.nickname;}

		var boosted;
		if (userI.premiumSinceTimestamp == null) {boosted = 'Não é boost.';}
		else {boosted = `<t:${Math.floor(userI.premiumSinceTimestamp / 1e3)}:d>`;}

		const joined = `<t:${Math.floor(userI.joinedAt / 1e3)}:d>`;
		const created = `<t:${Math.floor(
			this.client.users.cache.get(userI.id).createdAt / 1e3
		)}:d>`;

		const UserInfo = new this.client.embed(message.author)
			.setAuthor({ name: USER.tag, iconURL: USER.displayAvatarURL({ dynamic: true }) })
			.addFields(
				{
					name: 'Informações Pessoais',
					value: `${e.User} | Nome de Usuário: **${USER.username}**\n${e.ID} | ID: **${USER.id}**\n${e.Time} | Conta criada: **${created}**`,
					inline: true
				},
				{
					name: 'Informações no Servidor',
					value: `${e.Info} | Apelido: **${nickname}**\n${e.World} | Entrou em: **${joined}**\n${e.Archive} | Maior Cargo: **${userI.roles.highest}**\n${e.Crystal} | Booster: **${boosted}**`,
					inline: true
				}
			)
			.setThumbnail(USER.avatarURL({ dynamic: true, size: 2048 }));

		message.reply({ embeds: [UserInfo] });
	}
};
