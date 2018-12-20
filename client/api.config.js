/**
 * @file Api config / Commonjs module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

const { isProdMode } = require('./environment')

module.exports = {
  cdnUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://spring.chinauff.com/spring',
  proxyUrl: isProdMode ? 'https://weixin.chinauff.com/proxy/' : 'http://demo.micvs.com/lnj-weixin/console/',
  baseUrl: isProdMode ? 'http://spring.chinauff.com/api' : 'http://backoffice.caixie.top/api',
  thirdUrl: isProdMode ? 'https://weixin.chinauff.com/lnj-weixin/console' : 'http://demo.micvs.com/lnj-weixin/console',
  socketHost: isProdMode ? 'https://caixie.top' : 'http://wx.caixie.top'
}
