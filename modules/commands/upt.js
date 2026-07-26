
module.exports.config = {
  name:"upt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "kurumi",
  description: "Random ảnh theo api - uptime",
  commandCategory: "người dùng",
  cooldowns: 3,
  dependencies: {
    "pidusage": ""
  }
};
function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async ({ api, event, args }) => {
const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
  var z_1 = (hours < 10) ? '0' + hours : hours;
    var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;
    const axios = require('axios')
  const pidusage = await global.nodemodule["pidusage"](process.pid);
   const { commands } = global.client;
  const timeStart = Date.now();
  const fs = require('fs-extra');
   if (!fs.existsSync(__dirname +
        `/tad/SVN-AVENGEANCE.OTF`)) {
        let getfont = (await axios.get(`https://github.com/PLViet/fonts/raw/main/SVN-AVENGEANCE.OTF`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tad/SVN-AVENGEANCE.OTF`, Buffer.from(getfont, "utf-8"));
      }
         if (!fs.existsSync(__dirname +
      `/tad/phenomicon.ttf`)) {
      let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/phenomicon.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/phenomicon.ttf`, Buffer.from(getfont2, "utf-8"));
    };
  if (!fs.existsSync(__dirname +
      `/tad/CaviarDreams.ttf`)) {
      let getfont3 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/CaviarDreams.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/CaviarDreams.ttf`, Buffer.from(getfont3, "utf-8"));
    };
   const { loadImage, createCanvas, registerFont } = require("canvas");

  let k = args[0];
   if(args[0] == "list"){
    const alime = (await axios.get('https://run.mocky.io/v3/f502ab6a-7fe1-45ea-b2a6-88f8f643b8aa')).data
    var count = alime.listAnime.length;
      var data = alime.listAnime
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].ID} | ${data[i].name}\n`;
      }
      msg += `Trang (${page}/${numPage})\nDùng ${global.config.PREFIX}${this.config.name} list <số trang>`;
      return api.sendMessage(msg, event.threadID,event.messageID);
   }
  if(!k){
  var id = Math.floor(Math.random() * 848) +1
  } else {
    var id = k
  }

    const lengthchar = (await axios.get('https://run.mocky.io/v3/f502ab6a-7fe1-45ea-b2a6-88f8f643b8aa')).data
    console.log(lengthchar.length)
  const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_1111231.png`;
    let pathAva = __dirname + `/tad/avatar_3dsc11.png`;
    let background = (await axios.get(encodeURI(`https://i.imgur.com/CkzHj2y.jpeg`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    let ava = (await axios.get(encodeURI(`${lengthchar[id].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
    const request = require('request');
    const path = require('path');

  //const a = Math.floor(Math.random() * 820) + 1


let l1 = await loadImage(pathAva);
    let a = await loadImage(pathImg);
    let canvas = createCanvas(a.width, a.height);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = lengthchar[id].colorBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(l1, 720, -160, 1100, 1100);
     registerFont(__dirname + `/tad/phenomicon.ttf`, {
      family: "phenomicon"
    });
    ctx.textAlign = "start";
    ctx.strokeStyle = lengthchar[id].colorBg;
    ctx.filter = "brightness(90%) contrast(110%)";
    ctx.font = "130px phenomicon";
    ctx.fillStyle = lengthchar[id].colorBg;
    //ctx.fillText(global.config.BOTNAME, 80, 340);
    ctx.beginPath();
  ////////////////////////////////////////
   registerFont(__dirname + `/tad/SVN-AVENGEANCE.OTF`, {
      family: "SVN-AVENGEANCE"
    });
    ctx.textAlign = "start";
    ctx.font = "100px SVN-AVENGEANCE";
    ctx.fillStyle = "#fdfdfd";
    ctx.fillText(`${z_1} : ${x_1} : ${y_1} `, 300, 530);
    ctx.restore();
    ctx.save();
registerFont(__dirname + `/tad/CaviarDreams.ttf`, {
      family: "time"
    });
    ctx.textAlign = "start";
    ctx.font = "45px time";
    //ctx.fillText("@" + "facebook.com/thinhvooo", 240, 590)
    //ctx.fillText("@" + "instagram.com/th.inh480/", 240, 670)
   // ctx.fillText("@" + "DVFB.VietLe.pro", 405, 750)
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
   fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage({
    body: `======『 𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗢𝗕𝗢𝗧 』======

🍏 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗕𝗼𝘁 𝗰𝘂̉𝗮 𝗡𝗴𝘂𝘆𝗲𝗻 𝗡𝗴𝗼𝗰 𝗦𝗼̛𝗻 𝗵𝗼𝗮̣𝘁 đ𝗼̣̂𝗻𝗴 đ𝘂̛𝗼̛̣𝗰 ${hours} giờ ${minutes} phút ${seconds} giây.\n  •━━━━━━━━━━━━━━━━━•\n[🎮] → 𝗣𝗵𝗶𝗲̂𝗻 𝗯𝗮̉𝗻 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗰𝘂̉𝗮 𝗯𝗼𝘁: 1.2.15\n[🔰] → 𝗖𝗵𝗶𝗽: AMD EPYC 7B12\n[💫] → 𝗧𝗼̂́𝗰 đ𝗼̣̂ 𝘀𝘂̛̉ 𝗹𝗶́: 2249𝗠𝗛𝘇\n[🗃️] → 𝗧𝗼̂̉𝗻𝗴 𝗯𝗼̣̂ 𝗻𝗵𝗼̛́: 128 GB\n[💓] → Đ𝗮̃ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴: 30 GB( 48%)\n[🌐] → 𝗛𝗲̣̂ đ𝗶𝗲̂̀𝘂 𝗵𝗮̀𝗻𝗵: Linuxx64\n[🔗] → 𝗦𝗼̂́ 𝗹𝘂𝗼̂̀𝗻𝗴 𝗖𝗣𝗨: ${pidusage.cpu.toFixed(1)}%\n[🍄] → 𝗥𝗔𝗠: ${byte2mb(pidusage.memory)}\n[💚] → 𝗣𝗶𝗻𝗴: ${Date.now() - timeStart}𝗠𝘀\n[🍄] →𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝗹𝗲̣̂𝗻𝗵 : ${commands.size }`,
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    fs.unlinkSync(pathAva),
    event.messageID
  );
}
