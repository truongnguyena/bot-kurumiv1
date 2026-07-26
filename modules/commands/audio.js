module.exports.config = {
  name: "audio",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "CatalizCS",//mod sing by Jukie
  description: "Phát video thông qua link YouTube hoặc từ khoá tìm kiếm",
  commandCategory: "Tiện Ích",
  usages: "[Text]",
  cooldowns: 10,
  dependencies: {
    "ytdl-core": "",
    "simple-youtube-api": "",
    "fs-extra": "",
    "axios": ""
  },
  envConfig: {
    "YOUTUBE_API": "AIzaSyBKgc6dhJ7kn4cSxqVOckkGFL0h4cryxKQ"
  }	
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const ytdl = global.nodemodule["ytdl-core"];
  const { createReadStream, createWriteStream, unlinkSync, statSync } = global.nodemodule["fs-extra"];
  ytdl.getInfo(handleReply.link[event.body - 1]).then(res => {
  let body = res.videoDetails.title;
  api.sendMessage(`━━━━━━━━━━━━━━━\n===『 𝐕𝐮𝐢 𝐋𝐨̀𝐧𝐠 𝐂𝐡𝐨̛̀ 𝐇𝐞̣̂ 𝐓𝐡𝐨̂́𝐧𝐠 𝐗𝐮̛̉ 𝐋𝐲́ 』===\n━━━━━━━━━━━━━━━`, event.threadID, (err, info) =>
  setTimeout(() => {api.unsendMessage(info.messageID) } , 10005));
    });
  try {
    ytdl.getInfo(handleReply.link[event.body - 1]).then(res => {
    let body = res.videoDetails.title;
    ytdl(handleReply.link[event.body - 1])
      .pipe(createWriteStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`))
      .on("close", () => {
        if (statSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`).size > 26214400) return api.sendMessage('❗Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`), event.messageID);
        else return api.sendMessage({body : `━━━━━━━━━━━━━━━\n${body}\n━━━━━━━━━━━━━━━\n===『𝐂𝐡𝐮́𝐜 𝐁𝐚̣𝐧 𝐍𝐠𝐡𝐞 𝐍𝐡𝐚̣𝐜 𝐕𝐮𝐢 𝐕𝐞̉ 』===\n━━━━━━━━━━━━━━━`, attachment: createReadStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`)}, event.threadID, () => unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`), event.messageID)
      })
      .on("error", (error) => api.sendMessage(`❕Đã xảy ra vấn đề khi đang xử lý request, lỗi: \n${error}`, event.threadID, event.messageID));
  });
  }
  catch {
    api.sendMessage("❌Không thể xử lý yêu cầu của bạn!", event.threadID, event.messageID);
  }
  return api.unsendMessage(handleReply.messageID);
}

