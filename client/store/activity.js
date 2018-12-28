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
    state.helps.fetching = true
  },
  GET_HELPS_SUCCESS (state, action) {
    state.helps.data = action
  },
  GET_HELPS_FAILURE (state) {
    state.helps.fetching = false
  }
}
