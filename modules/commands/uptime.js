module.exports.config = {
  name: "uptime",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Vihoo",
  description: "",
  commandCategory: "Tiện ích",
  usages: "",
  cooldowns: 0,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};
function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.handleEvent = async ({
  event,
  api,
  Users
}) => {
  const fs = global.nodemodule["fs-extra"];
  const moment = require('moment-timezone');
  const timeStart = Date.now();
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
  var thu =
moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
  var {
    threadID,
    messageID,
    body,
    senderID
  } = event;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["upt"] !== "undefined" && thread["upt"] == false) return;
const axios = require('axios')
  const pidusage = await global.nodemodule["pidusage"](process.pid);
  let name = await Users.getNameUser(event.senderID);
  if (senderID == api.getCurrentUserID()) return;
const namebot = config.BOTNAME;
  const PREFIX = config.PREFIX;
  const { commands } = global.client; 
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `==「𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗢𝗕𝗢𝗧」==\n👩‍💻 Hiện tại ${global.config.BOTNAME} đã online được\n→ ${hours} giờ ${minutes} phút ${seconds} giây\n━━━━━━━━━━━━\n👾➠ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴: ${global.config.PREFIX}\n👤➠ 𝗦𝗼̂́ 𝗔𝗱𝗺𝗶𝗻: ${global.config.ADMINBOT.length}\n🔗➠ 𝗧𝗼̂̉𝗻𝗴 𝗹𝗲̣̂𝗻𝗵: ${commands.size}\n👥➠ 𝗧𝗼̂̉𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶: ${global.data.allUserID.length}\n🏟️➠ 𝗧𝗼̂̉𝗻𝗴 𝗻𝗵𝗼́𝗺:${global.data.allThreadID.length}\n💻➠ 𝗖𝗣𝗨: ${pidusage.cpu.toFixed(1)}%\n🧩➠ 𝗥𝗮𝗺: ${byte2mb(pidusage.memory)}\n⚙️➠ 𝗣𝗶𝗻𝗴: ${Date.now() - timeStart}ms\n====🖥️ 𝗦𝗬𝗦𝗧𝗘𝗠 🖥️====\n⛩️➠ 𝗕𝗼𝘁 𝗧𝘆𝗽𝗲: kurumi\n🛸➠ 𝗣𝗿𝗲𝗳𝗶𝘅 : ${PREFIX}\n💾➠ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: 1.2.14\n━━━━━━━━━━━━\n➠ Bây giờ là: ${gio} ${thu}`,
    attachment: undefined
  };
  try {
    const videoMeta = await global.nodemodule["axios"]('https://api.sumiproject.net/video/videoanime');
    if (videoMeta.data && videoMeta.data.url) {
      msg.attachment = (await global.nodemodule["axios"]({
        url: videoMeta.data.url,
        method: "GET",
        responseType: "stream"
      })).data;
    }
  } catch (e) {}
  // Gọi bot
  var arr = ["uptime","upt"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });
};

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "upt thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "hi success!",
  }
}

module.exports.run = async function({
  api,
  event,
  Threads,
  getText
}) {
  const {
    threadID,
    messageID
  } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["upt"] == "undefined" || data["upt"] == true) data["upt"] = false;
  else data["upt"] = true;

  await Threads.setData(threadID, {
    data
  });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["upt"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}