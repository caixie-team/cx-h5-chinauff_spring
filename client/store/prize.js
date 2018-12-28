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
    blessing: {
      fetching: false,
      data: {
        name: '',
        blessing_type: '',
        full: false
      }
    },
    coupon: {
      fetching: false,
      data: {
        type: 0,
        card: {},
        coupon: {
          coupon_code: '',
          openid: '',
          coupon_name: '',
          type_code: ''
        }
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
  REQUEST_COUPON (state, action) {
    state.coupon.fetching = true
    // console.log(action)
    // state.coupon.data = action
  },
  GET_COUPON_SUCCESS (state, action) {
    state.coupon.data = action
  },
  GET_COUPON_FAILURE (state) {
    state.blessing.fetching = false
  }
}
