const { Embed, Guild, Util } = require('discord.js');
const e = require('../../utils/Emojis');

const yaml = require('js-yaml');
const { readFileSync } = require('fs');

const env = yaml.load(readFileSync('./envirovments.yml', 'utf8'));

module.exports = class guildCreate {
	constructor (client) {
		this.client = client;
	}

	async execute (guild = Guild) {
		this.client.guildDB.create({
			guildID: guild.id,
			prefix: 's!',
			welcome: {
				channel: '',
				message: '',
				status: false,
			},
			lang: 0
		});

		const embed = new Embed()
			.setAuthor({
				name: `${this.client.user.username} - Adicionado`,
				iconURL: this.client.user.avatarURL(),
			})
			.setColor(Util.resolveColor('Purple'))
			.setTimestamp()
			.addFields(
				{
					name: `${e.Cloud} Nome:`,
					value: `> ${guild.name}`,
				},
				{
					name: `${e.ID} ID do Servidor`,
					value: `> ${guild.id}`,
				},
				{
					name: `${e.User} Total de Usuários`,
					value: `> ${guild.memberCount}`,
				}
			);

		const channel = this.client.channels.cache.get(env.servers_log);

		channel.send({ embeds: [embed] });
	}
};
