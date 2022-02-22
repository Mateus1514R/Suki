const { config } = require('dotenv');
const Client = require('./src/structures/Client');
const { connect } = require('mongoose');
const c = require('colors');

config();

const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS'
	],
	allowedMentions: { parse: ['users'], repliedUser: true },
});

connect(process.env.MONGODB_CONNECT, {
}).then(() => {
	console.log(c.green('✅ [DataBase] - Iniciada com sucesso.'));
}).catch(e => {
	console.error(c.red(`❌ [DataBase] - Ocorreu um erro: ${e}`));
});

process.on('uncaughtException', (err) => {
	console.error(err);
});

process.on('unhandledRejection', (err) => {
	console.error(err);
});

client.onLoad(client);

client.commandLogs();

client.login(process.env.TOKEN);
