module.exports.config = {
	name: "log",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "zihad - π₯",
	description: "Command for logging purposes.",
	commandCategory: "π’ADMINπ₯",
	usages: "",
	cooldowns: 3,
	dependencies: {}
};

module.exports.run = async function ({ api, event, Threads, getText }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, senderID } = event;
  //if (senderID == global.data.botID) return;

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  //console.log(data)
  //var prefix = data.PREFIX;
  var rankup = data.rankup;
  var resend = data.resend;
  var log = data.log;
  var tagadmin = data.tagadmin;
  var guard = data.guard;
  var antiout = data.antiout;
  //prefix == null ? rankup = `!` : rankup = `${prefix}`;
  log == null ? log = `true` : log = `${log}`;
  rankup == null ? rankup = `false` : rankup = `${rankup}`;
  resend == null ? resend = `false` : resend = `${resend}`;
  tagadmin == null ? tagadmin = `true` : tagadmin = `${tagadmin}`;
  guard == null ? guard = `true` : guard = `${guard}`;
  antiout == null ? antiout = `true` : antiout = `${antiout}`;
return api.sendMessage(`α α β£οΈTable β£οΈ \n\n\nπβββββ’π¦β’ ββββπ\nβ― π Log: ${log}\nβ― π Rankup: ${rankup}\nβ― π Resend: ${resend}\nβ― π₯ Tag admin: ${tagadmin}\nβ― π Antirobbery ${guard}\nβ― π Antiout: ${antiout}\nπβββββ’π¦β’ ββββπ`, threadID, messageID);
}
