const fs = module.require('fs');
module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have manage messages!");

	let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if (!toMute) return message.channel.sendMessage("You did not specify a user mentioned or ID!");

	let role_name = "Mute Role";
	let role = message.guild.roles.find(r => r.name === role_name);
	if (!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!");


	await toMute.removeRole(role);

	delete bot.mutes[toMute.id];
	fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
		if (err) throw err;
		console.log(`I have unmuted ${toMute.user.tag}.`);
	})
}

module.exports.help = {
	name: "unmute"
}