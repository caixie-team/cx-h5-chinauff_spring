/**
 * @file Api config / Commonjs module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

const { isProdMode } = require('./environment')

module.exports = {
  cdnUrl: isProdMode ? 'https://cdn.surmon.me' : '',
  proxyUrl: isProdMode ? 'https://surmon.me/proxy/' : '/proxy/',
  baseUrl: isProdMode ? 'http://spring.chinauff.com/api' : 'http://backoffice.caixie.top/api',
  thirdUrl: isProdMode ? 'https://weixin.chinauff.com/lnj-weixin/console' : 'http://demo.micvs.com/lnj-weixin/console',
  socketHost: isProdMode ? 'https://caixie.top' : 'http://wx.caixie.top'
}
