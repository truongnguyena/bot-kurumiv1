module.exports.config = {
  name: "nhactiktok",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Vũ Thành Trung",//Ai viết mdl quên mẹ rồi nên t thay thành tên t !! Tất cả video dược up bởi trunguwu nhé :3
  description: "RanDom nhạc",
  commandCategory: "no prefix",
  usages: "nhạc",
  cooldowns: 0,
  denpendencies: {
    "fs-extra": "",
    "request": ""

  }
};
module.exports.handleEvent = async ({ api, event, Threads }) => {
  if (event.body.indexOf("nhạc")==0 ||
event.body.indexOf("Nhạc")==0 ) 
//Thay (tên gọi)theo sở thích
//[ Lưu ý !! Không được để trống ( Tên gọi ) 
//Hoặc có thể xoá bớt [event.body.indexOf(")==0 ]
{
    const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [ 
"https://i.imgur.com/AypX2CB.mp4",  
"https://i.imgur.com/GWP5m07.mp4",  
"https://i.imgur.com/QCCxu5x.mp4",
"https://i.imgur.com/ODuJ5Gy.mp4",
"https://i.imgur.com/fwzK9pH.mp4",
"https://i.imgur.com/DTPlVLM.mp4",
"https://i.imgur.com/9tIfhFn.mp4",
"https://i.imgur.com/rgot7K4.mp4",
"https://i.imgur.com/TP2PBgc.mp4",        "https://i.imgur.com/TVKCLMN.mp4",  
    ];
     var callback = () => api.sendMessage({body:`âm thanh của bạn đây`
,attachment: fs.createReadStream(__dirname + "/cache/1.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp3"), event.messageID);  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.mp3")).on("close",() => callback());
}
                                                                                                         }
module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {

   };
