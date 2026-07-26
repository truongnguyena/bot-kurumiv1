const login = require('../includes/fca');
const utils = require('../includes/fca/utils');

login({ appState: require('../appstate.json') }, {
  logLevel: 'error',
  forceLogin: true,
  listenEvents: false,
  pauseLog: true,
  selfListen: true,
  online: true
}, (err, api) => {
  if (err) {
    console.log('LOGIN_ERR', err);
    process.exit(1);
  }

  const html = api.htmlData || '';
  console.log('USER', api.getCurrentUserID());
  console.log('HTML_LEN', html.length);
  console.log('DTSG', utils.getFbDtsg(html).slice(0, 12) + '...');
  console.log('LSD', (utils.getLsd(html) || '').slice(0, 12) + '...');

  api.getThreadList(5, null, ['INBOX'], (e, data) => {
    if (e) {
      console.log('THREADLIST_ERR', e.error || e.errorSummary || e.message || e);
      if (e.errorDescription) console.log('DESC', e.errorDescription);
      process.exit(1);
    }
    console.log('THREADLIST_OK', data.length);
    process.exit(0);
  });
});
