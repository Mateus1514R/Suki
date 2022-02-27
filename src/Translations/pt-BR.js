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
		lang: {
			noPerm: 'você precisa da permissão `Gerenciar Servidor` para executar este comando!',
			embed: {
				desc: '🇺🇸 Inglês **[Complete]**\n🇧🇷 Português **[Incomplete]**',
				select: 'Escolha qual linguagem você quer? Clique nós botões abaixo.'
			},
			authorOnly: 'Apenas o autor do comando pode escolher a nova linguagem.',
			sucess: 'Eu vou falar inglês nesse servidor.',
			closed: 'Eu fechei o menu de seleção de linguagem.',
			cancel: 'Cancelar'
		},
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
						set: 'Defina o canal de boas-vindas.',
						msg: 'Defina a mensagem de boas-vindas.',
						status: 'Habilitar ou desabilitar o sistema.'
					}
				},
				subs: {
					set: {
						noChannel: 'você precisa mencionar o canal.',
						hasChannel: 'O canal inserido é o mesmo que o setado atualmente.',
						noArgsChannel: 'Você precisa mencionar o canal de texto.',
						success: 'Canal de boas-vindas setado com sucesso para {}'
					},
					msg: {
						noArgs: 'Você precisa inserir a mensagem.',
						hasMessage: 'A mensagem inserida é a mesma que a setada atualmente.',
						length: 'A mensagem deve ter no máximo 200 caracteres.',
						success: 'Mensagem de boas-vindas setada com sucesso para ```{}```'
					},
					status: {
						noChannel: 'Você precisa setar o canal de boas-vindas para poder ativar o sistema.',
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
			payed: 'Pagou com sucesso**{} coins** para `{user}`.'
		},
		avatar: { embed: 'Clique no botão abaixo para baixar a imagem.' },
		userinfo: {
			noNickname: 'Sem apelido',
			noBooster: 'Não é impulsionador.',
			embed: {
				name1: 'Informações pessoais',
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
			success: 'Música pausada com sucesso!'
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
			channelError2: 'Você não está no mesmo canal de voz que eu para retomar a música!',
			alteradyPause: 'A música atual não está pausada!',
			success: 'Música retomada com sucesso!'
		},
		seek: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'Você não está no mesmo canal de voz que eu!',
			invalidTime: 'Insira o tempo para eu pule e quem seja válido.',
			exceeds: 'Esse tempo excede o tempo da música',
			success: 'Eu pulei a música para o tempo desejando com sucesso'
		},
		shuffle: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'Você não está no mesmo canal de voz que eu!',
			success: 'Eu embaralhei a fila com sucesso'
		},
		skip: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'Você não está no mesmo canal de voz que eu!',
			success: 'Música pulada com sucesso'
		},
		skipto: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'Você não está no mesmo canal de voz que eu!',
			noArgs: 'Insira o número de música que você deseja pular',
			number: 'Eu apenas aceito números',
			numberOne: 'Coloque um número maior que 1',
			queue: 'Você não tem esse número de músicas na fila',
			end: 'Todas as músicas da fila foram puladas',
			success: 'Eu pulei com sucesso as músicas desejadas'
		},
		stop: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'Você não está no mesmo canal de voz que eu!'
		},
		volume: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'Você não está no mesmo canal de voz que eu!',
			noArgs: 'Coloque o volume que você quer definir',
			number: 'Eu apenas aceito números',
			correctNumber: 'Coloque um volume entre 0 a 500',
			success: 'O volume da música foi alterado com sucesso'
		},
		reload: { success: 'Todos os comandos foram recarregados com sucesso.' },
		shell: { error: 'Nenhuma saída!' },
		help: {
			cmdCategory: 'Categoria de comandos',
			noCommand: 'Eu não encontrei o comando requisitado.',
			helper: {
				info: 'Informações do comando',
				name: 'Nome do comando',
				noAliases: 'Esse comando não tem aliases.',
				desc: 'Descrição',
				noDesc: 'Esse comando não tem descrição.'
			},
			embed1: { author: 'Centro de ajuda' },
			row: { selectMenu: 'Selecione a categoria.' },
			categorys: {
				config: 'Comandos relacionados a configuração do bot no servidor.',
				economy: 'Comandos para usar a economia do bot.',
				info: 'Comandos de úteis de informações diversas.',
				music: 'Comandos para escutar música usando o bot.',
				misc: 'Comandos sem categoria específica.'
			},
			embed2: {
				author: 'Centro de ajuda',
				description: 'Hello {author}, welcome to my help center, here you will have access to all my features available for your use!\n\nTo receive more information about any command, use **{prefix}help <command>**.\nSelect the category you want to view from the menu below.'
			},
			noPerm: 'you need to run the command for that.',
			commands: 'You are **seeing** the **commands** of the category',
			field: 'Comandos'
		},
		nowplaying: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			embed: {
				author: 'Now playing',
				description: 'Information of the song I\'m playing right now',
				name: 'Name:',
				requester: 'Requested by:',
				channel: 'Channel:',
				duration: 'Duration:'
			}
		},
		queue: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			noMusics: 'No music in my queue',
			music: 'Music currently playing',
			time: 'The time is over'
		},
		remove: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'Você não está no mesmo canal de voz que eu!',
			noArgs: 'Enter the number of the song you want to remove from the queue, to see the number of a song use the `Queue` command',
			number: 'Eu apenas aceito números',
			noMusic: 'There isn\'t a song with that number in the queue',
			success: 'Song successfully removed from queue'
		}
	}
};