/**
 * @file Api config / Commonjs module
 * @module api.config
 */

const { isProdMode } = require('./environment')

// 线上 DEV 测试
// module.exports = {
//   // hostUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://weixin.chinauff.com/spring',
//   hostUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'https://weixin.chinauff.com/spring',
//   // hostUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://wx.caixie.top/spring',
//   cdnUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://spring.chinauff.com/spring',
//   proxyUrl: isProdMode ? 'http://demo.micvs.com/lnj-weixin/console' : 'http://demo.micvs.com/lnj-weixin/console',
//   // baseUrl: isProdMode ? 'https://weixin.chinauff.com/spring/server/api' : 'http://spring.chinauff.com/api',
//   baseUrl: isProdMode ? 'https://weixin.chinauff.com/spring/server/api' : 'https://weixin.chinauff.com/spring/server/api',
//   caixieUrl: isProdMode ? 'http://spring.chinauff.com/api' : 'http://spring.chinauff.com/api',
//   thirdUrl: isProdMode ? 'https://weixin.chinauff.com/lnj-weixin/console' : 'http://demo.micvs.com/lnj-weixin/console',
//   socketHost: isProdMode ? 'https://caixie.top' : 'http://wx.caixie.top'
// }
module.exports = {
  // hostUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://weixin.chinauff.com/spring',
  // hostUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'https://weixin.chinauff.com/spring',
  hostUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://wx.caixie.top/spring',
  // cdnUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://spring.chinauff.com/spring',
  proxyUrl: isProdMode ? 'http://demo.micvs.com/lnj-weixin/console' : 'http://demo.micvs.com/lnj-weixin/console',
  baseUrl: isProdMode ? 'https://weixin.chinauff.com/spring/server/api' : 'http://spring.chinauff.com/api',
  // baseUrl: isProdMode ? 'https://weixin.chinauff.com/spring/server/api' : 'https://weixin.chinauff.com/spring/server/api',
  caixieUrl: isProdMode ? 'http://spring.chinauff.com/api' : 'http://spring.chinauff.com/api',
  thirdUrl: isProdMode ? 'https://weixin.chinauff.com/lnj-weixin/console' : 'http://demo.micvs.com/lnj-weixin/console',
  socketHost: isProdMode ? 'https://caixie.top' : 'http://wx.caixie.top'
}
