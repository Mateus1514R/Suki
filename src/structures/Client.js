const { Client, Collection } = require("discord.js");
const { promisify } = require('util');
const klaw = require('klaw');
const path = require('path');
const guildDB = require('../models/guildDB');
const userDB = require('../models/userDB');
const botDB = require('../models/botDB');

const readdir = promisify(require("fs").readdir);

const Embed = require('../structures/ClientEmbed');

module.exports = class SukiClient extends Client {
    constructor(options) {
      super(options);
      this.commands = new Collection();
      this.aliases = new Collection();
      this.guildDB = guildDB;
      this.userDB = userDB;
      this.botDB = botDB;

      this.embed = Embed;
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