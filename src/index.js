const Client = require('./structures/Client');
const { connect } = require('mongoose');
const c = require('colors');
const { Vulkava } = require('vulkava');
const yaml = require('js-yaml');
const { readFileSync } = require('fs');

const env = yaml.load(readFileSync('./envirovments.yml', 'utf8'));

const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_PRESENCES',
		'GUILD_MESSAGES',
		'GUILD_VOICE_STATES',
	],
	allowedMentions: { parse: ['users'], repliedUser: false },
});

client.music = new Vulkava({
	nodes: [
		{
			id: 'Suki 1',
			hostname: String(env.lavalinkhost),
			port: 80,
			password: String(env.lavalinkpassword),
			resumeKey: 'Suki',
			resumeTimeout: 5 * 60000,
		},
	],
	sendWS: (guildId, payload) => {
		client.guilds.cache.get(guildId)?.shard.send(payload);
	},
});

connect(env.mongodb_connect, {})
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

client.login(env.token);
