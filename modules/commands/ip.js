module.exports.config = {
  name: "ip",	
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "NTKhang",
  description: "Xem thông tin ip của bạn hoặc ip khác", 
  commandCategory: "Công Cụ",
  usages: "",
  cooldowns: 5, 
  dependencies: "",
};

module.exports.run = async function({ api, args, event, __GLOBAL }) {
  const timeStart = Date.now();

    const axios = require("axios");
  if (!args[0]) {api.sendMessage("Vui lòng nhập ip bạn muốn kiểm tra",event.threadID, event.messageID);}
  else {
var infoip = (await axios.get(`http://ip-api.com/json/${args.join(' ')}?fields=66846719`)).data;
       if (infoip.status == 'fail')
         {api.sendMessage(`Đã xảy ra lỗi: ${infoip.message}`, event.threadID, event.messageID)}
          else {
            /////////////////
          //////////////////
 api.sendMessage({body:`======[ 𝐂𝐡𝐞𝐜𝐤 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧 ]=====

 🗺️ 𝗖𝗵𝗮̂𝘂 𝗹𝘂̣𝗰: ${infoip.continent}
🏳️ 𝗤𝘂𝗼̂́𝗰 𝗴𝗶𝗮: ${infoip.country}
🎊 𝗠𝗮̃ 𝗤𝗚: ${infoip.countryCode}
🕋 𝗞𝗵𝘂 𝘃𝘂̛̣𝗰: ${infoip.region}
⛱️ 𝗩𝘂̀𝗻𝗴/𝗧𝗶𝗲̂̉𝘂 𝗯𝗮𝗻𝗴: ${infoip.regionName}
🏙️ 𝗧𝗵𝗮̀𝗻𝗵 𝗽𝗵𝗼̂́: ${infoip.city}
🛣️ 𝗤𝘂𝗮̣̂𝗻/𝗛𝘂𝘆𝗲̣̂𝗻: ${infoip.district}
📮 𝗠𝗮̃ 𝗯𝘂̛𝘂: ${infoip.zip}
🧭 𝗟𝗮𝘁𝗶𝘁𝘂𝗱𝗲: ${infoip.lat}
🧭 𝗟𝗼𝗻𝗴𝗶𝘁𝘂𝗱𝗲: ${infoip.lon}
⏱️ 𝗧𝗶𝗺𝗲𝘇𝗼𝗻𝗲: ${infoip.timezone}
👨‍✈️ 𝗧𝗲̂𝗻 𝘁𝗼̂̉ 𝗰𝗵𝘂̛́𝗰: ${infoip.org}
💵 𝗖𝘂𝗿𝗿𝗲𝗻𝗰𝘆 𝘂𝗻𝗶𝘁: ${infoip.currency}
`,location: {
        latitude: infoip.lat,
        longitude: infoip.lon,
        current: true
      }}
,event.threadID, event.masageID);}
        }

                  }







