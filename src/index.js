const { config } = require('dotenv');
const Client = require('./structures/Client');
const { connect } = require('mongoose');
const c = require('colors');
const { Vulkava } = require('vulkava');

config();

const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_VOICE_STATES',
	],
	allowedMentions: { parse: ['users'], repliedUser: true },
});

client.music = new Vulkava({
	nodes: [
		{
			id: 'Suki 1',
			hostname: process.env.LAVALINKHOST,
			port: 80,
			password: process.env.LAVALINKPASSWORD,
			resumeKey: 'Suki',
			resumeTimeout: 5 * 60000,
		},
	],
	sendWS: (guildId, payload) => {
		client.guilds.cache.get(guildId)?.shard.send(payload);
	},
});

connect(process.env.MONGODB_CONNECT, {})
	.then(() => {
		console.log(c.green('✅ [DataBase] - Iniciada com sucesso.'));
	})
	.catch((e) => {
		console.error(c.red(`❌ [DataBase] - Ocorreu um erro: ${e}`));
	});

process.on('uncaughtException', (err) => {
	console.error(err);
});

process.on('unhandledRejection', (err) => {
	console.error(err);
});

client.onLoad(client);

client.login(process.env.TOKEN);
