const fs = require('fs');
const path = require('path');

const shims = ['fca-horizon-remake', 'fca-horizon-remastered'];
const root = path.join(__dirname, '..', 'node_modules');

for (const name of shims) {
  const dir = path.join(root, name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, version: '0.0.1', main: 'index.js' }, null, 2));
  fs.writeFileSync(path.join(dir, 'index.js'), "module.exports = require('../../includes/fca');\n");
}
