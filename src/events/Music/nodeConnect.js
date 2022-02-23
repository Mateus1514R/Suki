const c = require("colors");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(node) {
    console.log(c.green("✅ [Vulkava] - Node conectado."));
    setInterval(() => {
      node.send({
        op: "ping",
      });
    }, 45000);
  }
};
