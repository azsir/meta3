module.exports.config = {
	name: "outall",
	version: "1.0.0",
	hasPermission: 2,
	credits: "zihad - 🥀",
	description: "Leave all threads.",
	commandCategory: "💢ADMIN🔥",
	usage: "",
	cooldowns: 5
  };
  
module.exports.run = async ({ api, event, args }) => {
	return api.getThreadList(100, null, ["INBOX"], (err, list) => {
		if (err) throw err;
		list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
		api.sendMessage(' Out of the whole group successfully', event.threadID);
	});
}