const { config } = require('dotenv')
const Client = require('./src/structures/Client')

config();

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS'
    ],
    allowedMentions: { parse: ["users"], repliedUser: true },
});

process.on('uncaughtException', (err) => {
    console.error(err);
  });
  
  process.on('unhandledRejection', (err) => {
    console.error(err);
  });

client.onLoad(client)

client.login(process.env.TOKEN)
