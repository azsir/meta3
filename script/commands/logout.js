module.exports.config = {
    name: "logout",
    version: "1.0.1",
    hasPermission: 2,
    credits: "zihad - 🥀",
    description: "Logout the bot account.",
    commandCategory: "💢ADMIN🔥",
    usage: "",
    cooldowns: 0
    };

module.exports.run = async function({ api, event })
{
api.sendMessage("Logout ...",event.threadID,event.messageID)
api.logout()
}