const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have manage messages!");

	let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if (!toMute) return message.channel.sendMessage("You did not specify a user mentioned or ID!");

	let role_name = "Mute Role";
	let role = message.guild.roles.find(r => r.name === role_name);
	if (!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!");


	await toMute.removeRole(role);
	message.channel.send("I have unmuted them!");
}

module.exports.help = {
	name: "unmute"
}