/* eslint-disable no-useless-return */
/* eslint-disable no-return-await */
const { Client, Collection, WebhookClient } = require('discord.js');
const { promisify } = require('util');
const klaw = require('klaw');
const path = require('path');

const guildDB = require('../models/guildDB');
const userDB = require('../models/userDB');
const botDB = require('../models/botDB');
const Embed = require('../structures/ClientEmbed');

const readdir = promisify(require('fs').readdir);

module.exports = class SukiClient extends Client {
	constructor (options) {
		super(options);
		this.commands = new Collection();
		this.aliases = new Collection();
		this.guildDB = guildDB;
		this.userDB = userDB;
		this.botDB = botDB;

		this.embed = Embed;
		this.getUser = this.findUser;
		this.sendLogs = this.commandLogs;
	}

	load (commandPath, commandName) {
		const props = new (require(`${commandPath}/${commandName}`))(this);
		props.location = commandPath;

		if (props.init) {
			props.init(this);
		}

		this.commands.set(props.name, props);
		props.aliases.forEach((aliases) => {
			this.aliases.set(aliases, props.name);
		});
		return false;
	}

	async findUser (args, message) {
		if (!args) return message.author;
		if (args.startsWith('<@') && args.endsWith('>')) {
			let mention = args;
			mention = mention.slice(2, -1);

			if (mention.startsWith('!')) {
				mention = mention.slice(1);
			}

			return await message.client.users.fetch(mention);
		}
		else {
			let user;
			try {
				user = await message.guild.members
					.search({ query: args })
					.then(async (x) => await message.client.users.fetch(x.first().user.id));
			}
			catch {
				let user2;
				try {
					user2 = await this.client.users.fetch(args);
				}
				catch {
					return;
				}
				return user2;
			}
			return user;
		}
	};

	async commandLogs (content) {
		const webhookClient = new WebhookClient({
		  token: process.env.LOGS_TOKEN,
		  id: process.env.LOGS_ID
		});
		webhookClient.send({
		  content: String(content)
		});
	  }

	async onLoad (client) {
		klaw('src/commands').on('data', (item) => {
			const cmdFile = path.parse(item.path);
			if (!cmdFile.ext || cmdFile.ext !== '.js') return;
			const response = client.load(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
			if (response) return;
		});

		const discordFiles = await readdir('./src/events/Discord');
		discordFiles.forEach((file) => {
			const eventName = file.split('.')[0];
			const event = new (require(`../events/Discord/${file}`))(client);
			client.on(eventName, (...args) => event.execute(...args));
			delete require.cache[require.resolve(`../events/Discord/${file}`)];
		});

		const musicFiles = await readdir('./src/events/Music');
		musicFiles.forEach((file) => {
			const eventName = file.split('.')[0];
			const event = new (require(`../events/Music/${file}`))(client);
			client.music.on(eventName, (...args) => event.execute(...args));
			delete require.cache[require.resolve(`../events/Music/${file}`)];
		});
	}
};