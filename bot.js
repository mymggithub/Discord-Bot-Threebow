const botSettings = require('./botSettings.json')
const Discord = require('discord.js')
const prefix = botSettings.prefix;


const bot = new Discord.Client({disableEveryone: true});
bot.on('ready', async () => {
	console.log(`Bot is ready ${bot.user.username}`);
	
	try {
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e){
		console.log(e.stack);
	}
});
bot.on('message', async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if (!command.startsWith(prefix)) return;

	if (command === `${prefix}userinfo`) {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username)
			.setDescription("This is the user's info!")
			.setColor("#985986")
			.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
			.addField("ID", message.author.id)
			.addField("Created At", message.author.createdAt)
		message.channel.sendEmbed(embed);

		return;
	}

	if (command === `${prefix}mute`) {
		// message.mentions.users.first() returns a toMute.username and is for @mentions
		let toMute = message.mentions.users.first() || message.guild.members.get(args[0]);
		if (!toMute) return message.channel.sendMessage("You did not specify a user mentioned or ID!");

		return message.reply(toMute.username || toMute.user.username)
	}
});

bot.login(botSettings.token)