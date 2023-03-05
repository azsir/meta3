module.exports.config = {
    name: "adduser",
    version: "2.4.3",
    hasPermssion: 1,
    credits: "zihad - 🥀",
    description: "Add user to the group by link",
    commandCategory: "💢ADMIN🔥",
    usages: "[link]",
    cooldowns: 0
};
module.exports.run = async function ({ api, event, args }) {
  const axios = require('axios');
  if (!args[0]) return api.sendMessage(`Wrong format\nUse ${global.config.PREFIX}${this.config.name} facebook profile link`, event.threadID, event.messageID);
  if(event.attachments[0].type == "share") { var id = event.attachments[0].url }
  const res = await axios.get(`https://api.reikomods.repl.co/sus/fuid?link=${id}`);
var result = res.data.result;
api.addUserToGroup(result, event.threadID)
api.sendMessage(`${result} has been added to the group`, event.threadID)
}
	