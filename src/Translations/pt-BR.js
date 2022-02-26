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
						noChannel: 'você precisa mencionar o canal.',
						hasChannel: 'O canal inserido é o mesmo que o setado atualmente.',
						noArgsChannel: 'Você precisa mencionar o canal de texto.',
						sucess: 'Canal de saída setado com sucesso para {}'
					},
					msg: {
						noArgs: 'Você precisa inserir a mensagem.',
						hasMessage: 'A mensagem inserida é a mesma que a setada atualmente.',
						length: 'A mensagem deve ter no máximo 200 caracteres.',
						sucess: 'Mensagem de boas-vindas setada com sucesso para ```{}```'
					},
					status: {
						noChannel: 'Você precisa setar o canal de saída para ativar o sistema.',
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
		avatar: { embed: 'Clique no botão abaixo para baixar a imagem.' },
		userinfo: {
			noNickname: 'Sem apelido',
			noBooster: 'It\'s not boost.',
			embed: {
				name1: 'Informação pessoal',
				username: 'Nome de usuário',
				created: 'Conta criada',
				infoserver: 'Informações do servidor',
				nickname: 'Apelido',
				joined: 'Inserido em',
				role: 'Cargo mais alto'
			}
		},
		suggest: {
			noArgs: 'Você precisa colocar a sugestão que deseja enviar.',
			send: 'Sugestão enviada com sucesso, obrigado pela sua cooperação!'
		},
		loop: {
			noPlayer: 'Eu não estou tocando música neste servidor!',
			channelError: 'Você precisa estar em um canal de voz para utilizar esse comando!',
			noArgs: 'Você precisa inserir qual repetição deseja ativar.\n{} | Opções disponíveis:\n> track | queue | disable',
			trackloop: 'Loop da música ativada com sucesso!',
			queueloop: 'Loop da queue ativado com sucesso!',
			disable: 'Você desativou com sucesso a `Repetição`!'
		},
		botinfo: {
			embed: {
				name1: `Informação pessoal:`,
				owners: `Criadores`,
				created: `Criado em`,
				prefix: `Prefixo`,
				users: `Usuários`,
				servers: `Servidores`,
				name2: `Informações técnicas`,
				commands: `Comandos`,
				platform: `Plataforma`
			},
			buttons: {
				add: `Me adicione`,
				sup: `Suporte`,
				repo: `Repositório`
			}
		},
		pause: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz',
			channelError2: 'Você precisa estar no mesmo canal que eu para mudar a lista!',
			alteradyPause: 'Música pausada!',
			sucess: 'Música pausada com sucesso!'
		},
		play: {
			channelError: 'Você não está em um canal de voz ou não está no mesmo canal que eu',
			noArgs: 'Você precisa inserir o nome/url da música para eu começar a tocar',
			searching: `Procurando`,
			failed: `Desculpe mas o link/nome que você inseriu não é válido.`,
			nomatches: `Eu não achei a música que você quer.`,
			embed1: { duration: 'Duração' },
			embed2: {
				author: 'Começando a tocar',
				music: `Música`,
				duration: 'Duração',
				requester: 'Solicitado por'
			}
		},
		resume: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'You are not on the same voice channel as me to unpause the music!',
			alteradyPause: 'Music is currently not paused!',
			sucess: 'Music resumed successfully!'
		},
		seek: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'You are not on the same voice channel as me!',
			invalidTime: 'Enter the time for me to jump and let it be valid.',
			exceeds: 'This time exceeds the time of the song',
			sucess: 'I skipped the song to the desired time successfully'
		},
		shuffle: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'You are not on the same voice channel as me!',
			sucess: 'I shuffled the queue successfully'
		},
		skip: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'You are not on the same voice channel as me!',
			sucess: 'Successfully skipped song'
		},
		skipto: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'You are not on the same voice channel as me!',
			noArgs: 'Enter the number of songs you want to skip',
			number: 'I only accept numbers',
			numberOne: 'Enter a number that is greater than 1',
			queue: 'You don\'t have that number of songs in the queue',
			end: 'All the songs that were in the queue were skipped',
			sucess: 'I successfully skipped the desired songs'
		},
		stop: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'You are not on the same voice channel as me!'
		},
		volume: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
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
			field: 'Comandos'
		}
	}
};