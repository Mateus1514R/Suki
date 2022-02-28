/* eslint-disable no-mixed-spaces-and-tabs */
const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');
const { Embed, Util } = require('discord.js');

module.exports = class UserInfo extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'userinfo';
		this.category = 'Information';
		this.description = 'Veja as informações de um usuário.';
		this.aliases = ['ui'];
	}

	async execute ({ message, args, lang }) {
		let USER = await this.client.getUser(args[0], message);
		if (!args[0]) USER = message.author;

		const userI = message.guild.members.cache.get(USER.id);

		var nickname;
		if (userI.nickname == null) {
			nickname = `${lang.commands.userinfo.noNickname}`;
		}
		else {
			nickname = userI.nickname;
		}

		var boosted;
		if (userI.premiumSinceTimestamp == null) {
			boosted = `${lang.commands.userinfo.noBooster}`;
		}
		else {
			boosted = `<t:${Math.floor(userI.premiumSinceTimestamp / 1e3)}:d>`;
		}

		const joined = `<t:${Math.floor(userI.joinedAt / 1e3)}:d>`;
		const created = `<t:${Math.floor(
			this.client.users.cache.get(userI.id).createdAt / 1e3
		)}:d>`;

		const UserInfo = new Embed()
			.setAuthor({
				name: USER.tag,
				iconURL: USER.displayAvatarURL({ dynamic: true }),
			})
			.setTimestamp()
			.setColor(Util.resolveColor('Purple'))
			.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
			.addFields(
				{
					name: `${lang.commands.userinfo.embed.name1}`,
					value: `${e.User} | ${lang.commands.userinfo.embed.username}: **${USER.username}**\n${e.ID} | ID: **${USER.id}**\n${e.Time} | ${lang.commands.userinfo.embed.created}: **${created}**`,
					inline: true,
				},
				{
					name: `${lang.commands.userinfo.embed.infoserver}`,
					value: `${e.Info} | ${lang.commands.userinfo.embed.nickname}: **${nickname}**\n${e.World} | ${lang.commands.userinfo.embed.joined}: **${joined}**\n${e.Crystal} | Booster: **${boosted}**\n${e.Archive} | ${lang.commands.userinfo.embed.role}: **${userI.roles.highest}**`,
					inline: true,
				}
			)
			.setThumbnail(USER.avatarURL({ dynamic: true, size: 2048 }));

		message.reply({ embeds: [UserInfo] });
	}
};
