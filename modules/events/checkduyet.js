const fse = require("fs-extra")
const approved = __dirname + "/../commands/hethong/approvedThreads.json"
module.exports.config = {
    name: "checkduyet",
    eventType: ["log:subscribe"],
    version: "1.1.1",
    credits: "DC-Nam",
    description: "Noti check duyệt"
};
module.exports.run = async function({
    api,
    event,
    Users
}) {
    const moment = require("moment-timezone");//D/MM/YYYY
	var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
  const fs = require("fs");
  const folderRandomImage = __dirname + "/cache/image/";
  const allImage = fs.readdirSync(folderRandomImage);
    const { threadID, logMessageData} = event
    const { PREFIX } = global.config
    const { getCurrentUserID: botID, sendMessage: send, unsendMessage: unsend} = api
    let data = JSON.parse(fse.readFileSync(approved))
    if (logMessageData.addedParticipants.find(i => i.userFbId == botID())) {
        send("Hệ thống đang kiểm duyệt . . .", event.threadID, (error, info) => {
            setTimeout(function() {
                unsend(info.messageID)
                if (!data.includes(threadID))  api.sendMessage("", event.threadID, () => api.sendMessage(/*{body:*/`𝗞𝗲̂́𝘁 𝗻𝗼̂́𝗶 𝘁𝗵𝗮̂́𝘁 𝗯𝗮̣𝗶 :((\n𝗡𝗵𝗼́𝗺 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗻𝗮̆̀𝗺 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 đ𝘂̛𝗼̛̣𝗰 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗯𝗼𝘁\n\n𝗩𝘂𝗶 𝗟𝗼̀𝗻𝗴 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗗𝗠𝗜𝗡:\nhttps://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN`/*, attachment: fs.createReadStream(`${folderRandomImage}/${allImage[Math.floor(Math.random() * allImage.length)]}`)} */,threadID));
                else return api.sendMessage("", event.threadID, () => api.sendMessage(/*{body:*/`🍎𝗞𝗲̂́𝘁 𝗻𝗼̂́𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗕𝗼𝘅\n𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝘀𝗮̀𝗶 𝗯𝗼𝘁 𝘃𝘂𝗶 𝘃𝗲̉\n Lúc: ${gio}\nDấu lệnh: ${PREFIX} \n\n𝗧𝗵𝗮̉ ❤️ 𝘃𝗮̀𝗼 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗯𝗼𝘁 𝗻𝗼́ 𝘀𝗲̃ 𝘁𝘂̛̣ 𝗴𝗼̛̃ 𝗱𝗮̂́𝘆 =))`/*, attachment: fs.createReadStream(`${folderRandomImage}/${allImage[Math.floor(Math.random() * allImage.length)]}`)} */,threadID));
            }, 1000);
        })
    } else return
}

