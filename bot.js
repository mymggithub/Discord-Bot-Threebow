const botSettings = require('./botSettings.json')
const Discord = require('discord.js')
const prefix = botSettings.prefix;


const bot = new Discord.Client({disableEveryone: true});
bot.on('ready', async () => {
	console.log(`Bot is ready ${bot.user.username}`);

	// bot.generateInvite(["ADMINISTRATOR"]).then(link => {
	// 	console.log(link);
	// }).catch(err =>{
	// 	console.log(err.stack);
	// });
	
	try {
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e){
		console.log(e.stack);
	}
});
bot.on('message', async message => {
	if (message.author.bot) return;// message.channel.sendMessage("No bots allowed!");
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
});

bot.login(botSettings.token)