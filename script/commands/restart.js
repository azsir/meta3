module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "zihad - 🥀",
	description: "Restart the bot.",
	commandCategory: "💢ADMIN🔥",
	usages: "",
	cooldowns: 5
};


module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`${global.config.BOTNAME} Bot are now Restarting...`, threadID, () => process.exit(1));
}