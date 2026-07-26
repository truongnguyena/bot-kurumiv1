// Script để kiểm tra lỗi tất cả các file lệnh
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { join, resolve } = require("path");
const crypto = require('crypto');
const moment = require('moment-timezone');
const chalkercli = require('chalkercli');
const aes = require('aes-js');

// Setup global giả lập môi trường bot
global.client = {
  commands: new Map(),
  events: new Map(),
  cooldowns: new Map(),
  eventRegistered: [],
  handleSchedule: [],
  handleReaction: [],
  handleReply: [],
  mainPath: process.cwd(),
  configPath: '',
  getTime: function(option) { return ''; }
};

global.data = {
  threadInfo: new Map(),
  threadData: new Map(),
  userName: new Map(),
  userBanned: new Map(),
  threadBanned: new Map(),
  commandBanned: new Map(),
  threadAllowNSFW: [],
  allUserID: [],
  allCurrenciesID: [],
  allThreadID: [],
};

try {
  global.config = require('./config.json');
} catch(e) {
  global.config = {};
}

global.utils = {};
global.nodemodule = {};
global.configModule = {};
global.moduleData = [];
global.language = {};
global.account = {};

// Giả lập getText để không bị lỗi khi command gọi
global.getText = function(...args) { return ''; };

const commandsDir = join(__dirname, 'modules/commands');
const files = readdirSync(commandsDir).filter(f => f.endsWith('.js'));

const errors = [];
const warnings = [];
const loaded = [];

console.log(`\n📁 Tổng số file .js: ${files.length}\n`);

for (const file of files) {
  const filePath = join(commandsDir, file);
  try {
    // Xóa cache để load lại
    delete require.cache[require.resolve(filePath)];
    const mod = require(filePath);
    
    // Kiểm tra cấu trúc
    if (!mod.config) {
      warnings.push({ file, issue: 'Thiếu module.config' });
    } else if (!mod.run) {
      warnings.push({ file, issue: 'Thiếu module.run' });
    } else if (!mod.config.commandCategory) {
      warnings.push({ file, issue: 'Thiếu config.commandCategory' });
    } else if (!mod.config.name) {
      warnings.push({ file, issue: 'Thiếu config.name' });
    } else {
      loaded.push({ file, name: mod.config.name });
    }
  } catch (err) {
    errors.push({ file, error: err.message, stack: err.stack ? err.stack.split('\n').slice(0,5).join('\n') : '' });
  }
}

console.log(`✅ Load thành công: ${loaded.length}`);
console.log(`⚠️  Cảnh báo (thiếu field): ${warnings.length}`);
console.log(`❌ Lỗi không load được: ${errors.length}`);

if (errors.length > 0) {
  console.log('\n=== ❌ DANH SÁCH LỖI ===');
  for (const e of errors) {
    console.log(`\nFile: ${e.file}`);
    console.log(`Lỗi: ${e.error}`);
    console.log(`Stack: ${e.stack}`);
    console.log('---');
  }
}

if (warnings.length > 0) {
  console.log('\n=== ⚠️ CẢNH BÁO ===');
  for (const w of warnings) {
    console.log(`File: ${w.file} → ${w.issue}`);
  }
}

// Ghi kết quả ra file
const result = {
  total: files.length,
  loaded: loaded.length,
  warnings: warnings.length,
  errors: errors.length,
  errorList: errors,
  warningList: warnings,
  loadedList: loaded
};
writeFileSync('./scan_result.json', JSON.stringify(result, null, 2), 'utf-8');
console.log('\n📄 Đã ghi kết quả vào scan_result.json');