module.exports.run = async function({ api, event, args }) {
  const ytdl = global.nodemodule["ytdl-core"];
  const YouTubeAPI = global.nodemodule["simple-youtube-api"];
  const { createReadStream, createWriteStream, unlinkSync, statSync } = global.nodemodule["fs-extra"];

  const youtube = new YouTubeAPI(global.configModule[this.config.name].YOUTUBE_API);
  const keyapi = global.configModule[this.config.name].YOUTUBE_API

  if (args.length == 0 || !args) return api.sendMessage('📢Phần tìm kiếm không được để trống!', event.threadID, event.messageID);
  const keywordSearch = args.join(" ");
  const videoPattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
  const urlValid = videoPattern.test(args[0]);

  if (urlValid) {
    try {
            var id = args[0].split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      (id[2] !== undefined) ? id = id[2].split(/[^0-9a-z_\-]/i)[0] : id = id[0];
      ytdl(args[0])
        .pipe(createWriteStream(__dirname + `/cache/${id}.m4a`))
        .on("close", () => {
          if (statSync(__dirname + `/cache/${id}.m4a`).size > 26214400) return api.sendMessage('❗Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${id}.m4a`), event.messageID);
          else return api.sendMessage({attachment: createReadStream(__dirname + `/cache/${id}.m4a`)}, event.threadID, () => unlinkSync(__dirname + `/cache/${id}.m4a`) , event.messageID)
        })
        .on("error", (error) => api.sendMessage(`❕Đã xảy ra vấn đề khi đang xử lý request, lỗi: \n${error}`, event.threadID, event.messageID));
    }
    catch {
      api.sendMessage("❌Không thể xử lý yêu cầu của bạn!", event.threadID, event.messageID);
    }

  }
  else {
    try {
      var link = [], msg = "", num = 0, numb = 0;
      var imgthumnail = [];
      var results = await youtube.searchVideos(keywordSearch, 6);
      for (let value of results) {
        if (typeof value.id == 'undefined') return;
        link.push(value.id);
        var idd = value.id;
        let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
  let gettime = datab.items[0].contentDetails.duration;
  let time = (gettime.slice(2));
        /////////////////////
        let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=${keyapi}`)).data;
  let channel = datac.items[0].snippet.channelTitle;
let folderthumnail = __dirname + `/cache/${numb+=1}.png`;

let linkthumnail = `https://img.youtube.com/vi/${value.id}/maxresdefault.jpg`;

let getthumnail = (await axios.get(`${linkthumnail}`, { responseType: 'arraybuffer' })).data;





  fs.writeFileSync(folderthumnail, Buffer.from(getthumnail, 'utf-8'));

  imgthumnail.push(fs.createReadStream(__dirname + `/cache/${numb}.png`));
        /////=//////////////
        msg += (`『${num+=1}』 ${value.title}\n『⏱️』: ${time}\n『🌸』: ${channel}\n━━━━━━━━━━━━━━━\n\n`);
      }

      var body = `»🔎 𝐂𝐨́ 【${link.length}】𝐤𝐞̂́𝐭 𝐪𝐮𝐚̉ 𝐭𝐫𝐮̀𝐧𝐠 𝐯𝐨̛́𝐢 𝐭𝐮̛̀ 𝐤𝐡𝐨𝐚́ 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 \n\n━━━━━━━━━━━━━━━\n${msg}» 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲(𝐩𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢) 𝐜𝐡𝐨̣𝐧 𝐦𝐨̣̂𝐭 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐮̛̃𝐧𝐠 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐭𝐫𝐞̂𝐧`

return api.sendMessage({attachment: imgthumnail, body: body}, event.threadID,(error, info) => global.client.handleReply.push({ 
  name: this.config.name, 
  messageID: info.messageID, 
  author: event.senderID, 
  link }),
  event.messageID);

    }
    catch (error) {
      //api.sendMessage("Không thể xử lý request do dã phát sinh lỗi: " + error.message, event.threadID, event.messageID);

      const fs = global.nodemodule["fs-extra"];
      const axios = global.nodemodule["axios"];
      var link = [], msg = "", num = 0, numb = 0;
      var imgthumnail = []
      var results = await youtube.searchVideos(keywordSearch, 6);
      for (let value of results) {
        if (typeof value.id == 'undefined') return;
        link.push(value.id);
        var idd = value.id;
let folderthumnail = __dirname + `/cache/${numb+=1}.png`;

let linkthumnail = `https://img.youtube.com/vi/${value.id}/hqdefault.jpg`;

let getthumnail = (await axios.get(`${linkthumnail}`, { responseType: 'arraybuffer' })).data;



        ////////////////////
let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
  let gettime = datab.items[0].contentDetails.duration;
  let time = (gettime.slice(2));
        ///////////////////
        let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=${keyapi}`)).data;
  let channel = datac.items[0].snippet.channelTitle;

  fs.writeFileSync(folderthumnail, Buffer.from(getthumnail, 'utf-8'));

  imgthumnail.push(fs.createReadStream(__dirname + `/cache/${numb}.png`));
        /////=//////////////
        msg += (`『${num+=1}』 ${value.title}\n『⏱️』: ${time}\n『🌸』: ${channel}\n━━━━━━━━━━━━━━━\n\n`);
      }

      var body = `»🔎 𝐂𝐨́ 【${link.length}】𝐤𝐞̂́𝐭 𝐪𝐮𝐚̉ 𝐭𝐫𝐮̀𝐧𝐠 𝐯𝐨̛́𝐢 𝐭𝐮̛̀ 𝐤𝐡𝐨𝐚́ 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 \n\n━━━━━━━━━━━━━━━\n${msg}» 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲(𝐩𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢) 𝐜𝐡𝐨̣𝐧 𝐦𝐨̣̂𝐭 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐮̛̃𝐧𝐠 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐭𝐫𝐞̂𝐧`
return api.sendMessage({attachment: imgthumnail, body: body}, event.threadID,(error, info) => global.client.handleReply.push({ 
  name: this.config.name, 
  messageID: info.messageID, 
  author: event.senderID, 
  link }),
  event.messageID);
    }
  }
  for(let ii = 1; ii < 7 ; ii++) {
  unlinkSync(__dirname + `/cache/${ii}.png`)}




}