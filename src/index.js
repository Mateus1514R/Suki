const Client = require('./structures/Client');
const { connect } = require('mongoose');
const c = require('colors');
const { Vulkava } = require('vulkava');
const yaml = require('js-yaml');
const { readFileSync } = require('fs');
const { GatewayIntentBits } = require('discord.js');

const env = yaml.load(readFileSync('./envirovments.yml', 'utf8'));

const client = new Client({
	intents: [GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers],
	failIfNotExists: false,
	rest: {
		retries: 3,
	},
	allowedMentions: {
		repliedUser: true,
		parse: ['users'],
	},
});

client.music = new Vulkava({
	nodes: [
		{
			id: 'Suki 1',
			hostname: String(env.usalavalinkhost),
			port: 80,
			password: String(env.lavalinkpassword),
			region: 'USA',
			resumeKey: 'Suki',
			resumeTimeout: 5 * 60000,
		},
		{
			id: 'Suki 2',
			hostname: String(env.eulavalinkhost),
			port: 80,
			password: String(env.lavalinkpassword),
			region: 'EU',
			resumeKey: 'Suki',
			resumeTimeout: 5 * 60000,
		}
	],
	sendWS: (guildId, payload) => {
		client.guilds.cache.get(guildId)?.shard.send(payload);
	},
	spotify: {
		clientId: String(env.spotifyclientid),
		clientSecret: String(env.spotifyclientsecret)
	}
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
