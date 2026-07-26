const axios = require("axios");
const fs = require("fs");
module.exports.config = {
    name: "scr",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MAVERICK",
    description: "Chụp ảnh profile của người dùng",
    commandCategory: "THÀNH VIÊN",
    usages: "",
    cooldowns: 5
}
module.exports.run = async function ({ api,Users,event, args }) {
  const name = await Users.getNameUser(event.senderID)
    api.sendMessage(`Đ𝐨̛̣𝐢 𝐛𝐨𝐭 𝐦𝐨̣̂𝐭 𝐭𝐢́ 𝐧𝐡𝐨́ ${name}!!`, event.threadID, event.messageID);
    var uid = String(args[0]);
    isNaN(uid) && (uid = Object.keys(event.mentions)[0], "message_reply" == event.type ? uid = event.messageReply.senderID : uid = event.senderID);
    var cookies = ``,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `datr=XqkhZMKDfSlmrGc0I8aAQbbK;sb=XqkhZE0kG2vPNemw244RcYmf;m_pixel_ratio=1.7000000476837158;fr=0QjkFbqzEWVsGr1BX.AWUi4I6cxxml2Y3TT9_zIOXDx4U.BkIale.9l.AAA.0.0.BkIata.AWU2Q4JuT_c;c_user=100077324397637;xs=40%3AKGuA-y7v0tjsRw%3A2%3A1679928154%3A-1%3A6274;m_page_voice=100077324397637;wd=424x799;locale=vi_VN;fbl_cs=AhATGDgJ6S8gzT9UVN%2BGYkacGGlGcDcvemdHOEZWZzNuUURoNVVXL2owdA;fbl_ci=920743639121072;vpd=v1%3B799x424x1.7000000476837158;fbl_st=101430347%3BT%3A27998803;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`thieutrungkien.dev/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=affe57&url=${url}&dimension=1366x768`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({ 	body: `====『 𝗖𝗔𝗣 𝗪𝗔𝗟𝗟 』====\n━━━━━━━━━━━━━━━━
『❗』𝐂𝐚𝐩 𝐱𝐨𝐧𝐠 𝐫𝐨̂̀𝐢 𝐧𝐞̀ ${name} ️🎉`,
                         attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
}