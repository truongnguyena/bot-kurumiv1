const { statSync } = require('fs');
const { join } = require('path');

const _48MB = 48 * 1024 * 1024;

const config = {
    name: "tikvideo",
    aliases: ["tik", "tikdown", "tikdl"],
    version: "1.0.1",
    commandCategory: "Tiện ích",
    description: "Download video tiktok no watermark.",
    usages: "[url]",
    credits: "XaviaTeam",
    cooldowns: 5
};

const langData = {
    "en_US": {
        "missingUrl": "Please provide a url",
        "fileTooLarge": "File is too large, max size is 48MB",
        "error": "An error occured"
    },
    "vi_VN": {
        "missingUrl": "Vui lòng cung cấp một url",
        "fileTooLarge": "File quá lớn, tối đa 48MB",
        "error": "Đã xảy ra lỗi"
    },
    "ar_SY": {
        "missingUrl": "يرجى تقديم عنوان الرابط",
        "fileTooLarge": "الملف كبير جدًا ، الحد الأقصى للحجم هو 48 ميجا بايت",
        "error": "حدث خطأ"
    },
};

async function getVideoURL(url) {
    try {
        const axios = require('axios');
        const res = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data = res.data && res.data.data;
        if (!data) return null;
        return { videoUrl: data.play || data.wmplay || null, desc: data.title || null };
    } catch (e) {
        console.error(e);
        return null;
    }
}

module.exports.config = config;

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event;
    const getLang = (key) => {
        const lang = global.config && global.config.language || 'vi_VN';
        return (langData[lang] && langData[lang][key]) || langData['vi_VN'][key] || key;
    };

    let cachePath;
    try {
        if (!args[0]) return api.sendMessage(getLang('missingUrl'), threadID, messageID);
        const url = args[0];

        const result = await getVideoURL(url);
        if (!result || !result.videoUrl) return api.sendMessage(getLang('error'), threadID, messageID);

        const { videoUrl, desc } = result;
        const fs = require('fs-extra');
        cachePath = join(__dirname, 'cache', `_tikdown_${event.senderID}${Date.now()}.mp4`);

        const axios = require('axios');
        const writer = fs.createWriteStream(cachePath);
        const response = await axios({ url: videoUrl, method: 'GET', responseType: 'stream' });
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const fileStat = statSync(cachePath);
        if (fileStat.size > _48MB) {
            api.sendMessage(getLang('fileTooLarge'), threadID, messageID);
        } else {
            await api.sendMessage({
                body: desc || '',
                attachment: fs.createReadStream(cachePath)
            }, threadID, messageID);
        }
    } catch (e) {
        console.error(e);
        api.sendMessage(getLang('error'), threadID, messageID);
    } finally {
        try {
            const fs = require('fs-extra');
            if (cachePath && fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
        } catch (e) { console.error(e); }
    }
};
