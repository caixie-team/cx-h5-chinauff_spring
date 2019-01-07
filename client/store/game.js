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
 * @file Game / ES module
 * @module store/game
 */

export const state = () => {
  return {
    preLoad: null,
    fetching: false,
    loading: {
      show: true
    }
  }
}

export const getters = {
  loading: state => state.loading
}

export const mutations = {
  SHOW_LOADING (state, data) {
    state.loading = data
  }
}
// 显示加载界面
// export const SHOW_LOADING = 'SHOW_LOADING'
