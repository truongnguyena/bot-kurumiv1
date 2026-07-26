const fs = require('fs');
const path = require('path');
const Module = require('module');

process.noDeprecation = true;

try {
  const npmlog = require('npmlog');
  const origWarn = npmlog.warn.bind(npmlog);
  npmlog.warn = function (...args) {
    const text = args.map(String).join(' ');
    if (/Vùng Của Tài Khoản|Uptime Server/i.test(text)) return;
    return origWarn(...args);
  };
} catch {}

const root = path.join(__dirname, '..');
const config = require(path.join(root, 'config.json'));

const cacheFiles = [
  'modules/commands/cache/hethong/totalChat.json',
  'modules/commands/data/totalChat.json',
  'modules/commands/bot/noitu.txt',
  'modules/commands/hethong/busy.json'
];

for (const rel of cacheFiles) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  if (!fs.existsSync(full)) {
    fs.writeFileSync(full, rel.endsWith('.json') ? '{}' : '', 'utf8');
  }
}

const ua = (config.FCAOption && config.FCAOption.userAgent) ||
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const fcaOptions = Object.assign({ userAgent: ua }, config.FCAOption || {});
const origRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  const result = origRequire.apply(this, arguments);
  if (id === 'fca-horizon-remastered' || id === 'fca-horizon-remake') {
    return function (credentials, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      return result(credentials, Object.assign({}, fcaOptions, options || {}), callback);
    };
  }
  return result;
};

require(path.join(root, 'mirai.js'));
