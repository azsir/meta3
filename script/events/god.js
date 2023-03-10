module.exports.config = {
	name: "god",
	eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
	version: "1.0.0",
	credits: "Made with ā¤ļø by Zihad š„",
	description: "š Record bot activity notifications!"
};

module.exports.run = async function({ api, event, Threads }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "š **Bot Notification** š" +
                        "\n\nš¬ Thread ID: " + event.threadID +
                        "\nš¤ Action: {task}" +
                        "\nšāāļø Action created by userID: " + event.author +
                        "\nš°ļø " + Date.now() +" š°ļø",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Name does not exist",
                    newName = event.logMessageData.name || "Name does not exist";
            task = "š User changes group name from: '" + oldName + "' to '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "š The user added the bot to a new group!";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "š„ The user kicked the bot out of the group!";
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);
    var god = "100052086120278";

    return api.sendMessage(formReport, god, (error, info) => {
        if (error) return logger(formReport, "š [ Logging Event ]");
    });
}
