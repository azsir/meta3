module.exports.config = {
	name: "onbot",
	version: "1.0.0",
	hasPermission: 1,
	credits: "zihad - 🥀",
	description: "Turn on the bot.",
	commandCategory: "💢ADMIN🔥",
	cooldowns: 0
  };
  
module.exports.run = ({event, api}) =>api.sendMessage("onbot",event.threadID, () =>process.enter(0))
