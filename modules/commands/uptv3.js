module.exports.config = {
  name: "uptv3",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "kaneki",
  description: "bot",
  commandCategory: "admin",
  usages: "test",
  cooldowns: 5,
  dependencies: {
    "pidusage": "",
    "fast-speedtest-api": ""
    }
  };
  function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
  }
  apikey = 'KANEKIFree_4314339408'
  module.exports.run = async ({ api, event, Users, Threads }) => {
    const axios = require('axios');
    const { threadID, messageID } = event;
    let name = await Users.getNameUser(event.senderID);
  const { commands } = global.client;
  const { events } = global.client;
    var boxget = await Threads.getAll(['threadID'])
  var userget = await Users.getAll(['userID'])
    const fast = global.nodemodule["fast-speedtest-api"];
    const speedTest = new fast({
  token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
  verbose: false,
  timeout: 10000,
  https: true,
  urlCount: 5,
  bufferSize: 8,
  unit: fast.UNITS.Mbps
  });
  const ketqua = await speedTest.getSpeed();
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
    var ngay = moment.tz("Asia/Ho_Chi_Minh").format("D");
    var thang = moment.tz("Asia/Ho_Chi_Minh").format("MM");    
    var nam = moment.tz("Asia/Ho_Chi_Minh").format("YYYY");
    const res = await axios.get(`https://jrt-api.j-jrt-official.repl.co/love`);
    var poem = res.data.data;
    const req = await axios.get(`https://jrt-api.j-jrt-official.repl.co/cadao`);
    var cadao = req.data.data;
    var ngay = moment.tz("Asia/Ho_Chi_Minh").format("D");
    var thang = moment.tz("Asia/Ho_Chi_Minh").format("MM");
    var nam = moment.tz("Asia/Ho_Chi_Minh").format("YYYY");
    const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    const rep = await axios.get(`https://jrt-api.j-jrt-official.repl.co/bancobiet`);
var know = rep.data.data;
    var d = new Date();
    var day = d.getDay()
  if (day == 0) var day = "Chủ nhật"
  else if (day == 1) var day = "Thứ hai"
  else if (day == 2) var day = "Thứ ba"
  else if (day == 3) var day = "Thứ tư"
  else if (day == 4) var day = "Thứ năm"
  else if (day == 5) var day = "Thứ sáu"
  else if (day == 6) var day = "Thứ 7"
  else if (day == 7) var day = "Chủ nhật"
  else return console.log(day)
    const pidusage = await global.nodemodule["pidusage"](process.pid);
    const timeStart = Date.now();
    const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);

    var msg = {
    body: `== [ 𝐊𝐢𝐞̂̉𝐦 𝐓𝐫𝐚 𝐇𝐨𝐚̣𝐭 𝐃𝐨̣̂𝐧𝐠 ] ==\n\n[👋] Chào ${name} «\n[📅] Hôm nay là ${day} Ngày ${ngay} - ${thang} - ${nam}!\n[⏳] Bây giờ là: ${gio} : ${phut} : ${giay} \n\n[🐳] Prefix Tổng: ${global.config.PREFIX}\n[💤] Prefix hiện tại: ${prefix}\n\n[🐧] Tên bot: ${global.config.BOTNAME}\n\n[🕹️] Hoạt động: ${hours}:${minutes}:${seconds}\n\n[🏘️] Threads: ${boxget.length}\n[👥] Users: ${userget.length}\n\n[📺] Cpu: ${pidusage.cpu.toFixed(1)}\n[🎮] Ram: ${byte2mb(pidusage.memory)}\n[❗] Độ trễ: ${Date.now() - timeStart}ms\n\n[📡] Fast: ${ketqua} Mbs\n[⚙] Commands: ${commands.size}\n[🔗] Events: ${events.size}\n\n[Bạn có biết?]: ${know}`,
        attachment: (await global.nodemodule["axios"]({
        url: (await global.nodemodule["axios"](`https://manhict.tech/images/world/vietnam`)).data.url,
        method: "GET",
        responseType: "stream"
      })).data
  }
  return api.sendMessage(msg, threadID, messageID);
  }