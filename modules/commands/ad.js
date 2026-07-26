
module.exports.config = {
    "name": "ad",
    "version": "1.0.0",
    "hasPermssion": 0,
    "credits": "kurumi",
    "description": "Kiểm tra thông tin admin .",
    "commandCategory": "Thông tin",
    "usages": "ad",
    "cooldowns": 5,
    "dependencies": {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
var name = (await Users.getData(event.senderID)).name
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
var link = [
"https://i.imgur.com/xhAQLw3.mp4"
];
var callback = () => api.sendMessage({body:`[⚜️]=== 『 INFORMATION ADMIN 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆

[👀] ➜ Tên: Nguyễn Phạm Nhật Trường
[💮] ➜ Biệt danh: kurumi
[❎] ➜ Ngày tháng năm sinh: 01/11/2004
[👤] ➜ Giới tính: Nam
[💫] ➜ Chiều cao cân nặng: 1m75 x 68 kg
[❤️] ➜ Tên duyên phận: không có
[🧸] ➜ Biệt danh: 
[💥] ➜ Ngày sinh: 
[💘] ➜ Mối quan hệ: độc thân
[🌎] ➜ Quê quán: Lâm đồng
[🌸] ➜ Tính cách: Hòa đồng, năng nổ, dứt khoát, thân thiện và hài hước nhưng cực đoan
[🌀] ➜ Sở thích: Thích cái đẹp, đi phượt, giao lưu ca hát, thưởng thức các món ẩm thực khác nhau và thích gái xinh gái đẹp

[⚜️]=== 『 CONTACT 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆

[☎] ➜ SĐT & Zalo: 0813392584
[🌐] ➜ Facebook: https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN
[⛱] ➜ TikTok: 
[⛲] ➜ Instagram: 
[🔎] ➜ Twitter: 
[📋] ➜ Telegram:
[🎬] ➜ Youtube:https://youtube.com/@kurumimixes?si=foaVcBNlY1ry2tiT
[✉️] ➜ Email: truongnpnps40833@gmail.com

[⚜️]=== 『 CONTACT 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆

[💵] ➜ MOMO: 0813392584 
[💵] ➜ MOMO: 0813392584 
[💵] ➜ MBBANK: 0813392584
[💵] ➜ MBBANK: 0813392584 
[💵] ➜ TIMO BANK: 9021288475332 
[💵] ➜ ZALO PAY: 0396049649 
[💵] ➜ AGRIBANK: 4810205345666 
[💵] ➜ vietcombank: 03113493421 
[💵] ➜ Techcombank: 1901194827 

[⚜️]=== 『 PROBLEM 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆

[❗] ➜ Mọi thắc mắc hay bot không hoạt động có thể hỏi trực tiếp admin theo các link ở trên.
[📌] ➜ Hãy đồng hành cùng BOT kurumi và mình nhé. Cảm ơn mọi người <3

✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

[📝] ➜ Bot được điều hành bởi kurumi`,

    attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 

    fs.unlinkSync(__dirname + "/cache/1.png"));  

      return request(

        encodeURI(`https://graph.facebook.com/${100041651315453}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(

fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());

       };