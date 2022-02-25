const { MessageEmbed, Guild } = require('discord.js');
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
		});

		const embed = new MessageEmbed()
			.setAuthor({
				name: `${this.client.user.username} - Adicionado`,
				iconURL: this.client.user.avatarURL(),
			})
			.setColor('#7A0BC0')
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

		const channel = this.client.channels.cache.get(`${env.servers_log}`);

		channel.send({ embeds: [embed] });
	}
};
