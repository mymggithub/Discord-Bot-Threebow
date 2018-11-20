const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage messages!");

	let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if (!toMute) return message.channel.send("You did not specify a user mentioned or ID!");

	if (toMute.id === message.author.id) return message.channel.send("You cannot mute yourself!");

	if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot a member that is higher or has the same role as you!");
	
	role_name = "Mute Role";
	let role = message.guild.roles.find(r => r.name === role_name);
	if (!role) {
		try {
			role = await message.guild.createRole({
				name: role_name,
				color: "#000000",
				permissions: []
			});

			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(role, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		} catch(e) {
			console.log(e.stack);
		}
	}

	if (toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");

	await toMute.addRole(role);
	message.channel.send("I have muted them!");
}

module.exports.help = {
	name: "mute"
}