module.exports.config = {
	name: "delTime",
	eventType: ["log:unsubscribe"],
	version: "beta",
	credits: "zihad - 🥀",
	description: "Automatically delete data time join user when out"
};

const fs = require("fs");
const path = __dirname + "/../commands/cache/timeJoin.json";

module.exports.run = async function({ event }) {
	const { threadID, logMessageData } = event;
	const userID = logMessageData.leftParticipantFbId;
	const { writeFileSync, readFileSync } = fs;
	const { stringify, parse } = JSON;

	let data = parse(readFileSync(path));

	data[userID + threadID] = "";

	writeFileSync(path, stringify(data, null, 2));
}
