module.exports.config = {
    name: "adminUpdate",
    eventType: ["log:thread-admins","log:thread-name", "log:user-nickname", "log:thread-call","log:thread-icon", "log:thread-color", "log:link-status", "log:magic-words", "log:thread-approval-mode", "log:thread-poll"],
    version: "1.0.1",
    credits: "Mirai Team",
    description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads, Users }) { 
    const { author, threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;
    const fs = require("fs");
    var iconPath = __dirname + "/emoji.json";
    if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
  if (author == threadID) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            case "log:thread-admins": {
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[⚜️] Đã cập nhật người dùng ${logMessageData.TARGET_ID} trở thành quản trị viên nhóm`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[⚜️] Đã cập nhật người dùng ${logMessageData.TARGET_ID} trở thành thành viên`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                break;
            }

            case "log:thread-admins": {
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                    api.sendMessage({body: `==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜ ĐÃ CẬP NHẬT NGƯỜI DÙNG ${logMessageData.TARGET_ID} TRỞ THÀNH QUẢN TRỊ VIÊN NHÓM`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    api.sendMessage({body:`==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜ ĐÃ GỠ CHỨC DANH QUẢN TRỊ VIÊN CỦA NGƯỜI DÙNG ${logMessageData.TARGET_ID}`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
                }
                break;
            }

            case "log:user-nickname": {
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                api.sendMessage({body:`==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜ ${(logMessageData.nickname.length == 0) ? `ĐÃ XÓA BIỆT DANH CỦA NGƯỜI DÙNG ${logMessageData.participant_id}` : `ĐÃ CẬP NHẬT BIỆT DANH CỦA NGƯỜI DÙNG ${logMessageData.participant_id} THÀNH: ${logMessageData.nickname}`}.`, attachment: (await axios.get((await axios.get(`https://docsapi.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
                break;
            }

            case "log:thread-name": {
                dataThread.threadName = event.logMessageData.name || null;
                api.sendMessage({body:`==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜ ${(dataThread.threadName) ? `ĐÃ CẬP NHẬT TÊN NHÓM THÀNH: ${dataThread.threadName}` : 'ĐÃ XÓA TÊN NHÓM'}.`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
                                 
}, event.threadID);
                break;
            }
            case "log:thread-icon": {
                let preIcon = JSON.parse(fs.readFileSync(iconPath));
                dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage({body:`==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜  ${event.logMessageBody.replace("biểu tượng cảm xúc", "icon")}\n[⚜️]➜ Icon gốc: ${preIcon[threadID] || "không rõ"}`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID, async (error, info) => {
                    preIcon[threadID] = dataThread.threadIcon;
                    fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
               }

            case "log:thread-call": {
                if (logMessageData.event == "group_call_started") {
                    const name = await Users.getNameUser(logMessageData.caller_id);
                    api.sendMessage({body:`==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜ ${name} STARTED A ${(logMessageData.video) ? 'VIDEO ' : ''}CALL.`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
                }
                else if (logMessageData.event == "group_call_ended") {
                    const callDuration = logMessageData.call_duration;

                    //Transform seconds to hours, minutes and seconds
                    let hours = Math.floor(callDuration / 3600);
                    let minutes = Math.floor((callDuration - (hours * 3600)) / 60);
                    let seconds = callDuration - (hours * 3600) - (minutes * 60);

                    //Add 0 if less than 10
                    if (hours < 10) hours = "0" + hours;
                    if (minutes < 10) minutes = "0" + minutes;
                    if (seconds < 10) seconds = "0" + seconds;

                    const timeFormat = `${hours}:${minutes}:${seconds}`;

                    api.sendMessage({body:`==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜ ${(logMessageData.video) ? 'VIDEO ' : ''}CALL HAS ENDED.\n[⚜️]➜ CALL DURATION: ${timeFormat}`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);

                }
                else if (logMessageData.joining_user) {
                    const name = await Users.getNameUser(logMessageData.joining_user);
                    api.sendMessage({body:`==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜ ${name} JOINED THE ${(logMessageData.group_call_type == '1') ? 'VIDEO ' : ''}CALL.`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
                }
                break;
            }
        case "log:magic-words":
            {
                return api.sendMessage({body:`[⚜️]➜ Theme ${event.logMessageData.magic_word} đã thêm hiệu ứng: ${event.logMessageData.theme_name}\n[⚜️]➜ Emoij: ${event.logMessageData.emoji_effect || "Không có emoji"}\n[⚜️]➜ Tổng ${event.logMessageData.new_magic_word_count} hiệu ứng từ ngữ được thêm vào`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
            }
        case "log:thread-poll":
            {
                var str = event.logMessageData.question_json
                var obj = JSON.parse(str);
                if (event.logMessageData.event_type == "question_creation") {
                    return api.sendMessage({body:`${event.logMessageBody}`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
                }
                if (event.logMessageData.event_type == "update_vote") {
                    return api.sendMessage({body:`${event.logMessageBody}`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
                }
            }
        case "log:thread-approval-mode":
            {
                return api.sendMessage(event.logMessageBody, threadID)
            }
             case "log:thread-color": {
                dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage({body:`==== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n[⚜️]➜  ${event.logMessageBody.replace("Chủ đề", "color")}`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
}
