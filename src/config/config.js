/* eslint-disable no-undef */
const fs = require('fs')
let PORT = null
const portFile = think.ROOT_PATH + '/PORT'
if (think.isFile(portFile)) {
  PORT = fs.readFileSync(portFile, 'utf8')
}
// default config
module.exports = {
  // http_: 1, // 1:http,2:https
  workers: 1,
  host: '0.0.0.0',
  port: PORT || 8360,
}
