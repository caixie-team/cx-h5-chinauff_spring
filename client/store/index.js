/* eslint-disable valid-jsdoc */
/* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
/* global PIXI, Game */
/**
 *
 * @file 根数据状态,存放全局数据和异步方法 / ES module
 * @module store/entry
 * @author Baisheng <baisheng@caixie.top>
 */
// const {isProdMode} = require('../environment')
// import Vue from 'vue'
import apiConfig from '~/api.config.es'
// import uaDevice from '~/utils/ua-device'
import {isBrowser, isServer, isProdMode} from '~/environment_es'
import {browserParse, osParse} from '~/utils/ua-os-browser'

// import shareIcon from '~/assets/img/icon/icon_gift.png'

const API_PREFIX = apiConfig.baseUrl
const HOST_API = apiConfig.hostUrl + '/api'
// const API_THIRD = apiConfig.thirdUrl

// 兼容 Axios 在不同协议的不同表现
const getResData = response => {
  return response.data ? response.data : response
  // return response.status ? response.data : response
}
const resIsSuccess = response => {
  // HTTP2
  if (response.data) {
    return response.errno === 0 || response.errcode === 0 || response.errcode === '0' && response.data
    // return response.status && response.data && Object.is(response.data.code, 1)
  } else {
    return response
  }
}
const getBaseUrl = (req) => {
  // console.log(req)
  // console.log(req.protocol)
  const protocol = isProdMode ? 'https' : 'http'
  return protocol + '://' + req.headers['x-forwarded-host'] + req.originalUrl
  // return req.headers['x-forwarded-host']
}
// 初始化配置 Wechat JSSDK
const clientInitWechatJSSDK = async (config, commit, beOpenId) => {

  const wechatObj = new window.WechatJSSDK(config)
  wechatObj.initialize()
    .then(w => {
      // w is same as window.wechatObj
      const img = 'http://pic1.ooopic.com/uploadfilepic/shiliang/2009-10-05/OOOPIC_00cyl_20091005e2c6eb1c889e342e.jpg'
      // const img = 'http://wx.caixie.top/spring/_nuxt/client/assets/images/bg/page_bg_light.jpg'
      // sugar method
      // const encodeBeOpenId = encodeURIComponent(beOpenId)
      wechatObj.shareOnChat({
        title: '我正在参加老娘舅新春集福，快来帮我助力吧！',
        // type: 'link',
        link: apiConfig.hostUrl + '/page621?beOpenId=' + beOpenId,
        // link: location.href,
        imgUrl: img,
        desc: '老娘舅新春集福对好礼，AR 扫描米饭，即有机会集满“福”兑好礼！快来参加吧！',
        surccess: () => {
        },
        cancel: () => {
        }
      })

      wechatObj.shareOnMoment({
        title: '我正在参加老娘舅新春集福，快来帮我助力吧！',
        type: 'link',
        desc: '老娘舅新春集福对好礼，AR 扫描米饭，即有机会集满“福”兑好礼！快来参加吧！',
        // link: location.href,
        link: apiConfig.hostUrl + '/page621?beOpenId=' + beOpenId,
        success: function () {
          commit('option/SET_LOG_INFO', {
            msg: 'share on moment success'
          })
          console.log('share on moment success')
        },
        cancel: function () {
          console.log('share on moment canceled')
          commit('option/SET_LOG_INFO', {
            msg: 'share on moment canceled'
          })
        },
        imgUrl: img
      })

      // w.callWechatApi('onMenuShareAppMessage', {
      //   title: 'onMenuShareAppMessage test title',
      //   type: 'link',
      //   desc: 'onMenuShareAppMessage share description',
      //   success: function () {
      //     console.log('share on chat success')
      //   },
      //   cancel: function () {
      //     console.log('share on chat canceled')
      //   },
      //   imgUrl: img
      // })
      commit('user/REQUEST_USER_LOCATION')
      // 获取当前地理定位
      w.callWechatApi('getLocation', {
        type: 'wgs84',
        success: function (res) {
          // console.log('reqeust user location ...')
          // console.log('getLocation')
          // const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          // const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // const speed = res.speed; // 速度，以米/每秒计
          // const accuracy = res.accuracy; // 位置精度
          // console.log(res)
          // console.log('request user location usss....')
          commit('user/GET_USER_LOCATION_SUCCESS', res)
        }
      })


    })
    .catch(err => {
      commit('option/SET_LOG_INFO', err)
      console.error(err)
    })
}

