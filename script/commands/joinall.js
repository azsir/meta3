module.exports.config = {
  name: "joinall",
  version: "20.0.0",
  hasPermssion: 2,
  credits: "zihad - 🥀",
  description: "Join all group",
  commandCategory: "💢ADMIN🔥",
  usages: "[UserID]",
  cooldowns: 5
};
module.exports.run = async ({ api, event, args }) => {
  var text = args.join(" ");
  var count = 1
  if (text.includes("100")) {
    for (const joinNow of global.data.allThreadID) {
    api.addUserToGroup(text, joinNow)
      count++;
  }
  return api.sendMessage(`Successfully added to ${count} group`, event.threadID, event.messageID)
}
}