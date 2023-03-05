module.exports.config = {
	name: "offbot",
	version: "1.0.0",
	hasPermission: 2,
	credits: "zihad - 🥀",
	description: "Turn off the bot.",
	commandCategory: "💢ADMIN🔥",
	cooldowns: 0
  };
  
module.exports.run = ({event, api}) =>api.sendMessage("Bye I love you mwah",event.threadID, () =>process.exit(0))