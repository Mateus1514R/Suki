module.exports = {
	lang: 'pt-BR',
	events: {
		messageCreate: {
			mention: 'Oi $, eu sou a **Suki**. Meu prefixo neste servidor é **{}**. Se você precisar de ajuda, use o comando **{}help**!',
			embed: {
				title: '❌ Ocorreu um erro!',
				description: 'Desculpe um erro ocorreu e o comando não foi executado corretamente. Eu peço para você reportar o erro para meus desenvolvedores e esperar que seja corrigido. Obrigado.'
			}
		},
		musicEvents: { queueEnd: 'A fila de músicas acabou, então eu saí do canal de voz.' }
	},
	commands: {
		welcome: {
			noPerm: 'você precisa da permissão `Gerenciar Servidor` para executar este comando!',
			embedHelp: {
				title: '🚪 | Sistema de boas-vindas',
				fields: {
					system: 'Sistema:',
					on: 'Ativado',
					off: 'Desligado',
					noChannel: 'Canal não definido.',
					message: 'Mensagem',
					noMessage: 'Mensagem não definida.'
				},
				embed2: {
					title: '🚪 | Sistema de boas-vindas',
					fields: {
						user: 'Mencione o usuário',
						name: 'Mostrar nome de usuário',
						guild: 'Mostrar nome do servidor',
						total: 'Mostrar a quantidade atual de membros',
						set: 'Defina o canal de entrada.',
						msg: 'Defina a mensagem de boas-vindas.',
						status: 'Habilitar ou desabilitar o sistema.'
					}
				},
				subs: {
					set: {
						noChannel: 'você precisa enviar o canal.',
						hasChannel: 'O canal inserido é o mesmo que o setado atualmente.',
						noArgsChannel: 'Você precisa colocar o canal de texto.',
						sucess: 'Canal de saída setado com sucesso para {}'
					},
					msg: {
						noArgs: 'Você precisa colocar a mensagem.',
						hasMessage: 'A mensagem inserida é a mesma que a definida atualmente.',
						length: 'A mensagem deve ter no máximo 200 caracteres.',
						sucess: 'Mensagem de boas-vindas setada com sucesso para ```{}```'
					},
					status: {
						noChannel: 'Você precisa estar o canal de saída para ativar o sistema.',
						noMessage: 'Você precisa setar a mensagem de boas-vindas para ativar o sistema.',
						on: 'Sistema ativado com sucesso!',
						off: 'O sistema foi desativado com sucesso!'
					}
				}
			}
		},
		prefix: {
			noPerm: 'você precisa da permissão `Gerenciar Servidor` para executar este comando!',
			noArgs: 'para mudar meu prefixo em seu servidor, utilize **{}prefix <Prefix>**.',
			threeLength: 'O prefixo deve ter no máximo **3** caracteres.',
			seted: 'Meu prefixo nesse servidor foi alterado para: **{}**'
		},
		coins: { money: 'Atualmente o(a) {user} tem **{value}** coin(s)' },
		daily: {
			cooldown: 'Tente de novo às',
			won: 'Você ganhou `{amount}` coins no seu prêmio diário!'
		},
		pay: {
			noMention: 'Você deve mencionar alguém para pagar!',
			payYourSelf: 'Você não pode pagar você mesmo!',
			validValue: 'Valor de pagamento inválido inserido!',
			noCoins: 'Você não tem coins suficientes para fazer esse pagamento!',
			neverUsed: 'Esse usuário nunca me usou então você não pode pagar ele!',
			payed: 'Você pagou com sucesso **${value} coins** para `${user}`.'
		},
		avatar: { embed: 'Click the button below to download the image.' },
		userinfo: {
			noNickname: 'No nickname',
			noBooster: 'It\'s not boost.',
			embed: {
				name1: 'Personal information',
				username: 'User name',
				created: 'Account created',
				infoserver: 'Information on the Server',
				nickname: 'Nickname',
				joined: 'Entered into',
				role: 'Highest Position'
			}
		},
		suggest: {
			noArgs: 'you need to enter the suggestion you want to send.',
			send: 'suggestion sent successfully, thank you for your cooperation!'
		},
		loop: {
			noPlayer: 'i\'m not playing music on this server!',
			channelError: 'you need to be on a voice channel!',
			noArgs: 'you need to enter the loop you want to activate.\n{} | Available Options:\n> Track | Queue | disable',
			trackloop: 'you have successfully activated `Track Loop`!',
			queueloop: 'you have successfully activated the `Queue Loop`!',
			disable: 'you have successfully disabled `Loop`!'
		},
		botinfo: {
			embed: {
				name1: `Personal information:`,
				owners: `Creators`,
				created: `Created in`,
				prefix: `Prefix`,
				users: `Users`,
				servers: `Servers`,
				name2: `Technical information`,
				commands: `Commands`,
				platform: `Platform`
			},
			buttons: {
				add: `Add me`,
				sup: `Support`,
				repo: `Repository`
			}
		},
		pause: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You\'re not on a voice channel',
			channelError2: 'You need to be on the same channel as I am to change the queue!',
			alteradyPause: 'Music is currently paused!',
			sucess: 'Music successfully paused!'
		},
		play: {
			channelError: 'You\'re not on a voice channel or you\'re not on the same channel as me',
			noArgs: 'You need to put a song or url for me to play!',
			searching: `searching`,
			failed: `sorry but the link/name you entered is not valid.`,
			nomatches: `i didn't find the song you want.`,
			embed1: { duration: 'Duration' },
			embed2: {
				author: 'Starting to play',
				music: `Music`,
				duration: 'Duration',
				requester: 'Requested by'
			}
		},
		resume: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me to unpause the music!',
			alteradyPause: 'Music is currently not paused!',
			sucess: 'Music resumed successfully!'
		},
		seek: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!',
			invalidTime: 'Enter the time for me to jump and let it be valid.',
			exceeds: 'This time exceeds the time of the song',
			sucess: 'I skipped the song to the desired time successfully'
		},
		shuffle: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!',
			sucess: 'I shuffled the queue successfully'
		},
		skip: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!',
			sucess: 'Successfully skipped song'
		},
		skipto: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!',
			noArgs: 'Enter the number of songs you want to skip',
			number: 'I only accept numbers',
			numberOne: 'Enter a number that is greater than 1',
			queue: 'You don\'t have that number of songs in the queue',
			end: 'All the songs that were in the queue were skipped',
			sucess: 'I successfully skipped the desired songs'
		},
		stop: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!'
		},
		volume: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!',
			noArgs: 'Enter the volume you want to set',
			number: 'I only accept numbers',
			correctNumber: 'Provide a volume between 0 to 500',
			sucess: 'The music volume has been successfully set'
		},
		reload: { sucess: 'all commands reloaded successfully.' },
		shell: { error: 'No output!' },
		help: {
			cmdCategory: 'Category commands',
			noCommand: 'I didn\'t find the requested command.',
			helper: {
				info: 'Command Information',
				name: 'Command Name',
				noAliases: 'This command has no aliases.',
				desc: 'Description',
				noDesc: 'This command has no description.'
			},
			embed1: { author: 'Help Center' },
			row: { selectMenu: 'Select the category.' },
			categorys: {
				config: 'Commands related to bot configuration in the guild.',
				economy: 'Commands to use the Bot economy.',
				info: 'Commands for some useful miscellaneous information.',
				music: 'Commands for listening to music using the Bot.',
				misc: 'Commands without specific category.'
			},
			embed2: {
				author: 'Help Center',
				description: 'Hello {author}, welcome to my help center, here you will have access to all my features available for your use!\n\nTo receive more information about any command, use **{prefix}help <command>**.\nSelect the category you want to view from the menu below.'
			},
			noPerm: 'you need to run the command for that.',
			commands: 'You are **seeing** the **commands** of the category',
			field: 'Commands'
		}
	}
};