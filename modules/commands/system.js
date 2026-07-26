module.exports.config = {
	name: "system",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "JRT",
	description: "Xem thông tin phần cứng mà bot đang sử dụng",
	commandCategory: "Thông tin",
	cooldowns: 5,
	dependencies: {
		"systeminformation": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}${units[l]}`;
}

module.exports.run = async function ({ api, event }) {
	const { cpu, cpuTemperature, currentLoad, memLayout, diskLayout, mem, osInfo } = global.nodemodule["systeminformation"];
	const timeStart = Date.now();

	try {
		var { manufacturer, brand, speed, physicalCores, cores } = await cpu();
		var { main: mainTemp } = await cpuTemperature();
		var { currentLoad: load } = await currentLoad();
		var diskInfo = await diskLayout();
		var memInfo = await memLayout();
		var { total: totalMem, available: availableMem } = await mem();
		var { platform: OSPlatform, build: OSBuild } = await osInfo();

		var time = process.uptime();
		var hours = Math.floor(time / (60 * 60));
		var minutes = Math.floor((time % (60 * 60)) / 60);
		var seconds = Math.floor(time % 60);
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;

		return api.sendMessage(
			"===[ System Info ]===" +
			"\n[⚜️] CPU [⚜️]" +
			"\n➜ CPU Model: " + manufacturer + brand +
			"\n➜ Speed: " + speed + "GHz" +
			"\n➜ Cores: " + physicalCores +
			"\n➜ Threads: " + cores +
			"\n➜ Temperature: " + mainTemp + "°C" +
			"\n➜ Load: " + load.toFixed(1) + "%" +
			"\n[⚜️] MEMORY [⚜️]" +
			"\n➜ Size: " + byte2mb(memInfo[0].size) +
			"\n➜ Type: " + memInfo[0].type +
			"\n➜ Total: " + byte2mb(totalMem) +
			"\n➜ Available: " + byte2mb(availableMem) +
			"\n[⚜️] DISK [⚜️]" +
			"\n➜ Name: " + diskInfo[0].name +
			"\n➜ Size: " + byte2mb(diskInfo[0].size) +
			"\n➜ Temperature: " + diskInfo[0].temperature + "°C" +
			"\n[⚜️] OS [⚜️]" +
			"\n➜ Platform: " + OSPlatform +
			"\n➜ Build: " + OSBuild +
			"\n➜ Uptime: " + hours + ":" + minutes + ":" + seconds +
			"\n➜ Ping: " + (Date.now() - timeStart) + "ms",
			event.threadID, event.messageID)
	}
	catch (e) {
		console.log(e)
	}
}