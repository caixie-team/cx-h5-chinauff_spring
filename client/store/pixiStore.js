export const state = () => ({
  currentImage: '',
  slides: []
})

export const mutations = {
  setCurrentImage (state, data) {
    state.currentImage = data
  },
  setSlides (state, data) {
    for (const slide of data) {
      state.slides.push(slide._embedded['wp:featuredmedia'][0].source_url)
    }
  }
}

export const getters = {
  currentImage: state => state.currentImage,
  slides: state => state.slides
}
