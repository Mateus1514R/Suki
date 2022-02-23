const c = require("colors");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute() {
    this.client.music.start(this.client.user.id);

    setInterval(() => {
      const status = [
        {
          name: "Precisa de ajuda? Utilize s!help",
        },
        {
          name: `Online em ${this.client.guilds.cache.size} servidores.`,
        },
      ];
      let randomStatus = status[Math.floor(Math.random() * status.length)];
      this.client.user.setActivity(randomStatus.name);
    }, 25 * 1000);

    console.log(c.green("✅ [Suki] - Está online!"));
    console.log(
      c.green(
        `✅ [Suki] - Online em ${this.client.guilds.cache.size} servidores.`
      )
    );
  }
};
