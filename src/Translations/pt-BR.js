module.exports = {
	lang: 'pt-BR',
	events: {
		messageCreate: {
			mention: 'Oi $, eu sou a **Suki**. Meu prefixo neste servidor é **{}**. Se você precisar de ajuda, use o comando **{}help**!',
			cooldown: "Aguarde \`{}\` segundos para executar o comando novamente!",
			embed: {
				title: '❌ Ocorreu um erro!',
				description: 'Desculpe um erro ocorreu e o comando não foi executado corretamente. Eu peço para você reportar o erro para meus desenvolvedores e esperar que seja corrigido. Obrigado.',
			},
			noUserPerm: 'Você precisa da permissão \`{}\` para executar este comando',
			noBotPerm: 'Eu preciso da permissão \`{}\` para executar este comando'
		},
		musicEvents: { 
			queueEnd: 'A fila de músicas acabou, então eu saí do canal de voz.' 
		},
		guildmemberadd: {
			button: 'Mensagem configurada pela equipe {}'
		}
	},
	commands: {
		lang: {
			embed: {
				title: '🌎 Escolha a linguagem desejada!',
				desc: 'Para alterar a linguagem que eu interajo nesse servidor, clique no botão com a nova linguagem desejada.',
				translated: '**Traduzido por:**',
				help: '🌎 Quer ajudar a me traduzir?'
			},
			authorOnly: 'Apenas o autor do comando pode escolher a nova linguagem.',
			sucess: 'Eu vou falar inglês nesse servidor.',
			closed: 'Eu fechei o menu de seleção de linguagem.',
			cancel: 'Cancelar'
		},
		welcome: {
			embedHelp: {
				title: '🚪 | Sistema de boas-vindas',
				fields: {
					system: 'Sistema:',
					on: 'Ativado',
					off: 'Desativado',
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
			noArgs: 'para mudar meu prefixo em seu servidor, utilize **{}prefix <Prefix>**.',
			threeLength: 'O prefixo deve ter no máximo **3** caracteres.',
			seted: 'Meu prefixo nesse servidor foi alterado para: **{}**'
		},
		coins: { money: 'Atualmente o(a) \`{user}\` tem **{value}** coin(s)' },
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
			payed: 'pagamento de **{} coins** enviado com sucesso para `{user}`.'
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
				developer: 'Comandos dos desenvolvedores',
				economy: 'Comandos para usar a economia do bot.',
				info: 'Comandos de úteis de informações diversas.',
				music: 'Comandos para escutar música usando o bot.',
				misc: 'Comandos sem categoria específica.'
			},
			embed2: {
				author: 'Centro de ajuda',
				description: 'Olá {author}, bem-vindo a minha central de ajuda, aqui você terá acesso a todos os meus comandos disponível para uso!\n\nPara receber mais informações sobre qualquer comando, use **{prefix}help <command>**.\nSelecione a categoria que você deseja ver no menu abaixo.'
			},
			noPerm: 'apenas o autor do comando pode usar esta interação',
			commands: 'Você está **vendo** os **comandos** da categoria',
			field: 'Comandos'
		},
		nowplaying: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			embed: {
				author: 'Tocando agora',
				description: 'Informações da música que estou tocando agora',
				name: 'Nome:',
				requester: 'Solicitada por:',
				channel: 'Canal:',
				duration: 'Duração:'
			}
		},
		queue: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			noMusics: 'Sem músicas na minha fila',
			music: 'Música tocando atualmente',
			time: 'O tempo acabou'
		},
		remove: {
			noPlayer: 'Eu não estou tocando música neste servidor.',
			channelError: 'Você não está em um canal de voz.',
			channelError2: 'Você não está no mesmo canal de voz que eu!',
			noArgs: 'Coloque o número de músicas que você deseja remover da lista, para ver o número de uma música use o comando `queue`',
			number: 'Eu apenas aceito números',
			noMusic: 'Não há uma música com esse número na lista',
			success: 'Música removida da lista com sucesso'
		}
	}
};