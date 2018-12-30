// export const state = () => ({
//   currentImage: '',
//   slides: []
// })
//
// export const mutations = {
//   setCurrentImage (state, data) {
//     state.currentImage = data
//   },
//   setSlides (state, data) {
//     for (const slide of data) {
//       state.slides.push(slide._embedded['wp:featuredmedia'][0].source_url)
//     }
//   }
// }
//
// export const getters = {
//   currentImage: state => state.currentImage,
//   slides: state => state.slides
// }

/**
 * @file prize 奖品 / ES module
 * @module store/prize
 */

export const state = () => {
  return {
    preLoad: null,
    fetching: false,
    data: [],
    cacheData: {},
    getResourceByTag: null,
    s6: {
      fetching: false,
      data: [
        'assets/animation/6s/data.json',
        'assets/audio/6s.mp3'
      ]
    },
    s12: {
      fetching: false,
      data: [],
    },
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
