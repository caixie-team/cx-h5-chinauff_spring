/**
 * @file 全局设置数据状态 / ES module
 * @module store/options
 * @author Baisheng <baisheng@caixie.top>
 */

export const state = () => ({
  // 是否为移动端
  mobileLayout: true,
  // ua
  userAgent: '',

  oauth: {
    // OAuth 用户信息授权
    oauthUrl: '',
    // 静默授权
    implicitOAuth: '',
    // 用缓存 code 直接拿用户信息
    oauthCache: 'oauth-cache'
  },
  jssdkConfig: {
    appId: 'wx40f58df735cd2868',
    // appId: 'wxb44ce8b8c5cfdc0a',
    // 老娘舅测试
    // appId: 'wxa8299eb7fc27ef04',
    nonceStr: '',
    signature: '',
    jsApiList: [
      'hideMenuItems',
      'onMenuShareTimeline',
      'getLocation'
      // 'chooseCard',
      // 'addCard',
      // 'openCard',
      // 'chooseWXPay'
      // 'updateAppMessageShareData',
      // 'updateTimelineShareData',
    ],
    url: ''
  },
  logInfo: {}
})

export const getters = {
  mobileLayout: state => state.mobileLayout
}
export const mutations = {
  // 设置UA
  SET_USER_AGENT (state, action) {
    state.userAgent = action
  },

  // 设置是否移动端状态
  SET_MOBILE_LAYOUT(state, action) {
    state.mobileLayout = action
  },

  // 设置 OAuths 请求地址
  SET_WECHAT_OAUTHS (state, action) {
    state.oauth = Object.assign({}, state.oauth, action)
  },

  // 设置 JSSDK
  SET_JSSDK_CONFIG (state, action) {
    state.jssdkConfig = Object.assign({}, state.jssdkConfig, action)
    // console.log(state.jssdkConfig)
  },

  SET_LOG_INFO (state, action) {
    state.logInfo = Object.assign({}, state.logInfo, action)
  }
}
