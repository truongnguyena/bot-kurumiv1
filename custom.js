module.exports = async ({ api }) => {
  const logger = require('./utils/log')
  const configCustom = {
    autoRestart: {
      status: true,
      time: 1, //40 minutes
      note: 'Để tránh sự cố, hãy bật khởi động lại bot định kỳ'
    },
    accpetPending: {
      status: true,    
      time: 1, //30 minutes
      note: 'Phê duyệt tin nhắn chờ sau một thời gian nhất định'
    }
  }
  function autoRestart(config) {
    if(config.status) {
      setInterval(async () => {
        logger(`Bắt đầu khởi động lại hệ thống!`, "[ Auto Restart ]")
        process.exit(1)
      }, config.time * 60 * 1000)
    }
  }
  function accpetPending(config) {
    if(config.status) {
      setInterval(async () => {
          const list = [
              ...(await api.getThreadList(1, null, ['PENDING'])),
              ...(await api.getThreadList(1, null, ['OTHER']))
          ];
          if (list[0]) {    
              api.sendMessage('[ 𝗖𝗛𝗘𝗖𝗞 ] Bạn đã được phê duyệt cho hàng đợi. (Đây là một tin nhắn tự động)', list[0].threadID);
          }
      }, config.time * 60 * 1000)
    }
  }
  autoRestart(configCustom.autoRestart)
  accpetPending(configCustom.accpetPending)
};
