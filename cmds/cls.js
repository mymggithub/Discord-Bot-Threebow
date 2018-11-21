module.exports.run = async (bot, message, args) => {
	try {
		let count = 0;
		let messages = await message.channel.fetchMessages({limit: 100});
		let messagesArr = messages.array();
		for(let i in messagesArr) {
			await messagesArr[i].delete()
			count = count + 1;
			if(count >= 100) {
				this.run(bot, message, args);
			}
		}
	} catch(e){
		console.log(e.stack);
	}
}

module.exports.help = {
	name: "cls"
}