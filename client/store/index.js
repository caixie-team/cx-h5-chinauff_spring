/* eslint-disable valid-jsdoc */
/**
 * @file 根数据状态,存放全局数据和异步方法 / ES module
 * @module store/entry
 * @author Baisheng <baisheng@caixie.top>
 */

// import Vue from 'vue'
import apiConfig from '~/api.config'
// import uaDevice from '~/utils/ua-device'
import {isBrowser, isServer} from '~/environment'
import {browserParse, osParse} from '~/utils/ua-os-browser'

const API_PREFIX = apiConfig.baseUrl
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
  return (req.protocol ? req.protocol : 'http') + '://' + req.headers['x-forwarded-host'] + req.originalUrl
  // return req.headers['x-forwarded-host']
}
// 初始化配置 Wechat JSSDK
const clientInitWechatJSSDK = async (config, commit) => {

  const wechatObj = new window.WechatJSSDK(config)
  wechatObj.initialize()
    .then(w => {
      // w is same as window.wechatObj
      const img = 'http://pic1.ooopic.com/uploadfilepic/shiliang/2009-10-05/OOOPIC_00cyl_20091005e2c6eb1c889e342e.jpg'
      // sugar method
      wechatObj.shareOnMoment({
        title: 'onMenuShareTimeline test title',
        type: 'link',
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
      w.callWechatApi('onMenuShareAppMessage', {
        title: 'onMenuShareAppMessage test title',
        type: 'link',
        desc: 'onMenuShareAppMessage share description',
        success: function () {
          console.log('share on chat success')
        },
        cancel: function () {
          console.log('share on chat canceled')
        },
        imgUrl: img
      })
    })
    .catch(err => {
      commit('option/SET_LOG_INFO', err)
      console.error(err)
    })
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
    // console.log('client init...')
    // console.log('Client init...')
    const jssdkConfig = JSON.parse(JSON.stringify(context.store.state.option.jssdkConfig))
    console.log('iniit jssdkConfig')
    await clientInitWechatJSSDK(jssdkConfig, commit)
    // window.app = this;
    // getCurrentPath() {
    //   return this.$store.state.section && this.$store.state.section != '/' ? `/${this.$store.state.section}` : '/';
    // }
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
        console.log(response)
        resIsSuccess(response)
          ? commit('option/SET_JSSDK_CONFIG', getResData(response))
          : console.log('微信签名信息获取失败：', response)
      })
      .catch(err => {
        console.warn('获取签名信息错误', err)
      })
  },
  loadJSSDKConfig ({commit}, url) {
    // return this.$axios.$post(`${API_THIRD}/activity/weChat/getConfigMessage?url=${encodeURIComponent(url)}`)
    const postUrl = `/proxy/activity/weChat/getConfigMessage?appid=wxb44ce8b8c5cfdc0a&url=${encodeURIComponent(url)}`
    return this.$axios.$post(postUrl)
      .then(response => {
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
        console.log(response)
        // resIsSuccess(response)
        //   ? commit('option/SET_JSSDK_CONFIG', getResData(response))
        //   : console.log('微信签名信息获取失败：', response)
      })
      .catch(err => {
        console.warn('获取签名信息错误', err)
      })
  }
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
