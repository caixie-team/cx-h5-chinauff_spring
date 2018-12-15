import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _69d379c3 = () => interopDefault(import('../client/pages/cardpack.vue' /* webpackChunkName: "pages/cardpack" */))
const _406c467d = () => interopDefault(import('../client/pages/demo.vue' /* webpackChunkName: "pages/demo" */))
const _1f3b410e = () => interopDefault(import('../client/pages/home.vue' /* webpackChunkName: "pages/home" */))
const _0e81a964 = () => interopDefault(import('../client/pages/luckpack.vue' /* webpackChunkName: "pages/luckpack" */))
const _75411abc = () => interopDefault(import('../client/pages/myprize.vue' /* webpackChunkName: "pages/myprize" */))
const _7026d328 = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

const scrollBehavior = function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/cardpack",
      component: _69d379c3,
      name: "cardpack"
    }, {
      path: "/demo",
      component: _406c467d,
      name: "demo"
    }, {
      path: "/home",
      component: _1f3b410e,
      name: "home"
    }, {
      path: "/luckpack",
      component: _0e81a964,
      name: "luckpack"
    }, {
      path: "/myprize",
      component: _75411abc,
      name: "myprize"
    }, {
      path: "/",
      component: _7026d328,
      name: "index"
    }],

    fallback: false
  })
}
