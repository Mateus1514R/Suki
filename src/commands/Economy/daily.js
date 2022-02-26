const Command = require('../../structures/Command');
const e = require('../../utils/Emojis');
const moment = require('moment');
require('moment-duration-format');

module.exports = class Daily extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'daily';
		this.category = 'Economy';
		this.description = 'Ganhe seu dinheiro diário.';
		this.aliases = ['diario'];
	}

	async execute ({ message, lang }) {
		const userDBData = await this.client.userDB.findOne({
			_id: message.author.id,
		});

		let cooldown = 8.64e7;
		let coins = Math.floor(Math.random() * 3000);
		let daily = userDBData.daily;
		let time = cooldown - (Date.now() - daily);

		if (daily !== null && cooldown - (Date.now() - daily) > 0) {
			return message.reply(
				`${e.Error} | ${message.author}, ${lang.commands.daily.cooldown} \`${this.formatTime(this.convertMilliseconds(Date.now() - time))}\``);
		}
		else {
			message.reply(
				`${e.Correct} | ${
					message.author
				}, ${lang.commands.daily.won.replace('{amount}', coins.toLocaleString())}!*`
			);

			if (userDBData) {
				userDBData.daily = Date.now();
				userDBData.coins = userDBData.coins + coins;
				await userDBData.save();
			}
			else {
				await this.client.userDBData.create({
					_id: message.author.id,
					daily: Date.now(),
					coins: coins
				});
			}
		}
	}

	formatTime (time) {
		if (!time) return;
		return moment.duration(time).format('d[d] h[h] m[m] s[s]');
	  }

	 convertMilliseconds (ms) {
		const seconds = ~~(ms / 1000);
		const minutes = ~~(seconds / 60);
		const hours = ~~(minutes / 60);
		const days = ~~(hours / 24);

		return {
		  days,
		  hours: hours % 24,
		  minutes: minutes % 60,
		  seconds: seconds % 60,
		};
	  }
};
