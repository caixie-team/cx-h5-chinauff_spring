/* eslint-disable prefer-reflect,prefer-spread */
/*
*
* 店铺数据
*
*/
export const state = () => ({
  list: {
    fetching: false,
    data: {
      data: []
    }
  },
  detail: {
    fetching: false,
    data: {}
  }
})

export const mutations = {
  // List
  CLEAR_LIST(state) {
    state.list.data = {
      data: [],
      pagination: {
        current_page: 0
      }
    }
  },

  REQUEST_LIST (state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE (state) {
    state.list.fetching = false
  },
  GET_LIST_SUCCESS (state, action) {
    state.list.fetching = false
    state.list.data = action
  },
  ADD_LIST_SUCCESS (state, action) {
    state.list.fetching = false
    state.list.data.data.push(...action.data)
    state.list.data.pagination = action.result.pagination
  },

  // Detail
  CLEAR_DETAIL (state) {
    state.detail.data = {}
  },

}
