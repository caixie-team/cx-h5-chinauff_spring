/**
 * @file prize 奖品 / ES module
 * @module store/prize
 */

export const state = () => {
  return {
    fetching: false,
    data: {
      data: []
    },
    // 集福
    blessing: {
      fetching: false,
      data: {
        name: '',
        blessing_type: '',
        full: false
      }
    },
    // 抽奖
    lucky: {
      fetching: false,
      data: {
        // 1 是优惠劵
        // 2 是会员充值卡
        type: 0,
        card: {
          card_name: '',
          card_type: 0
        },
        coupon: {
          coupon_code: '',
          openid: '',
          coupon_name: '',
          type_code: ''
        }
      }
    },
    // 领劵
    coupon: {
      fetching: false,
      data: {
        status: 0,
        coupon_code: '',
        crm_coupon_code: ''
      }
    }
  }
}

export const mutations = {
  REQUEST_BLESSING (state) {
    state.blessing.fetching = true
  },
  GET_BLESSING_SUCCESS (state, action) {
    console.log(action)
    state.blessing.data = action
  },
  GET_BLESSING_FAILURE (state) {
    state.blessing.fetching = false
  },
  // 抽奖
  REQUEST_LUCKY (state, action) {
    state.lucky.fetching = true
    // console.log(action)
    // state.coupon.data = action
  },
  GET_LUCKY_SUCCESS (state, action) {
    state.lucky.data = action
  },
  GET_LUCKY_FAILURE (state) {
    state.lucky.fetching = false
  },
  // 领劵
  REQUEST_COUPON (state, action) {
    state.coupon.fetching = true
    // console.log(action)
    // state.coupon.data = action
  },
  GET_COUPON_SUCCESS (state, action) {
    state.coupon.data = action
  },
  GET_COUPON_FAILURE (state) {
    state.coupon.fetching = false
  }
}
