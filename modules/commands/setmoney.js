module.exports.config = {
    name: "setmoney",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "CatalizCS",
    description: "Điều chỉnh thông tin của người dùng",
    commandCategory: "SP ADMIN",
    usages: "[add/all/set/clean] [Số tiền] [Tag người dùng/reply]",
    cooldowns: 5
};

module.exports.run = async function ({ event, api, Currencies, args,Users }) {
    const { threadID, messageID, senderID, messageReply } = event;
   
    const { throwError } = global.utils;
    const { increaseMoney, decreaseMoney, getData } = Currencies;
   const mentionID = Object.keys(event.mentions);
    const money = parseInt(args[1]);
    var message = [];
    var error = [];

    switch (args[0]) {
        case "add": {
          if(args[1] < 1000000) return api.sendMessage("[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Số tiền nhỏ hơn 1,000,000 không thể thêm", threadID, messageID);
          if (event.type == "message_reply") {
            var name = (await Users.getData(event.messageReply.senderID)).name;
          await Currencies.increaseMoney(event.messageReply.senderID, money); console.log("done");
            return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Cộng thành công ${money}$ cho ${name}` ,event.threadID)
            
          } else if (mentionID.length != 0) {
                for (singleID of mentionID) {
                if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                try {
                    await Currencies.increaseMoney(singleID, money);
                    message.push(singleID);
                } catch (e) { error.push(e); console.log(e) };
                }
                return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Đã cộng thêm ${money}$ cho ${message.length} người`, threadID, function () { if (error.length != 0) return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Không thể cộng thêm tiền cho ${error.length} 𝐧𝐠𝐮̛𝐨̛̀𝐢!`, threadID) }, messageID);
            } else {
                if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                try {
                await Currencies.increaseMoney(senderID, money);
                message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Đã cộng thêm ${money}$ cho bản thân`, threadID, function () { if (error.length != 0) return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Không thể cộng thêm tiền cho bản thân`, threadID) }, messageID);
            }
        }

        case "set": {
            if(args[1] < 1000000000) return api.sendMessage("[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Số tiền nhỏ hơn 1,000,000,000 không thể thêm", threadID, messageID);
            if (mentionID.length != 0) {
                for (singleID of mentionID) {
                if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                try {
                    await Currencies.setData(singleID, { money });
                    message.push(singleID);
                } catch (e) { error.push(e) };
                }
                return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Đã set thành công ${money}$ cho ${message.length} người`, threadID, function () { if (error.length != 0) return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Không thể set tiền cho ${error.length} người!`, threadID) }, messageID);
            } else if (args[2]) {
                if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                try {
                await Currencies.setData(args[2], { money });
                message.push(args[2]);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Đã set thành công ${money}$ cho ${message.length} người!`, threadID, function () { if (error.length != 0) return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Không thể set tiền cho ${error.length} người!`, threadID) }, messageID);
            }
            else {
                if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                try {
                await Currencies.setData(senderID, { money });
                message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Đã set thành công ${money}$ cho bản thân`, threadID, function () { if (error.length != 0) return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Không thể set tiền cho bản thân!`, threadID) }, messageID);
            }
        }

        case "clean": {
            if (mentionID.length != 0) {
                for (singleID of mentionID) {
                try {
                    await Currencies.setData(singleID, { money: 0 });
                    message.push(singleID);
                } catch (e) { error.push(e) };
            }
                return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Đã xóa thành công 𝐭𝐨𝐚̀𝐧 bộ tiền của ${message.length} người`, threadID, function () { if (error.length != 0) return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] →  Không thể xóa toàn bộ tiền của ${error.length} người!`, threadID) }, messageID);
            } else {
                try {
                await Currencies.setData(senderID, { money: 0 });
                message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Đã xóa thành công tiền của bản thân`, threadID, function () { if (error.length != 0) return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] →  Không thể xóa toàn bộ tiền của bản thân!`, threadID) }, messageID);
            }
        }
        
        case "all": {
           var name = (await Users.getData(event.senderID)).name
            if(!args[1]) return api.sendMessage("[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Chưa nhập số tiền", threadID, messageID);
            if(isNaN(args[1])) return api.sendMessage("[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Số tiền phải là số", threadID, messageID);
            if(args[1] > 100000) return api.sendMessage("[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Số tiền phải nhỏ hơn 100000", threadID, messageID);
            let { participantIDs } = await api.getThreadInfo(threadID);
            for(let i of participantIDs) {
                try {
                    await increaseMoney(parseInt(i), parseInt(args[1]));
                    message.push(i);
                } catch(e) { error.push(e) }
            }
            return api.sendMessage(`${name} Đã cộng cho ${args[1]} ĐÔ cho ${message.length} người`, threadID, function () { if (error.length != 0) return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Không thể cộng thêm tiền cho ${error.length} người!`, threadID) }, messageID);
        }

        case "uid": {
           var id = args[1];
		var cut = args[2];
		let nameeee = (await Users.getData(id)).name
		   return api.sendMessage(`[ 𝗦𝗘𝗧𝗠𝗢𝗡𝗘𝗬 ] → Đã cộng cho ${nameeee} thành ${cut} Đô`, event.threadID, () => Currencies.increaseMoney(id, parseInt(cut)), event.messageID)	
          }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }
}