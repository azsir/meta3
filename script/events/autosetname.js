module.exports.config = {
	name: "autosetname",
	eventType: ["log:subscribe"],
	version: "1.0.3",
	credits: "D-Jukie 😎",
	description: "Automatically set new member nicknames 🆕"
};

module.exports.run = async function({ api, event, Users }) {
	const { threadID } = event;
	const memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId);
	for (const idUser of memJoin) {
		const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
		const { join } = global.nodemodule["path"];
		const pathData = join("./modules/commands","cache", "autosetname.json");
		const dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
		const thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: ["Meta fan"] };
		if (thisThread.nameUser.length != 0) {  
			const setName = thisThread.nameUser[0];
			await new Promise(resolve => setTimeout(resolve, 1000));
			const namee1 = await api.getUserInfo(idUser);
			const namee = namee1[idUser].name;
			api.changeNickname(`${setName} ${namee}`, threadID, idUser);
		} 
	}	
	return api.sendMessage(`Set a temporary nickname for the new member 🆕`, threadID, event.messageID);
};
