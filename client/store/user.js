/* eslint-disable prefer-reflect,prefer-spread */
/*
*
* 文章数据状态
*
*/
export const state = () => ({
  info: {
    fetching: false,
    data: {
      openid: '',
      nickname: '请好好说话🌱',
      sex: 1,
      language: 'zh_CN',
      city: '丰台',
      province: '北京',
      country: '中国',
      headimgurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epTImibsmcibWuh9CMGNugXagRxCWy8N1cVSoaBPvs4KGdib7zuSEQHDBuu1lFrZ5ruhxiaaMN3BGNOUQ/132',
      privilege: [],
      unionid: ''
    }
  }
  // 福字
  // 获奖
  // 兑换
  // ...
})

export const mutations = {
  SET_USER_INFO (state, action) {
    state.info.data = action
  },
  // 获取用户信息
  REQUEST_USER_INFO (state) {
    state.info.fetching = true
  },
  REQUEST_USER_INFO_SUCCESS (state, action) {
    state.info.fetching = false
    state.info.data = action
  },
  REQUEST_USER_INFO_FAILURE (state) {
    state.info.fetching = false
    state.info.data = {}
  }
}
