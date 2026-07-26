module.exports.config = {
  name: "pastebin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "kurumi",
  description: "Lấy link pastebin về cho admin",
  commandCategory: "Công cụ",
  usages: "pastebin",
  cooldowns: 5
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "lpstb.jpeg")) request("https://i.imgur.com/SqoXkHh.jpeg").pipe(fs.createWriteStream(dirMaterial + "lpstb.jpeg"));
  }
module.exports.run = async function({ api , event , args }) {
    console.log('Hello, world !');
};
module.exports.handleEvent = async function({ api , event , Users }) {
    const { body , senderID , threadID } = event;
  const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  const fs = require("fs");
    try {
        if (body === undefined || !body.includes('pastebin.com') || senderID == api.getCurrentUserID() || senderID == '') return;
        const userName = await Users.getNameUser(senderID);
        const { threadName } = await api.getThreadInfo(threadID);
        api.sendMessage(`📥=== [ 𝗟𝗜𝗡𝗞 𝗣𝗔𝗦𝗧𝗘𝗡𝗕𝗜𝗡 ] ===📥
━━━━━━━━━━━━━━━━━━
[⏰] ➜ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${tpkk}
[👥] ➜ 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${userName}
[🌍] ➜ 𝗡𝗵𝗼́𝗺: ${threadName}
[🌸] ➜ 𝗩𝘂̛̀𝗮 𝗴𝘂̛̉𝗶 𝗺𝗼̣̂𝘁 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗰𝗼́ 𝗰𝗵𝘂̛́𝗮 𝗹𝗶𝗻𝗸 𝗽𝗮𝘀𝘁𝗲𝗯𝗶𝗻
[💬] ➜ 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗰𝗵𝘂̛́𝗮 𝗹𝗶𝗻𝗸: ${body}`, 'https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN');
api.sendMessage({body: `📥=== [ 𝗟𝗜𝗡𝗞 𝗣𝗔𝗦𝗧𝗘𝗡𝗕𝗜𝗡 ] ===📥
━━━━━━━━━━━━━━━━━━
[⏰] ➜ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${tpkk}
[⚙️] ➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗽𝗵𝗮́𝘁 𝗵𝗶𝗲̣̂𝗻 𝗻𝗵𝗼́𝗺 𝗰𝗼́ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗴𝘂̛̉𝗶 𝗹𝗶𝗻𝗸 𝗽𝗮𝘀𝘁𝗲𝗯𝗶𝗻
[💓] ➜ 𝗧𝗶𝗲̂́𝗻 𝗵𝗮̀𝗻𝗵 𝗴𝘂̛̉𝗶 𝘃𝗲̂̀ 𝗰𝗵𝗼 𝗮𝗱𝗺𝗶𝗻 𝗵𝘂́𝗽`, attachment: fs.createReadStream(__dirname + `/noprefix/lpstb.jpeg`)}, event.threadID, event.messageID);
    } catch (e) {
        api.sendMessage(`${e}`, 'https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN');
    }
};