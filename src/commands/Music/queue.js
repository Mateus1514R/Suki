const Collection = require('../../structures/Collection')
const { ButtonComponent, ActionRow, ButtonStyle, Embed, Util } = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class Queue extends Command {
	constructor (client) {
		super(client);
		this.client = client;

		this.collection = [];

		this.name = 'queue';
		this.category = 'Music';
		this.description = '';
		this.aliases = [''];
	}

	async execute ({ message, lang }) {

		const player = this.client.music.players.get(message.guild.id);

		if(!player) return message.reply(`${lang.commands.queue.noPlayer}`);

		let pos = 1;

		let page = 1;

		let pages = Math.ceil(this.collection.length / 1);
		
		const fila = new Collection()

		player.queue.forEach((music) => {

			fila.push(`${pos++}. [${music.title}](${music.uri}) - [${music.requester}]`);

		});

		const button_next = new MessageButton()
			.setCustomId('Button_1')
			.setLabel('Next')
			.setStyle('SECONDARY');

		const button_back = new MessageButton()
			.setCustomId('Button_2')
			.setLabel('Back')
			.setStyle('SECONDARY');

		if(pages <= 1) button_next.setDisabled(true);

		const row = new MessageActionRow()
			.addComponents(button_next, button_back);

		const embed = new this.client.embed(message.author)
			.setAuthor({ name: 'Queue', iconURL: message.guild.iconURL({}) })
			.setDescription(`**${player.queue.length <= 0 ? `${lang.commands.queue.noMusics}` : fila.paginate(page, 10).join('\n')}\n\n${lang.commands.queue.music}: [${player.current.title}](${player.current.uri})**`);

		await message.reply({ embeds: [embed], components: [row] }).then((msg) => {

			if(pages <= 1) return;

			let filter = (inter) => {

				return inter.isButton() && inter.message.id === msg.id && inter.user.id === message.author.id;

			};

			const collector = msg.channel.createMessageComponentCollector({ filter: filter, time: 60000 });

			collector.on('collect', async (inter) => {

				if(inter.customId === 'Button_1') {

					await inter.deferUpdate();

					page++;

					if(!fila.paginate(page, 10).join('')) {

						page--;

						button_next.setDisabled(true);

						await msg.edit({ embeds: [embed], components: [row] });

						return;

					}

					embed.setDescription(`**${fila.paginate(page, 10).join('\n')}\n\n${lang.commands.queue.music}: [${player.current.title}](${player.current.uri})**`);

					button_back.setDisabled(false);

					await msg.edit({ embeds: [embed], components: [row] });

				}

				if(inter.customId === 'Button_2') {

					await inter.deferUpdate();

					page--;

					if(!fila.paginate(page, 10).join('')) {

						page++;

						button_back.setDisabled(true);

						await msg.edit({ embeds: [embed], components: [row] });

						return;

					}

					embed.setDescription(`**${fila.paginate(page, 10).join('\n')}\n\n${lang.commands.queue.music}: [${player.current.title}](${player.current.uri})**`);

					button_next.setDisabled(false);

					await msg.edit({ embeds: [embed], components: [row] });

				}
			});

			collector.on('end', async (r, reason) => {

				if(reason !== 'time') return;

				button_back.setDisabled(true);
				button_next.setDisabled(true);

				await msg.edit({ embeds: [embed.setFooter({ text: `${lang.commands.queue.time}` })], components: [row] });

			});
			setTimeout(async () => { msg.delete(); }, 120000);
		});
	}
};
