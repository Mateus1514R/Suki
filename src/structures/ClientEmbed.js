const { MessageEmbed, User } = require('discord.js');

module.exports = class Embed extends MessageEmbed {
	constructor (user = User, data = {}) {
		super(data);
		this.setTimestamp();
		this.setColor('#7A0BC0');
		this.setFooter({ text: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) });
	}
};