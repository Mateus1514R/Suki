module.exports = class Command {
	constructor (client) {
		this.client = client;

		this.name = 'Nome';
		this.category = 'Categoria';
		this.description = 'Descrição';
		this.aliases = [];
		this.cooldown = 3;

		this.staffOnly = false;

		this.botPermissions = [];
		this.userPermissions = [];
	}
};
