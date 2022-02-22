const { Client, Collection, MessageAttachment } = require("discord.js");
const { promisify } = require('util');
const klaw = require('klaw');
const path = require('path');
const guildDB = require('../models/guildDB');
const userDB = require('../models/userDB');
const botDB = require('../models/botDB');
const { existsSync, unlinkSync, readFileSync } = require('fs');

const readdir = promisify(require("fs").readdir);

const Embed = require('../structures/ClientEmbed');
const { resolve } = require("path");

module.exports = class SukiClient extends Client {
    constructor(options) {
      super(options);
      this.commands = new Collection();
      this.aliases = new Collection();
      this.guildDB = guildDB;
      this.userDB = userDB;
      this.botDB = botDB;

      this.embed = Embed;
      this.getUser = this.findUser;
    }

    load(commandPath, commandName) {
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

      async findUser(args, message) {
        if (!args) return message.author;
        if (args.startsWith("<@") && args.endsWith(">")) {
          let mention = args;
          mention = mention.slice(2, -1);
      
          if (mention.startsWith("!")) {
            mention = mention.slice(1);
          }
      
          return await message.client.users.fetch(mention);
        } else {
          let user;
          try {
            user = await message.guild.members
              .search({ query: args })
              .then(async (x) => await message.client.users.fetch(x.first().user.id));
          } catch {
            let user2;
            try {
              user2 = await this.client.users.fetch(args);
            } catch {
              return;
            }
            return user2;
          }
          return user;
        }
      };

      async commandLogs() {
        const path = resolve(__dirname, '..', '..', 'logs', 'commands.txt');

        if (existsSync(path))
        unlinkSync(path);

        setInterval(async () => {
          if (!existsSync(path)) return;

          const buffer = readFileSync(path);

          const attach = new MessageAttachment(buffer, 'commands.txt')

          await this.channels.cache.get('945376896982593706').send({ content:
            `Logs dos comandos.\nData: <t:${Math.floor(Date.now() / 1e3)}>`,
            files: [attach]
          }, {
            name: 'commands.txt',
            file: buffer
          }
          );
          unlinkSync(path);
        }, 7.2e6);
      }

      async onLoad(client) {
        klaw("src/commands").on("data", (item) => {
            const cmdFile = path.parse(item.path);
            if (!cmdFile.ext || cmdFile.ext !== ".js") return;
            const response = client.load(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
            if (response) return;
          });

        const eventFiles = await readdir(`./src/events`);
        eventFiles.forEach((file) => {
            const eventName = file.split(".")[0];
            const event = new (require(`../events/${file}`))(client);
            client.on(eventName, (...args) => event.execute(...args));
            delete require.cache[require.resolve(`../events/${file}`)];
          });
    }
}