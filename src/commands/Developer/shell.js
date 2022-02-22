/* eslint-disable no-control-regex */
const Command = require('../../structures/Command');
const { exec } = require('child_process');

const ANSI_REGEX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
module.exports = class Shell extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.name = 'shell';
		this.category = 'Developer';
		this.description = 'Executa código na sua máquina';
		this.aliases = ['sh'];
	}

	async execute ({ message, args }) {
		if(message.author.id !== '847865068657836033' && message.author.id !== '689265428769669155') {return;}

		if(!args[0]) {return;}

		exec(args.join(' '), async (_err, stdout, stderr) => {
			if (!stdout && !stderr) {
				message.reply('Sem output!');
				return;
			}

			const res = (stdout || stderr).replace(ANSI_REGEX, '');

			if (stderr) {
				await message.reply({ content: `Stderr: \`\`\`sh\n${res}\n\`\`\`` });
			}
			else {
				await message.reply({ content: `**Stdout:**\`\`\`sh\n${res}\n\`\`\`` });
			}
		});
	}
};