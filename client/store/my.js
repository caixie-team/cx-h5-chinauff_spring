/* eslint-disable prefer-reflect,prefer-spread */
/*
*
* 文章数据状态
*
*/
export const state = () => ({
  // 我的满福
// {
//   id: 0,
//     openId: '',
//   blessing_code: '',
//   status: 0,
//   exchange_time: null,
  // icon_num: 0
// }
  blessing: {
    fetching: false,
    data: []
  },
// {
  // 类型
  // blessing_type: 0,
  //   code: '',
  // 数量
  // num: 0
// }
  // 我的福字类型
  blessingRecords: {
    fetching: false,
    data: []
  }
})

export const mutations = {
  // 获取我的满福信息
  REQUEST_BLESSING (state) {
    state.blessing.fetching = true
  },
  GET_BLESSING_SUCCESS (state, action) {
    state.blessing.fetching = false
    const path = 'assets/images/blessing/'
    if (action.length > 0) {
      for (let item of action) {
        item.image = path + 'fu' + item.icon_num + '.png'
      }
    }
    state.blessing.data = action
  },
  GET_BLESSING_FAILURE (state) {
    state.blessing.fetching = false
    state.blessing.data = []
  },

  REQUEST_BLESSING_RECORDS (state) {
    state.blessingRecords.fetching = true
  },
  GET_BLESSING_RECORDS_SUCCESS (state, action) {
    state.blessingRecords.fetching = false
    state.blessingRecords.data = action
    // = Object.assign({}, state.location.data, action)
  },

  GET_BLESSING_RECORDS_FALURE (state) {
    state.blessingRecords.fetching = false
    state.blessingRecords.data = []
  },
}
