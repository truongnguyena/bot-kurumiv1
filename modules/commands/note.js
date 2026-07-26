class Judas {
  get config() {
    return {
      name: "note",
      version: "1.1.2",
      hasPermssion: 3,
      credits: "Raiden Makoto",
      description: "Upload code lên runmocky",
      commandCategory: "Tiện ích",
      usages: "",
      cooldowns: 5
    }
  }

  async run({ event, api, args, Users }) {
    const permission = ["100041651315453"];
      if (!permission.includes(event.senderID)) return api.sendMessage("[ 𝗗𝗘𝗩 𝗠𝗢𝗗𝗘 ] Lệnh này chỉ dành cho 𝗡𝗵𝗮̀ 𝗣𝗵𝗮́𝘁 𝗧𝗿𝗶𝗲̂̉𝗻 💻", event.threadID, event.messageID);
    const axios = require('axios');
    const fs = require('fs');
    var contents = args.join(" ")
    if (!contents) {
  return api.sendMessage('thiếu dữ liệu text!', event.threadID, event.messageID);
  }
if(contents.endsWith(".js")){
 var data = fs.readFile(
          `${__dirname}/${contents}`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`Lệnh ${contents} không tồn tại!.`, event.threadID, event.messageID);
        axios.post("https://api.mocky.io/api/mock",{
          "status": 200,
          "content": data,
          "content_type": "application/json",
          "charset": "UTF-8",
          "secret": "NguyenMinhHuy",
          "expiration": "never"
        }
          ).then(function(response) {
  return api.sendMessage(`Kết quả: ${response.data.link}`, event.threadID, event.messageID);
 })}
        );
        return
} else {
  axios.post("https://api.mocky.io/api/mock",{
          "status": 200,
          "content": contents,
          "content_type": "application/json",
          "charset": "UTF-8",
          "secret": "NguyenMinhHuy",
          "expiration": "never"
        }
          ).then(function(response) {
  return api.sendMessage(`Kết quả: ${response.data.link}`, event.threadID, event.messageID);
 })
}
}
}
module.exports = new Judas();