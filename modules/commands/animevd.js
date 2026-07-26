module.exports.config = {
  name: "animevd",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Drasew",
  description: "cc",
  commandCategory: "Random-Video",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://ApiVdAnime.vnhoang06.repl.co/mp4').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `Video 𝗻𝗲̀ thg db <𝟯`,
            attachment: fs.createReadStream(__dirname + `/cache/1.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/1.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/1.${ext}`)).on("close", callback);
      })
}