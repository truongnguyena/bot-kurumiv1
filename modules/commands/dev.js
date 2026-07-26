module.exports.config = {
	name: "dev",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "?",
	description: "Gửi tin nhắn tới các nhóm(reply vào ảnh/video cần gửi kèm)!",
	commandCategory: "Dev",
	usages: "tin nhắn",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"sendSuccess": "𝗚𝘂̛̉𝗶 𝗧𝗶𝗻 𝗧𝘂̛́𝗰 𝗧𝗼̛́𝗶 %1 𝗡𝗵𝗼́𝗺",
		"sendFail": "𝗞𝗵𝗼̂𝗻𝗴 𝗧𝗵𝗲̂̉ 𝗚𝘂̛̉𝗶 𝗧𝗶𝗻 𝗧𝘂̛́𝗰 𝗧𝗼̛́𝗶 %1 𝗡𝗵𝗼́𝗺"
	},
	"en": {
		"sendSuccess": "Sent message to %1 thread!",
		"sendFail": "[!] Can't send message to %1 thread"
	}
}

module.exports.run = async ({ api, event, args, getText, Users }) => {
  const permission = ["100041651315453", "100083897637232"];
             if (!permission.includes(event.senderID))
             return api.sendMessage("", event.threadID, event.messageID);
  const name = await Users.getNameUser(event.senderID)
const moment = require("moment-timezone");
      var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");  
if (event.type == "message_reply") {
const request = global.nodemodule["request"];
const fs = require('fs')
const axios = require('axios')
			var getURL = await request.get(event.messageReply.attachments[0].url);
			
					var pathname = getURL.uri.pathname;
var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
			
					var path = __dirname + `/cache/snoti`+`.${ext}`;


var abc = event.messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;

  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));

	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage({body:`〈 𝗡𝗵𝗮̀ 𝗣𝗵𝗮́𝘁 𝗧𝗿𝗶𝗲̂̉𝗻 - 𝗗𝗘𝗩 〉
              𝗧𝗵𝗼̂𝗻𝗴 𝗕𝗮́𝗼\n\n➜ ` + args.join(` `) + ``,attachment: fs.createReadStream(path) }, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID);

}
else {
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage(`〈 𝗡𝗵𝗮̀ 𝗣𝗵𝗮́𝘁 𝗧𝗿𝗶𝗲̂̉𝗻 - 𝗗𝗘𝗩 〉
              𝗧𝗵𝗼̂𝗻𝗴 𝗕𝗮́𝗼\n\n➜ ` + args.join(` `) + ``, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID); }
                 }