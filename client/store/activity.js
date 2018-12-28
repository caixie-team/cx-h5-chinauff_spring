/**
 * @file Blessing API/ ES module
 * @module store/prize
 */

export const state = () => {
  return {

    helps: {
      fetching: false,
      data: {
        // 当前助力人数
        total: '',
        avatars: [],
      }
    },
    blessing: {
      fetching: false,
      data: []
    },
    coupon: {
      fetching: false,
      data: []
    }
  }
}

export const mutations = {
  REQUEST_HELPS (state, action) {
    state.help.fetching = true
  },
  GET_HELPS_SUCCESS (state, action) {
    state.help.data = action
  },
  GET_HELPS_FAILURE (state) {
    state.list.fetching = false
  },
  REQUEST_BLESSING (state, action) {
    state.blessing.fetching = true
    console.log(action)
    state.blessing.data = action
  },
  REQUEST_COUPON (state, action) {
    state.coupon.fetching = true
    console.log(action)
    state.coupon.data = action
  }
}
