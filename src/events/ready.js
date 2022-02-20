const c = require('colors')

module.exports = class {
    constructor(client) {
      this.client = client;
}

async execute() {
    console.log(c.green('✅ [Suki] - Está online!'))
  }
}