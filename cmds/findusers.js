module.exports.run = async (bot, message, args) => {
	let users = bot.users;

	let searchTerm = args[0];
	if (!searchTerm) return message.channel.send("Please provide a search term");

	let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));

	message.channel.send(matches.map(u => u.tag).join(", ") || "No one here!");
	// check message length is not passing 2000
}

module.exports.help = {
	name: "findusers"
}