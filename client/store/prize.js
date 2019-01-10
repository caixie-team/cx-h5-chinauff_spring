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
    // 集福数据统计
    stats: {
      fetching: false,
      data: {
        peopleNumber: 0,
        myblessingNumber: 0
      }
    },
    // 集福字操作
    blessing: {
      fetching: false,
      data: {
        name: null,
        blessing_code: null,         // 满福才会有的数据
        icon_num: null,        // 满福才会有的数据
        blessing_type: null,
        full: false // 满福为 true
      }
    },
    // 抽奖操作
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
    // 领劵操作
    coupon: {
      fetching: false,
      data: {
        // 已使用,这个码被发过了
        status: 0,
        // 领取状态
        // 领取状态(1未领取 2已领取)
        receive_status: 0,
        coupon_code: '',
        crm_coupon_code: ''
      }
    },
    // 预约领取卡
    receiveCard: {
      posting: false,
      data: {
        receive_time: null
      }
    },
    // 预约领取满福礼
    receiveBlessing: {
      posting: false,
      data: {
        status: 0,
        reserve_date: null
      }
    }
  }

}

export const mutations = {
  SET_FULL_BLESSING (state, action) {
    state.blessing.data = action
  },
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
  },

  // 获取集福统计数据
  REQUEST_STATS (state, action) {
    state.stats.fetching = true
  },
  GET_STATS_SUCCESS(state, action) {
    state.stats.data = action
  },
  GET_STATS_FAILURE (state) {
    state.stats.fetching = false
  },

  // 预约兑换卡
  REQUEST_RECEIVE_CARD(state) {
    state.receiveCard.posting = true
  },
  POST_RECEIVE_CARD_SUCCESS(state, action) {
    state.receiveCard.posting = false
    state.receiveCard.data = action
  },
  POST_RECEIVE_CARD_FAILURE(state) {
    state.receiveCard.posting = false
  },
  // 预约福
  REQUEST_RECEIVE_BLESSING(state) {
    state.receiveBlessing.posting = true
  },
  POST_RECEIVE_BLESSING_SUCCESS(state, action) {
    state.receiveBlessing.posting = false
    state.receiveBlessing.data = action
  },
  POST_RECEIVE_BLESSING_FAILURE(state) {
    state.receiveBlessing.posting = false
  }
}
