/**
 * @file Blessing API/ ES module
 * @module store/prize
 */

export const state = () => {
  return {
    // 助力统计数据
    helps: {
      fetching: false,
      data: {
        // 当前助力人数
        total: '',
        avatars: [],
      }
    },
    helper: {
      fetching: false,
      // 1 未助力
      // 2 已助力
      // 3 同一个
      status: 0
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
  // 请求助力的关联信息
  REQUEST_HELPS (state, action) {
    state.helps.fetching = true
  },
  GET_HELPS_SUCCESS (state, action) {
    state.helps.data = action
  },
  GET_HELPS_FAILURE (state) {
    state.helps.fetching = false
  },
  // 请求助力者与被助力者状态信息
  REQUEST_HELPER_STATUS (state, action) {
    state.helper.fetching = true
  },
  GET_HELPER_STATUS_SUCCESS (state, action) {
    state.helper.status = action.status
  },
  GET_HELPER_STATUS_FAILURE (state) {
    state.helper.fetching = false
  }
}
