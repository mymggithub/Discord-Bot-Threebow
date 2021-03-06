const botSettings = require('./botSettings.json');
const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

const prefix = botSettings.prefix;

const bot = new Discord.Client({}); // disableEveryone: true
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");
fs.readdir("./cmds/", (err, files) => {
	if (err) console.log(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	// console.log(`Loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		// console.log(`${i + 1}: ${f} loaded!`)
		bot.commands.set(props.help.name, props);
	});
})

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1234",
	database: "sadb"
});

con.connect(err => {
	if (err) throw err;
	console.log("Connected to database!");
});

bot.on('ready', async () => {
	console.log(`Bot is ready ${bot.user.username}`);
	
	try {
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		// console.log(link);
	} catch(e){
		console.log(e.stack);
	}

	bot.setInterval(() => {
		for (let i in bot.mutes) {
			let time = bot.mutes[i].time;
			let guildId = bot.mutes[i].guild;
			let guild = bot.guilds.get(guildId);
			let member = guild.members.get(i);
			let mutedRole = guild.roles.find(r => r.name === "Mute Role");
			if (!mutedRole) continue;

			if (Date.now() > time) {
				console.log(`${i} is able to be unmuted!`);
				member.removeRole(mutedRole);
				delete bot.mutes[i];
				fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
					if (err) throw err;
					console.log(`I have unmuted ${member.user.tag}.`);
				})
			}
		}
	}, 5000);
});
bot.on('message', async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if (!command.startsWith(prefix)) return;

	let cmd = bot.commands.get(command.slice(prefix.length));
	if (cmd) cmd.run(bot, message, args);
});

bot.login(botSettings.token)