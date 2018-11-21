module.exports.run = async (bot, message, args) => {
	try {
		for (var i = 1; i < 101; i++) {
			await message.channel.send(`${i} @everyone`);
		}
	} catch(e){
		console.log(e.stack);
	}
}

module.exports.help = {
	name: "spam"
}