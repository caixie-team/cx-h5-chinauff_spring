import EventBus from '~/utils/event-bus.js';

export default ({app, store}) => {
  app.router.afterEach((to, from, next) => {
    // console.log(to)
    // PV 统计事件
    EventBus.$emit('page-view', {
      path: to.fullPath
    });

    if (to.path === '/page51') {
      // console.log('page51 请求二维码状态')
      // window.clearInterval(this.myInterval);
      // next();
    }
    // console.log(from.fullPath)
    // console.log(to.fullPath)
    // ga('set', 'page', to.fullPath)
    // ga('send', 'pageview')
    // store.commit('SET_BACK_HREF', from.path)
    // store.commit('SET_TO_HREF', to.path)
    // if (to.path === '/people' && from.path === '/people') {
    //   app.router.push('/people/team')
    // }
    // next(vm => {
    //   vm.$store.commit('SET_BACK_HREF', from.path)
    // })
  })
}

