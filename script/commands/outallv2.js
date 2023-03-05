module.exports.config = {
	name: "outallv2",
	version: "1.0.0",
	hasPermission: 2,
	credits: "zihad - 🥀",
	description: "Leave all threads.",
	commandCategory: "💢ADMIN🔥",
	usage: "",
	cooldowns: 5
  };
  

module.exports.run = async ({ api, event, args }) => {
  for (const idThread of global.data.allThreadID) {
    api.removeUserFromGroup(api.getCurrentUserID(), idThread)
  }
  		api.sendMessage(' Out of the whole group successfully', event.threadID);
}
