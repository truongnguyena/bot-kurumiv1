module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "kurumi",
  description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "randomimg");
  if (existsSync(path)) mkdirSync(path, { recursive: true });	

  const path2 = join(__dirname, "cache", "randomimg");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event, Users, Threads }) {
    const { join } = global.nodemodule["path"];
  const { threadID } = event;
  var fullYear = global.client.getTime("fullYear");
    var getHours = await global.client.getTime("hours");
  var getData = await Users.getData(event.author)
       var nameAuthor = typeof getData.name == "undefined" ? "link join" : getData.name
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] ➜ ${(!global.config.BOTNAME) ? "Bot của kurumi <3" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    return api.sendMessage(`⫸ 𝑲𝒆̂́𝒕 𝒏𝒐̂́𝒊 𝒕𝒉𝒂̀𝒏𝒉 𝒄𝒐̂𝒏𝒈 ⫷\n●▬▬▬▬▬๑⇩⇩๑▬▬▬▬▬●\n[⚜️]➜ 𝓛𝓾𝓪̣̂𝓽 𝓑𝓸𝓽 kurumi [⚜️]➜\n[⚜️]➜ 𝐻𝑎̣𝑛 𝑐ℎ𝑒̂́ 𝑠𝑝𝑎𝑚\[⚜️]➜ 𝐃𝐚𝐧𝐡 𝐬á𝐜𝐡 𝐥ệ𝐧𝐡 #help và #menu\n●▬▬▬▬▬๑⇧⇧๑▬▬▬▬▬●
\n❛━━･❪ 𝑷𝒓𝒆𝒇𝒊𝒙 [ ${global.config.PREFIX} ]❫･━━❜\n[⚜️]➜ 𝑴𝒐̣𝒊 𝒕𝒉𝒂̆́𝒄 𝒎𝒂̆́𝒄 𝒍𝒊𝒆̂𝒏 𝒉𝒆̣̂ 𝒂𝒅𝒎𝒊𝒏: https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN \n[⚜️]➜ 𝑋𝑒𝑚 𝑡ℎ𝑜̂𝑛𝑔 𝑡𝑖𝑛 𝐴𝐷𝑀𝐼𝑁𝐵𝑂𝑇 𝑣𝑎̀ 𝐵𝑜𝑡: ${global.config.PREFIX}bot và ${global.config.PREFIX}ad\n[⚜️]➜ 𝑄𝑇𝑉 𝑐𝑜́ 𝑡ℎ𝑒̂̉ 𝑑𝑢̀𝑛𝑔 '${global.config.PREFIX}ℎ𝑒𝑙𝑝 𝑟𝑢𝑙𝑒' đ𝑒̂̉ 𝑥𝑒𝑚 ℎ𝑢̛𝑜̛́𝑛𝑔 𝑑𝑎̂̃𝑛 𝑣𝑎̀ 𝑠𝑒𝑡 𝑏𝑎̉𝑛𝑔 𝑙𝑢𝑎̣̂𝑡 𝑏𝑜𝑥\n[⚜️]➜ 𝑇ℎ𝑎̀𝑛ℎ 𝑣𝑖𝑒̂𝑛 𝑑𝑢̀𝑛𝑔 '${global.config.PREFIX}𝑟𝑢𝑙𝑒' đ𝑒̂̉ 𝑥𝑒𝑚 𝑙𝑢𝑎̣̂𝑡 𝑏𝑜𝑥 𝑐𝑢̉𝑎 𝑚𝑖̀𝑛ℎ\n◆━━━━━━━━━━━━━◆\n[⚜️]➜ 𝐓𝐡𝐢𝐬 𝐛𝐨𝐭 𝐦𝐚𝐝𝐞 𝐛𝐲 kurumi. 𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐟𝐨𝐫 𝐮𝐬𝐢𝐧𝐠\n[⚜️]➜ 𝙰𝚍𝚖𝚒𝚗: trường nguyễn`, threadID);
  }
  else {
    try {
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      const moment = require("moment-timezone");
      const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
      const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "cache", "randomimg", "randomimg");
      const pathGif = join(path, `${threadID}`);

      var mentions = [], nameArray = [], memLength = [], iduser = [], id = 0; i = 0;

      for (id in event.logMessageData.addedParticipants) {
        const { join } = global.nodemodule["path"];
        const cc = event.logMessageData.addedParticipants.join.id(" ");
    const userName = event.logMessageData.addedParticipants[id].fullName;
        iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        if (!global.data.allUserID.includes(id)) {
          await Users.createData(id, { name: userName, data: {} });
          global.data.allUserID.push(id);
          logger(global.getText("handleCreateDatabase", "newUser", id), "[ DATABASE ]");
      }
        memLength.push(participantIDs.length - i++);
        if (!global.data.allUserID.includes(id)) {
          await Users.createData(id, { name: userName, data: {} });
          global.data.userName.set(id, userName);
          global.data.allUserID.push(id);
        }
      }
      memLength.sort((a, b) => a - b);		
    (typeof threadData.customJoin == "undefined") ? msg = "[⚜️]=== 『 𝐉𝐎𝐈𝐍 𝐍𝐎𝐓𝐈 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ 𝐻𝑖 {type} {name}.\n[✌️]➜ 𝐶ℎ𝑎̀𝑜 𝑚𝑢̛̀𝑛𝑔 {type} đ𝑎̃ đ𝑒̂́𝑛 𝑣𝑜̛́𝑖 {threadName}.\n[🪪]➜ 𝑈𝑟𝑙 𝐹𝑎𝑐𝑒𝑏𝑜𝑜𝑘: {uid}\n[🔎]➜ 𝑈𝐼𝐷 𝐹𝑎𝑐𝑒𝑏𝑜𝑜𝑘: {iduser}\n[❗]➜ 𝑇𝑢̛̀ 𝑛𝑎𝑦 {name} 𝑠𝑒̃ 𝑙𝑎̀ 𝑡ℎ𝑎̀𝑛ℎ 𝑣𝑖𝑒̂𝑛 𝑡ℎ𝑢̛́ {soThanhVien} 𝑐𝑢̉𝑎 𝑛ℎ𝑜́𝑚 {threadName}\n[💥]➜ 𝐂𝐚̂́𝐦 𝐬𝐩𝐚𝐦 𝐛𝐨𝐭 𝐡𝐚𝐲 𝐜𝐡𝐮̛̉𝐢 𝐛𝐨𝐭 𝐭𝐡𝐢̀ 𝐬𝐞̃ 𝐚̆𝐧 𝐛𝐚𝐧 𝐡𝐨𝐚̣̆𝐜 𝐪𝐭𝐯 𝐛𝐨𝐬𝐬 𝐬𝐞̃ 𝐤𝐢𝐜𝐤 𝐤𝐡𝐨̉𝐢 𝐛𝐨𝐱\n◆━━━━━━━━━━━━━◆\n[❤️]➜ 𝐶ℎ𝑢́𝑐 {type} 𝑐𝑜́ 𝑚𝑜̣̂𝑡 𝑏𝑢𝑜̂̉𝑖 {session} || {time} 𝑣𝑢𝑖 𝑣𝑒̉\n[👉]➜ 𝑁𝑔𝑎̀𝑦 𝑣𝑎̀𝑜: {fullYear} || {time}\n◆━━━━━━━━━━━━━◆\n[📍]➜ {name} đ𝑢̛𝑜̛̣𝑐 𝑡ℎ𝑒̂𝑚 𝑏𝑜̛̉𝑖: {author}\n[🔗]➜ 𝐿𝑖𝑛𝑘 𝑓𝑎𝑐𝑒𝑏𝑜𝑜𝑘 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑡ℎ𝑒̂𝑚: https://www.facebook.com/profile.php?id={uidfb}": msg = threadData.customJoin;
      msg = msg
                .replace(/\{iduser}/g, iduser)
                .replace(/\{name}/g, nameArray.join(' • '))
                .replace(/\{type}/g, (memLength.length > 1) ? '𝒄𝒂́𝒄 𝒄ậ𝒖' : '𝒄ậ𝒖')
                .replace(/\{soThanhVien}/g, memLength.join(' • '))
                .replace(/\{threadName}/g, threadName)
                .replace(/\{session}/g, hours <= 10 ? "𝑠𝑎́𝑛𝑔" : 
    hours > 10 && hours <= 12 ? "𝑡𝑟𝑢̛𝑎" :
    hours > 12 && hours <= 18 ? "𝑐ℎ𝑖𝑒̂̀𝑢" : "𝑡𝑜̂́𝑖")
                .replace(/\{fullYear}/g, fullYear)
                .replace(/\{uid}/g, event.logMessageData.addedParticipants.map(i => 'https://www.facebook.com/profile.php?id=' + i.userFbId).join('\n'))
      .replace(/\{author}/g, nameAuthor)
      .replace(/\{uidfb}/g, event.author)
                .replace(/\{time}/g, time);  



      if (existsSync(path)) mkdirSync(path, { recursive: true });

      const randomPath = readdirSync(join(__dirname, "cache", "randomimg"));

      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
      else if (randomPath.length != 0) {
        const pathRandom = join(__dirname, "cache", "randomimg", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
        formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
      }
      else formPush = { body: msg, mentions }

      return api.sendMessage(formPush, threadID);

    } catch (e) { return console.log(e) };
  }
                       }