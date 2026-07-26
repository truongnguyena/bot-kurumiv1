module.exports.config = {
  name: "bacho",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "kurumi",
  description: "Đếm ngược đến sinh nhật Bác Hồ",
  commandCategory: "Công Cụ",
  cooldowns: 5
}

module.exports.run = function ({ event, api }) {
    const t = Date.parse("May 19, 2022 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`🥳𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗰𝗼̀𝗻 𝗹𝗮̣𝗶 𝘁𝗼̛́𝗶 𝘀𝗶𝗻𝗵 𝗻𝗵𝗮̣̂𝘁 𝗕𝗮́𝗰 𝗛𝗼̂̀🥳\n» ${days} 𝗻𝗴𝗮̀𝘆 ${hours} 𝘁𝗶𝗲̂́𝗻𝗴 ${minutes} 𝗽𝗵𝘂́𝘁 ${seconds} 𝗴𝗶𝗮̂𝘆 «`, event.threadID, event.messageID);
    }