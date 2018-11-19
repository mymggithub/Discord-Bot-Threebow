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

		// bot.guilds.get("id") // message.guilds.id or message.id
		// bot.guilds.find("name", "hello :3")
		// bot.guilds.find(guild => guild.members.size >= 10) // guild.members.size returns true but find returns guild
		// bot.guilds.has("id") // return true
		// bot.guilds.exists("name", "hello :3") // return true
		// bot.guilds.exists(guild => guild.name === "hello :3") // return true
	}
});

bot.login(botSettings.token)