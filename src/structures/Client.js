const { Client, Collection, WebhookClient } = require('discord.js');
const { promisify } = require('util');
const klaw = require('klaw');
const path = require('path');

const yaml = require('js-yaml');
const { readFileSync } = require('fs');

const env = yaml.load(readFileSync('./envirovments.yml', 'utf8'));

const guildDB = require('../models/guildDB');
const userDB = require('../models/userDB');
const botDB = require('../models/botDB');
const Embed = require('../structures/ClientEmbed');

const readdir = promisify(require('fs').readdir);

module.exports = class SukiClient extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.guildDB = guildDB;
    this.userDB = userDB;
    this.botDB = botDB;
    this.langs = {
      pt: require('../Locales/pt-BR.json'),
      en: require('../Locales/en-US.json')
    }

    this.embed = Embed;
    this.getUser = this.findUser;
    this.sendLogs = this.commandLogs;
    this.developers = ['847865068657836033', '689265428769669155', '431768491759239211', '680943469228982357'];
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

  async findUser(args, message) {
    if (!args || !message) return;

    let user;

    if (/<@!?\d{17,18}>/.test(args)) {
      user = await message.client.users.fetch(args.match(/\d{17,18}/)?.[0]);
    } else {
      try {
        user = await message.guild.members.search({ query: args }).then((x) => x.first().user);
      } catch {}
      try {
        user = await message.client.users.fetch(args).catch(null);
      } catch {}
    }
    if (user) return user;
  }

  async commandLogs(content) {
    const webhookClient = new WebhookClient({
      token: String(env.logs_token),
      id: '946563655003144212',
    });
    webhookClient.send({
      content: String(content),
    });
  }