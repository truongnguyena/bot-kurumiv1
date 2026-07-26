const login = require('../includes/fca');
const utils = require('../includes/fca/utils');
const fs = require('fs');

function testPatterns(html) {
  const getFrom = (str, startToken, endToken) => {
    var start = str.indexOf(startToken) + startToken.length;
    if (start < startToken.length) return null;
    var lastHalf = str.substring(start);
    var end = lastHalf.indexOf(endToken);
    if (end === -1) return null;
    return lastHalf.substring(0, end);
  };
  const tests = [
    ['p1', () => getFrom(html, 'name="fb_dtsg" value="', '"')],
    ['p2', () => getFrom(html, '["DTSGInitialData",[],{"token":"', '"}')],
    ['p3', () => getFrom(html, '["DTSGInitData",[],{"token":"', '"}')],
    ['p4', () => (html.match(/"DTSGInitialData",\[\],\{"token":"(.*?)"/) || [])[1]],
    ['p5', () => (html.match(/"DTSGInitData",\[\],\{"token":"(.*?)"/) || [])[1]],
    ['p6', () => (html.match(/"dtsg":\{"token":"(.*?)"/) || [])[1]],
    ['p7', () => (html.match(/name="fb_dtsg"\s+value="([^"]+)"/) || [])[1]],
    ['async', () => (html.match(/async_get_token":"([^"]+)"/) || [])[1]],
    ['require', () => utils.getFbDtsg(html)],
  ];
  for (const [name, fn] of tests) {
    try {
      const v = fn();
      console.log(name, v ? JSON.stringify(v.slice(0, 60)) : 'empty');
    } catch (e) {
      console.log(name, 'ERR', e.message);
    }
  }
}

login({ appState: require('../appstate.json') }, {
  logLevel: 'error', forceLogin: true, listenEvents: false, pauseLog: true
}, async (err, api) => {
  if (err) { console.error(err); process.exit(1); }

  const jar = api.getAppState();
  const request = require('request').defaults({ jar: require('request').jar() });
  // use api internal - just test htmlData and mbasic
  const html = api.htmlData || '';
  fs.writeFileSync('debug-home.html', html);
  console.log('=== www.facebook.com === len', html.length);
  testPatterns(html);

  const urls = [
    'https://mbasic.facebook.com/messages/',
    'https://m.facebook.com/home.php',
    'https://www.facebook.com/dialog/oauth?client_id=6628568379&scope=email&response_type=token',
  ];
  for (const url of urls) {
    try {
      const res = await new Promise((resolve, reject) => {
        const j = require('request').jar();
        for (const c of jar) j.setCookie(`${c.key}=${c.value}; Domain=${c.domain}; Path=${c.path}`, 'https://www.facebook.com');
        require('request')({ url, jar: j, gzip: true, headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }}, (e, r, b) => e ? reject(e) : resolve({ status: r.statusCode, body: b }));
      });
      console.log('\n===', url, 'status', res.status, 'len', res.body.length);
      testPatterns(res.body);
      if (utils.getFbDtsg(res.body).length > 10) {
        fs.writeFileSync('debug-mbasic.html', res.body);
      }
    } catch (e) {
      console.log(url, 'FAIL', e.message);
    }
  }
  process.exit(0);
});
