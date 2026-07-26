module.exports.config = {
    name: 'autosend',
    version: '10.02',
    hasPermssion: 2,
    credits: 'kurumi',
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Hệ thống',
    usages: '[]',
    cooldowns: 3
};
const r = a => a[Math.floor(Math.random()*a.length)],
{
    get
} = require('axios'),
config = [{
        timer: '00:00:00 AM',
        message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
          {
        timer: '6:00:00 AM',
    message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
{
        timer: '8:00:00 AM',
        message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
{
        timer: '10:00:00 AM',
        message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
          {
    timer: '12:00:00 AM',
    message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
{
        timer: '3:00:00 PM',
        message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
{ 
        timer: '4:00:00 PM',
        message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
{ 
        timer: '6:00:00 PM',
        message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
{
        timer: '8:00:00 PM',
        message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
},
{
        timer: '6:00:00 PM',
        message: ['=====『 𝗔𝗨𝗧𝗢𝗦𝗘𝗡𝗗 』=====\n▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀ {time}\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗞 - 𝟱𝟬𝗞 / 𝟭 𝗠𝗼𝗻𝘁𝗵\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱\n➝ 𝗠𝘂𝗮 𝗙𝗶𝗹𝗲 𝗕𝗼𝘁 𝗟𝗶𝗲̂𝗻 𝗛𝗲̣̂ 𝗔𝗱𝗺𝗶𝗻𝐧\n▱▱▱▱▱▱▱▱\n• https://www.facebook.com/profile.php?id=100041651315453&locale=vi_VN']
    }];
module.exports.onLoad = o => {
    if (!!global.autosendmessage_setinterval) clearInterval(global.autosendmessage_setinterval);
    global.autosendmessage_setinterval = setInterval(async function() {
        if (á = config.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) {
            var msg = r(á.message);
            msg = msg.replace(/{time}/g, (require("moment-timezone")).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)")).replace(/{thinh}/g, (await get(`https://API-RYO.ducryovn.repl.co/api/hearing.php`)).data.data)
            msg = {
                body: msg, attachment: (await get((await get(`https://videosatria.ghuy0707.repl.co/videosatria`)).data.data, {
                    responseType: 'stream'
                })).data
            };
            global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
        };
    }, 1000);
};
module.exports.run = () => {};