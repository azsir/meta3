module.exports.config = {
    name: "🚫 Anti-Out",
    eventType: ["log:unsubscribe"],
    version: "1.0.0",
    credits: "🥀 Zihad",
    description: "Prevents members from leaving the group"
  };
  
  module.exports.run = async ({ event, api, Threads, Users }) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (!data.antiout) return;
  
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "being kicked by the administrator";
  
    if (type == "self-separation") {
      api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
        if (error) {
          api.sendMessage(`❌ Unable to re-add member ${name} to the group.`, event.threadID)
        } else {
          const gifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDUyYjdmYjNjOTM5OTgxZmIyN2RmZjg4MmNhNjQ1Yzk4YjFmM2Q3YSZjdD1n/X3zJUXUgaCTNPLZ1wJ/giphy.gif";
          api.sendMessage({
            body: `🚫 Anti-out mode is active! ${name} has been re-added to the group.`,
            attachment: {
              type: "animated_image",
              payload: {
                url: gifUrl
              }
            }
          }, event.threadID);
        }
      })
    }
  }
  
