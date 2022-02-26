module.exports = {
	lang: 'pt-BR',
	events: {
		messageCreate: { mention: 'Oi $, eu sou a **Suki**. Meu prefixo neste servidor é **{}**. Se você precisar de ajuda, use o comando **{}help**!' },
		musicEvents: { queueEnd: 'The music queue ended, so I left the voice channel.' }
	},
	commands: {
		prefix: {
			noPerm: 'you need `Manage Server` permission to run this command!',
			noArgs: 'to change my prefix on your server, use **{}prefix <Prefix>**.',
			threeLength: 'the prefix must have a maximum of **3** characters.',
			seted: 'my prefix on the server has been changed to: **{}**'
		},
		coins: { money: 'Currently {user} has **{value}** coins(s)' },
		daily: {
			cooldown: 'Try again at',
			won: 'won in your daily `{amount}` coins!'
		},
		pay: {
			noMention: 'You have to mention someone to pay!',
			payYourSelf: 'You can\'t pay yourself!',
			validValue: 'Enter a valid amount for payment!',
			noCoins: 'You don\'t have enough coins to make the payment!',
			neverUsed: 'This user has never used me so you can\'t pay him!',
			payed: 'successful payment of **${value} coins** to `${user}`.'
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
			success: 'Music successfully paused!'
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
			success: 'Music resumed successfully!'
		},
		seek: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!',
			invalidTime: 'Enter the time for me to jump and let it be valid.',
			exceeds: 'This time exceeds the time of the song',
			success: 'I skipped the song to the desired time successfully'
		},
		shuffle: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!',
			success: 'I shuffled the queue successfully'
		},
		skip: {
			noPlayer: 'I\'m not playing music on this server.',
			channelError: 'You are not on a voice channel.',
			channelError2: 'You are not on the same voice channel as me!',
			success: 'Successfully skipped song'
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
			success: 'I successfully skipped the desired songs'
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
			success: 'The music volume has been successfully set'
		},
		reload: { success: 'all commands reloaded successfully.' },
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