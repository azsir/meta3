module.exports.config = {
	name: "system",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Zihad - ð¥",
	description: "Shows information about the hardware of the bot",
	commandCategory: "ð¢ADMINð¥",
	cooldowns: 5,
	dependencies: {
	"systeminformation": "",
	"pidusage": ""
	}
	};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}${units[l]}`;
}

module.exports.run = async function ({ api, event }) {
	const { cpu, time, cpuTemperature, currentLoad, memLayout, diskLayout, mem, osInfo } = global.nodemodule["systeminformation"];
	const timeStart = Date.now();

	try {
		const pidusage = await global.nodemodule["pidusage"](process.pid)
		var { manufacturer, brand, speedMax, physicalCores, cores } = await cpu();
		var { main: mainTemp } = await cpuTemperature();
		var { currentLoad: load } = await currentLoad();
		var { uptime } = await time();
		var diskInfo = await diskLayout();
		var memInfo = await memLayout();
		var { total: totalMem, available: availableMem } = await mem();
		var { platform: OSPlatform, build: OSBuild } = await osInfo();;
		var disk = [], i = 1;

		var hours = Math.floor(uptime / (60 * 60));
		var minutes = Math.floor((uptime % (60 * 60)) / 60);
		var seconds = Math.floor(uptime % 60);
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;

		for (const singleDisk of diskInfo) {
			disk.push(
				`==== ã ðððð ${i++} ã ====\n` +
				"ððð¦ð: " + singleDisk.name + "\n" +
				"ðð²ð©ð: " + singleDisk.interfaceType + "\n" + 
				"ðð¢ð³ð: " + byte2mb(singleDisk.size) + "\n" +
				"ððð¦ð©ðð«ðð­ð®ð«ð: " + singleDisk.temperature + "Â°C"
			)
		}

		return api.sendMessage(
			"====== ðð²ð¬ð­ðð¦ ðð§ðð¨ ======\n" +
			"==== ã ððð ã ====\n" +
			"ððð ðð¨ððð¥: " + manufacturer + " " + brand + " " + speedMax + "GHz\n" +
			"ðð¨ð«ðð¬: " + cores + "\n" +
			"ðð¡ð«ðððð¬: " + physicalCores + "\n" +
			"ððð¦ð©ðð«ðð­ð®ð«ð: " + mainTemp + "Â°C\n" +
			"ðð¨ðð: " + load.toFixed(1) + "%\n" +
			"ðð¨ðð ð®ð¬ðð ð: " + pidusage.cpu.toFixed(1) + "%\n" +
			"==== ã ðððððð ã ====\n" +
			"ðð¢ð³ð: " + byte2mb(memInfo[0].size) +
			"\nðð²ð©ð: " + memInfo[0].type +
			"\nðð¨ð­ðð¥: " + byte2mb(totalMem) +
			"\nðð¯ðð¢ð¥ððð¥ð: " + byte2mb(availableMem) +
			"\nðð¨ðð ð®ð¬ðð ð: " + byte2mb(pidusage.memory) + "\n" +
			disk.join("\n") + "\n" +
			"==== ã ðð ã ====\n" +
			"ðð¥ðð­ðð¨ð«ð¦: " + OSPlatform +
			"\nðð®ð¢ð¥ð: " + OSBuild +
			"\nðð©ð­ð¢ð¦ð: " + hours + ":" + minutes + ":" + seconds +
			"\nðð¢ð§ð : " + (Date.now() - timeStart) + "ms",
			event.threadID, event.messageID
		)
	}
	catch (e) {
		console.log(e)
	}
}