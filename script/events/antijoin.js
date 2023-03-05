module.exports.config = {
	name: "🚫 Anti-Join",
	eventType: ["log:subscribe"],
	version: "1.0.0",
	credits: "🥀 Zihad",
	description: "Prevents new members from joining the group"
  };
  
  module.exports.run = async function ({ event, api, Threads, Users }) {
	let data = (await Threads.getData(event.threadID)).data;
	if (!data.newMember) return;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) return;
  
	else if (data.newMember) {
	  var memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId);
  
	  for (let idUser of memJoin) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		api.removeUserFromGroup(idUser, event.threadID, async function (err) {
		  if (err) {
			return data["newMember"] = false;
		  } else {
			await Threads.setData(event.threadID, { data });
			global.data.threadData.set(event.threadID, data);
		  }
		});
	  }
  
	  return api.sendMessage(`🚫 Anti-join mode is now enabled. Please disable it before adding new members.`, event.threadID);
	}
  }
  
