const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "kurumi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "includes (by ChatGPT)",
  description: "Gửi ảnh Kurumi Tokisaki cực đẹp",
  commandCategory: "Hình ảnh",
  usages: "/kurumi",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const links = [
    
  ];

  const imgUrl = links[Math.floor(Math.random() * links.length)];
  const filePath = path.join(__dirname, "/cache/kurumi.jpg");

  try {
    const response = await axios({
      url: encodeURI(imgUrl),
      method: "GET",
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://imgur.com/",
      },
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body: "🖼️ Ảnh Kurumi đây nè!",
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );
    });

    writer.on("error", (err) => {
      console.error("Lỗi tải ảnh:", err);
      api.sendMessage(
        "❌ Lỗi khi tải ảnh Kurumi, thử lại sau nhé!",
        event.threadID,
        event.messageID
      );
    });

  } catch (error) {
    console.error("Lỗi:", error);
    api.sendMessage(
      "⚠️ Không thể lấy ảnh Kurumi. Thử lại sau!",
      event.threadID,
      event.messageID
    );
  }
};
