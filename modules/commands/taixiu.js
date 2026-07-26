module.exports.config = {
    name: "taixiu",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Chơi tài xỉu",
    commandCategory: "Trò chơi",
    usages: "< tài/xỉu + số tiền >",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, Currencies }) {
    const { senderID, messageID, threadID } = event;
    const axios = require('axios');
    const fs = require("fs-extra");
    const path = require("path");

    // Chuẩn hóa chuỗi unicode tiếng Việt để so sánh chính xác
    const normalize = (str) => str.normalize('NFC').toLowerCase().trim();

    // ── Kiểm tra lựa chọn ──────────────────────────────────────────
    if (!args[0])
        return api.sendMessage("Bạn phải cược TÀI hoặc XỈU...", threadID, messageID);

    const choose = normalize(args[0]);
    if (choose !== normalize('tài') && choose !== normalize('xỉu'))
        return api.sendMessage("Chỉ đặt cược TÀI hoặc XỈU", threadID, messageID);

    // ── Kiểm tra số tiền ───────────────────────────────────────────
    if (!args[1])
        return api.sendMessage("Bạn phải nhập số tiền cược!", threadID, messageID);

    const dataMoney = await Currencies.getData(senderID);
    const moneyUser = dataMoney.money;

    // Fix: dùng let, ép sang số nguyên rõ ràng
    let money = args[1].toLowerCase() === "all"
        ? moneyUser
        : parseInt(args[1]);

    if (isNaN(money) || money < 50)
        return api.sendMessage("Mức đặt cược không phù hợp hoặc dưới 50$", threadID, messageID);

    if (moneyUser < money)
        return api.sendMessage(
            `Số dư hiện tại (${moneyUser}$) không đủ để cược ${money}$`,
            threadID, messageID
        );

    // ── Đảm bảo thư mục cache tồn tại ─────────────────────────────
    const cacheDir = path.join(__dirname, 'cache');
    fs.ensureDirSync(cacheDir);

    try {
        // Tung 3 xúc xắc làm fallback nếu API ngoài lỗi
        function rollDice() {
            const dice = [Math.ceil(Math.random()*6), Math.ceil(Math.random()*6), Math.ceil(Math.random()*6)];
            const total = dice.reduce((a, b) => a + b, 0);
            return {
                result: total >= 11 ? normalize('tài') : normalize('xỉu'),
                label: total >= 11 ? 'Tài' : 'Xỉu',
                detail: `🎲 ${dice.join(' | ')} (tổng: ${total})`
            };
        }

        let resultKey, resultLabel, detailText;
        let attachments = [];
        const cacheDir = path.join(__dirname, 'cache');
        fs.ensureDirSync(cacheDir);

        try {
            const res = (await axios.get('https://api.blacksky04.repl.co/game/taixiu', { timeout: 5000 })).data;
            if (res && res.result) {
                resultKey = normalize(res.result);
                resultLabel = res.result;
                detailText = '';

                // Tải ảnh xúc xắc nếu API trả về
                if (res.images && typeof res.images === 'object') {
                    const imageKeys = Object.keys(res.images);
                    const filePaths = [];
                    for (let i = 0; i < imageKeys.length; i++) {
                        const key = imageKeys[i];
                        const filePath = path.join(cacheDir, `taixiu_${senderID}_${i}.png`);
                        const imgData = (await axios.get(res.images[key], { responseType: "arraybuffer", timeout: 5000 })).data;
                        fs.writeFileSync(filePath, Buffer.from(imgData));
                        filePaths.push(filePath);
                        attachments.push(fs.createReadStream(filePath));
                    }
                    // Dọn file sau 10 giây
                    setTimeout(() => {
                        for (const fp of filePaths) {
                            try { if (fs.existsSync(fp)) fs.unlinkSync(fp); } catch(_) {}
                        }
                    }, 10000);
                }
            } else {
                const rolled = rollDice();
                resultKey = rolled.result;
                resultLabel = rolled.label;
                detailText = rolled.detail;
            }
        } catch (_apiErr) {
            // API không hoạt động → dùng xúc xắc ngẫu nhiên
            const rolled = rollDice();
            resultKey = rolled.result;
            resultLabel = rolled.label;
            detailText = rolled.detail;
        }

        let body;
        if (choose === resultKey) {
            await Currencies.increaseMoney(senderID, money);
            body = `🎰 Kết quả: ${resultLabel}${detailText ? '\n' + detailText : ''}\n✅ Bạn đã THẮNG và nhận: ${money.toLocaleString()}$\n💰 Số dư hiện tại: ${(moneyUser + money).toLocaleString()}$`;
        } else {
            await Currencies.decreaseMoney(senderID, money);
            body = `🎰 Kết quả: ${resultLabel}${detailText ? '\n' + detailText : ''}\n❌ Bạn đã THUA và mất: ${money.toLocaleString()}$\n💰 Số dư hiện tại: ${(moneyUser - money).toLocaleString()}$`;
        }

        await api.sendMessage(
            attachments.length > 0 ? { body, attachment: attachments } : body,
            threadID, messageID
        );

    } catch (e) {
        console.error("[taixiu]", e);
        return api.sendMessage(
            'Đã xảy ra lỗi khi thực hiện lệnh, vui lòng thử lại sau...',
            threadID, messageID
        );
    }
};