export const state = () => ({
  pageLayouts: null
})
export const mutations = {
  setPageLayout (state, data) {
    state.pageLayouts = data
  }
}

export const getters = {
  pageLayout: state => state.pageLayouts,
  openId: state => state.user.info.data.openId,
  beOpenId: state => state.user.info.data.beOpenId
}
// global actions
export const actions = {

  // 全局服务初始化
  nuxtServerInit (store, {req, params, route}) {
    // console.log(req)
    // 检查设备类型
    // const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    // const { isWechat } = uaDevice(userAgent || '')
    // store.commit('option/SET_USER_AGENT', userAgent)
    // store.commit('option/SET_MOBILE_LAYOUT', isWechat)
    // 设置用户信息
    // console.log(req.session.activity_user)
    // console.log(req.session.activity_user)
    store.commit('user/SET_USER_INFO', JSON.parse(req.session.activity_user))
    const initAppData = [
      // 获取微信JSSDK配置
      // store.dispatch('loadCxJSSDKConfig', getBaseUrl(req)),
      store.dispatch('loadJSSDKConfig', getBaseUrl(req)),
      // 获取 oauth 请求地址
      // store.dispatch('loadOauthUrls')
    ]

    // 首次服务端渲染时渲
    return Promise.all(initAppData)
  },

  /**
   * 客户端初始化
   * @param commit
   * @param context
   * @returns {Promise<void>}
   */
  async nuxtClientInit ({commit}, context) {
    const jssdkConfig = JSON.parse(JSON.stringify(context.store.state.option.jssdkConfig))
    await clientInitWechatJSSDK(jssdkConfig, commit, this.getters.beOpenId)
  },
  // 获取 generateOAuthUrl 地址信息
  loadOauthUrls ({commit}) {
    // SET_WECHAT_OAUTHS
    return this.$axios.$get(`${API_PREFIX}/wechat`)
      .then(response => {
        resIsSuccess(response)
          ? commit('option/SET_WECHAT_OAUTHS', getResData(response))
          : console.log('获取 oauth url 失败：', response)
      })
      .catch(err => {
        console.warn('获取 oauth url 错误', err)
      })
  },
  loadCxJSSDKConfig ({commit}, url) {
    const getUrl = `/cx/wechat/signature?url=${encodeURIComponent(url)}`
    return this.$axios.$get(getUrl)
      .then(response => {
        // console.log(response)
        resIsSuccess(response)
          ? commit('option/SET_JSSDK_CONFIG', getResData(response))
          : console.log('微信签名信息获取失败：', response)
      })
      .catch(err => {
        console.warn('获取签名信息错误', err)
      })
  },
  loadJSSDKConfig ({commit}, url) {
    // console.log(url)
    // return this.$axios.$post(`${API_THIRD}/activity/weChat/getConfigMessage?url=${encodeURIComponent(url)}`)
    // const postUrl = `/proxy/activity/weChat/getConfigMessage?appid=wxa8299eb7fc27ef04&url=${encodeURIComponent(url)}`
    const postUrl = `/proxy/activity/weChat/getConfigMessage?appid=wxa8299eb7fc27ef04&url=${encodeURIComponent(url)}`
    return this.$axios.$post(postUrl)
      .then(response => {
        // console.log(response)
        resIsSuccess(response)
          ? commit('option/SET_JSSDK_CONFIG', getResData(response))
          : console.log('微信签名信息获取失败：', response)
      })
      .catch(err => {
        console.warn('获取签名信息错误', err)
      })
  },
  loadUserInfo ({commit}, openId) {
    const getUrl = `/proxy/dcApi/member/isLogin?openId=${openId}`
    return this.$axios.$get(getUrl)
      .then(response => {
        resIsSuccess(response)
          ? commit('option/SET_JSSDK_CONFIG', getResData(response))
          : console.log('微信签名信息获取失败：', response)
      })
      .catch(err => {
        console.warn('获取签名信息错误', err)
      })
  },
  loadImplicitOAuthInfo ({commit}, code) {
    return this.$axios.$get(`${API_PREFIX}/wechat/oauth?code=${code}`)
      .then(response => {
        // console.log(response)
        resIsSuccess(response)
        //   ? commit('option/SET_JSSDK_CONFIG', getResData(response))
        //   : console.log('微信签名信息获取失败：', response)
      })
      .catch(err => {
        console.warn('获取签名信息错误', err)
      })
  },
  // 加载用户信息
  loadWechatUserInfo ({commit}, code) {
    // return this.$axios.$get(`${API_PREFIX}/wechat/signature?url=${encodeURIComponent(location.href)}`)
    return this.$axios.$get(`${API_PREFIX}/wechat/oauth?code=${code}`)
      .then(response => {
        // resIsSuccess(response)
        //   ? commit('option/SET_JSSDK_CONFIG', getResData(response))
        //   : console.log('微信签名信息获取失败：', response)
      })
      .catch(err => {
        console.warn('获取签名信息错误', err)
      })
  },
  reloadUserInfo ({commit}, data) {
    commit('user/REQUEST_USER_INFO')
    return this.$axios.$post(`${API_PREFIX}/account/take`, {
      ...data
    }).then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('prize/GET_LUCKY_SUCCESS', data)
        return Promise.resolve(data)
      }
    })
      .catch(err => {
        commit('prize/GET_LUCKY_FAILURE', err)
      })
  },
  // AI 图片
  checkImage ({commit}, data) {
    commit('ai/POST_IMAGE')
    // return this.$axios.$post(`/spring/cx/ai/jimage`, data)
    return this.$axios.$post(`${API_PREFIX}/wechat/oneMedia`, data)
    // return this.$axios.$post(`${HOST_API}/ai`, data)
      .then(response => {
        const data = getResData(response)
        if (resIsSuccess(response)) {
          commit('ai/POST_IMAGE_SUCCESS', data)
          return Promise.resolve(data)
        } else {
          commit('ai/POST_IMAGE_FAILURE')
          return Promise.reject(data)
        }
      })
      .catch(err => {
        commit('ai/POST_IMAGE_FAILURE', err)
        return Promise.reject(err)
      })
  },
  // 预约兑换满福礼品
  postReceiveBlessing ({commit}, data) {
    commit('prize/REQUEST_RECEIVE_BLESSING')
    return this.$axios.$post(`${API_PREFIX}/blessing/reserve`, data)
      .then(response => {
        const data = getResData(response)
        if (resIsSuccess(response)) {
          commit('prize/POST_RECEIVE_BLESSING_SUCCESS', data)
          return Promise.resolve(data)
        } else {
          commit('prize/POST_RECEIVE_BLESSING_FAILURE')
          return Promise.reject(data)
        }
      })
      .catch(err => {
        commit('prize/POST_RECEIVE_BLESSING_FAILURE', err)
        return Promise.reject(err)
      })
  },
  // 预约充值卡
  postReceiveCard ({commit}, data) {
    commit('prize/REQUEST_RECEIVE_CARD')
    return this.$axios.$post(`${API_PREFIX}/coupon/receiveCard`, data)
      .then(response => {
        const data = getResData(response)
        if (resIsSuccess(response)) {
          commit('prize/POST_RECEIVE_CARD_SUCCESS', data)
          return Promise.resolve(data)
        } else {
          commit('prize/POST_RECEIVE_CARD_FAILURE')
          return Promise.reject(data)
        }
      })
      .catch(err => {
        commit('prize/POST_RECEIVE_CARD_FAILURE', err)
        return Promise.reject(err)
      })
  },
  checkBlessingCodeStatus ({commit}, data) {
    commit('prize/REQUEST_RECEIVE_CARD')
    return this.$axios.$post(`${API_PREFIX}/coupon/receiveCard`, data)
      .then(response => {
        const data = getResData(response)
        if (resIsSuccess(response)) {
          commit('prize/POST_RECEIVE_CARD_SUCCESS', data)
          return Promise.resolve(data)
        } else {
          commit('prize/POST_RECEIVE_CARD_FAILURE')
          return Promise.reject(data)
        }
      })
      .catch(err => {
        commit('prize/POST_RECEIVE_CARD_FAILURE', err)
        return Promise.reject(err)
      })
  },
  // 抽奖
  loadPrizeLucky ({commit}, data) {
    commit('prize/REQUEST_LUCKY')
    return this.$axios.$post(`${API_PREFIX}/coupon/hit`, {
      ...data
    }).then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('prize/GET_LUCKY_SUCCESS', data)
        return Promise.resolve(data)
      }
    })
      .catch(err => {
        commit('prize/GET_LUCKY_FAILURE', err)
      })
  },
  // 领劵、发劵
  loadPrizeCoupon ({commit}, data) {
    // console.log(data)
    commit('prize/REQUEST_COUPON')
    return this.$axios.$post(`${API_PREFIX}/coupon/receiveCoupon`, {
      ...data
    }).then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('prize/GET_COUPON_SUCCESS', data)
        return Promise.resolve(data)
      }
    })
      .catch(err => {
        commit('prize/GET_COUPON_FAILURE', err)
      })
  },
  // 集福
  loadPrizeBlessing ({commit}, data) {
    commit('prize/REQUEST_BLESSING')
    return this.$axios.$post(`${API_PREFIX}/blessing/scan`, {
      ...data
      // TEST
      // openId: 'on47MszZBY86ceDBh1BvZKy-GMSg'
    }).then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('prize/GET_BLESSING_SUCCESS', data)
        return Promise.resolve(data)
      }
    })
      .catch(err => {
        commit('prize/GET_BLESSING_FAILURE', err)
        // return Promise.reject(err)
      })
  },
  // 获取集福统计（集满福的人数，我的集满福个数）
  loadBlessingStatistics ({commit}) {
    commit('prize/REQUEST_STATS')
    return this.$axios.$post(`${API_PREFIX}/blessing/blessingStatistics`, {
      openId: this.getters.openId
      // TEST
      // openId: 'on47MszZBY86ceDBh1BvZKy-GMSg'
    }).then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('prize/GET_STATS_SUCCESS', data)
        return Promise.resolve(data)
      }
    })
      .catch(err => {
        commit('prize/GET_STATS_FAILURE', err)
        // return Promise.reject(err)
      })
  },
  // 获取我的充值卡
  loadMyCard ({commit}) {
    commit('my/REQUEST_CARD')
    return this.$axios.$post(`${API_PREFIX}/blessing/getMyCard`, {
      openId: this.getters.openId
      // TEST ID
      // openId: 'on47MszZBY86ceDBh1BvZKy-GMSg'
      // openId: 'oQJYBw8oF3eJVigfu_T9Wi3nYoDA'
    }).then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('my/GET_CARD_SUCCESS', data)
        return Promise.resolve(data)
      }
    })
      .catch(err => {
        commit('my/GET_CARD_FAILURE', err)
        return Promise.reject(err)
      })
  },
  // 获取我的满福
  loadMyBlessing ({commit}) {
    commit('my/REQUEST_BLESSING')
    return this.$axios.$post(`${API_PREFIX}/blessing/my`, {
      openId: this.getters.openId
      // TEST
      // openId: 'on47MszZBY86ceDBh1BvZKy-GMSg'
      // openId: 'oQJYBw8oF3eJVigfu_T9Wi3nYoDA'
    }).then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('my/GET_BLESSING_SUCCESS', data)
        return Promise.resolve(data)
      }
    })
      .catch(err => {
        commit('my/GET_BLESSING_FAILURE', err)
        // return Promise.reject(err)
      })
  },
  // 获取我的福字记录
  loadMyBlessingRecords ({commit}) {
    commit('my/REQUEST_BLESSING_RECORDS')
    return this.$axios.$post(`${API_PREFIX}/blessing/records`, {
      openId: this.getters.openId
    }).then(response => {
      const data = getResData(response)
      if (resIsSuccess(response)) {
        commit('my/GET_BLESSING_RECORDS_SUCCESS', data)
        return Promise.resolve(data)
      }
    })
      .catch(err => {
        commit('my/GET_BLESSING_RECORDS_FAILURE', err)
        // return Promise.reject(err)
      })
  },
  // 店铺列表
  loadShopList ({commit}, params) {
    commit('shop/REQUEST_LIST')

    return this.$axios.$post(`${API_PREFIX}/shop`, params)
      .then(response => {
        resIsSuccess(response)
          ? commit('shop/GET_LIST_SUCCESS', getResData(response))
          : commit('shop/GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('shop/GET_LIST_FAILURE', err)
      })
  },
  // setReserveForm ({commit}, params) {
  //   commit('user/SET_RESERVER_FORM', params)
  // },
  // 获取抽奖次数
  luckyTimes ({commit}, params) {
    // console.log(this.getters.openId)
    commit('user/REQUEST_LUCKY')
    return this.$axios.$post(`${API_PREFIX}/blessing/times`, {
      openId: this.getters.openId
    })
      .then(response => {
        resIsSuccess(response)
          ? commit('user/GET_LUCKY_SUCCESS', getResData(response))
          : commit('user/GET_LUCKY_FAILURE')
      })
      .catch(err => {
        commit('user/GET_LUCK_FAILURE', err)
      })
  },
  // 获取助力信息
  loadActivityHelps ({commit}, params) {
    commit('activity/REQUEST_HELPS')
    return this.$axios.$post(`${API_PREFIX}/blessing/helps`, {
      ...params
    })
      .then(response => {
        resIsSuccess(response)
          ? commit('activity/GET_HELPS_SUCCESS', getResData(response))
          : commit('activity/GET_HELPS_FAILURE')
      })
      .catch(err => {
        commit('activity/GET_HELPS_FAILURE', err)
      })
  },
  // 获取助力者状态
  loadActivityHelperStatus ({commit}, params) {
    commit('activity/REQUEST_HELPER_STATUS')
    return this.$axios.$post(`${API_PREFIX}/blessing/helpStatus`, {
      openId: this.getters.openId,
      beOpenId: params.beOpenId
    })
      .then(response => {
        resIsSuccess(response)
          ? commit('activity/GET_HELPER_STATUS_SUCCESS', getResData(response))
          : commit('activity/GET_HELPER_STATUS_FAILURE')
      })
      .catch(err => {
        commit('activity/GET_HELPS_FAILURE', err)
      })
  },
  // 好友助力
  async dealHelpAction ({commit}, params) {
    const res = await this.$axios.$post(`${API_PREFIX}/blessing/help`, {
      openId: this.getters.openId,
      beOpenId: params.beOpenId
    })
    if (res && res.errno === 0) {
      return true
    } else {
      return false
    }
  },
  // 获取同构常量
  // loadConstants ({ commit }) {
  //   return this.$axios.$get(`${API_PREFIX}/constants`)
  //     .then(response => {
  //       resIsSuccess(response)
  //         ? commit('option/SET_CONSTANTS', getResData(response))
  //         : console.log('也是一个永远不会发生的异常：同构常量获取失败：', response)
  //     })
  //     .catch(err => {
  //       console.warn('获取同构常量错误，实际上这个错误永远也不会发生', err)
  //     })
  // },

  // 获取博主资料
  // loadAdminInfo ({ commit }) {
  //   commit('option/REQUEST_ADMIN_INFO')
  //   return this.$axios.$get(`${API_PREFIX}/auth`)
  //     .then(response => {
  //       resIsSuccess(response)
  //         ? commit('option/REQUEST_ADMIN_INFO_SUCCESS', getResData(response))
  //         : commit('option/REQUEST_ADMIN_INFO_FAILURE')
  //     })
  //     .catch(err => {
  //       commit('option/REQUEST_ADMIN_INFO_FAILURE', err)
  //     })
  // },

  // 获取全局配置
  // loadGlobalOption ({ commit }) {
  //   commit('option/REQUEST_GLOBAL_OPTIONS')
  //   return this.$axios.$get(`${API_PREFIX}/option`)
  //     .then(response => {
  //       resIsSuccess(response)
  //         ? commit('option/REQUEST_GLOBAL_OPTIONS_SUCCESS', getResData(response))
  //         : commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE')
  //     })
  //     .catch(err => {
  //       commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE', err)
  //     })
  // },

  // 获取标签列表
  // loadTagList ({ commit }, params = { per_page: 160 }) {
  //   commit('tag/REQUEST_LIST')
  //   return this.$axios.$get(`${API_PREFIX}/tag`, { params })
  //     .then(response => {
  //       resIsSuccess(response)
  //         ? commit('tag/GET_LIST_SUCCESS', getResData(response))
  //         : commit('tag/GET_LIST_FAILURE')
  //     })
  //     .catch(err => {
  //       commit('tag/GET_LIST_FAILURE', err)
  //     })
  // },

  // 获取分类列表
  // loadCategories ({ commit }, params = { per_page: 100 }) {
  //   commit('category/REQUEST_LIST')
  //   return this.$axios.$get(`${API_PREFIX}/category`, { params })
  //     .then(response => {
  //       resIsSuccess(response)
  //         ? commit('category/GET_LIST_SUCCESS', getResData(response))
  //         : commit('category/GET_LIST_FAILURE')
  //     })
  //     .catch(err => {
  //       commit('category/GET_LIST_FAILURE', err)
  //     })
  // },

  // 获取最热文章列表
  // loadHotArticles ({ commit }) {
  //   commit('article/REQUEST_HOT_LIST')
  //   return this.$axios.$get(`${API_PREFIX}/article`, { params: { hot: 1 } })
  //     .then(response => {
  //       resIsSuccess(response)
  //         ? commit('article/GET_HOT_LIST_SUCCESS', getResData(response))
  //         : commit('article/GET_HOT_LIST_FAILURE')
  //     })
  //     .catch(err => {
  //       commit('article/GET_HOT_LIST_FAILURE', err)
  //     })
  // },

  // 根据 post-id 获取评论列表
  // loadCommentsByPostId ({ state, commit }, params) {
  //
  //   const constants = state.option.constants
  //   const SORT_TYPE = constants && constants.SORT_TYPE || { desc: -1 }
  //
  //   params = Object.assign({
  //     page: 1,
  //     per_page: 88,
  //     sort: SORT_TYPE.desc
  //   }, params)
  //
  //   if (params.page === 1) {
  //     commit('comment/CLEAR_LIST')
  //   }
  //
  //   commit('comment/REQUEST_LIST')
  //   return this.$axios.$get(`${API_PREFIX}/comment`, { params })
  //     .then(response => {
  //       if (resIsSuccess(response)) {
  //         const data = getResData(response)
  //         Object.is(params.sort, SORT_TYPE.desc) && data.result.data.reverse()
  //         commit('comment/GET_LIST_SUCCESS', data)
  //       } else {
  //         commit('comment/GET_LIST_FAILURE')
  //       }
  //     })
  //     .catch(err => {
  //       commit('comment/GET_LIST_FAILURE', err)
  //     })
  // },
  //
  // 发布评论
  // postComment ({ commit }, comment) {
  //   commit('comment/POST_ITEM')
  //   return this.$axios.$post(`${API_PREFIX}/comment`, comment)
  //     .then(response => {
  //       const data = getResData(response)
  //       if (resIsSuccess(response)) {
  //         commit('comment/POST_ITEM_SUCCESS', data)
  //         return Promise.resolve(data)
  //       } else {
  //         commit('comment/POST_ITEM_FAILURE')
  //         return Promise.reject(data)
  //       }
  //     })
  //     .catch(err => {
  //       commit('comment/POST_ITEM_FAILURE', err)
  //       return Promise.reject(err)
  //     })
  // },

  // 获取公告列表
  // loadAnnouncements ({ commit }, params = {}) {
  //   commit('announcement/REQUEST_LIST')
  //   return this.$axios.$get(`${API_PREFIX}/announcement`, { params })
  //     .then(response => {
  //       resIsSuccess(response)
  //         ? commit('announcement/GET_LIST_SUCCESS', getResData(response))
  //         : commit('announcement/GET_LIST_FAILURE')
  //     })
  //     .catch(err => {
  //       commit('announcement/GET_LIST_FAILURE', err)
  //     })
  // },

}
