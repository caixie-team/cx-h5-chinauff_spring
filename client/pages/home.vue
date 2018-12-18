<template>
  <!--<c-page-->
  <!--type="button-view"-->
  <!--title="欢迎">-->
  <div>
    <a :href="oauth.oauthUrl">OAuth 用户信息授权</a>
    <a :href="oauth.implicitOAuth">OAuth 静默授权</a>
    <a :href="oauth.oauthCache">OAuth 静默授权</a>
    <button
      class="bg-grey-lighter flex-1 border-b-2 md:flex-none border-grey ml-2 hover:bg-grey-lightest text-grey-darkest font-bold py-4 px-6 rounded">
      Question
    </button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <!--<div>{{ jssdkConfig }}</div>-->
  </div>
  <!--</c-page>-->
</template>
<script>
  import Vue from 'vue'

  import { mapState } from 'vuex'
  import apiConfig from '~/api.config'
  import CPage from '../components/c-page.vue'

  const API_PREFIX = apiConfig.baseUrl
  import { isBrowser } from '~/environment'
  import EventBus from '../utils/event-bus.js'
  // import { Toast, Button } from 'vant'
  // Vue.use(Button)

  export default {
    name: 'Index',
    components: {
      CPage,
      // Toast,
      // VanButton: Button
    },
    // head() {
    //   return {
    //     title: '老娘舅新春集福享好礼'
    //   }
    // },
    // async fetch ({ store, params }) {
    // console.log('lalala.......')
    // console.log(params)
    // let { data } = await axios.get('http://my-api/stars')
    // store.commit('setStars', data)
    // },
    fetch ({ store, route }) {
      const query = route.query
      console.log(query)
      if (query.code !== undefined && query.state !== undefined && query.state === 'userAuth') {
        return store.dispatch('loadWechatUserInfo', query.code)
        // console.log('a')
      }
      // return store.dispatch('loadGithubRepositories')
    },
    async asyncData ({ context, route }) {
      const query = route.query
      if (query.code !== undefined && query.state !== undefined && query.state === 'userAuth') {
        console.log('a')
      }
    },
    computed: {
      ...mapState({
        jssdkConfig: state => state.option.jssdkConfig,
        oauth: state => state.option.oauth,
        userInfo: state => state.user.info.data
      })
    },
    created () {
      // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx40f58df735cd2868&redirect_uri=http%3A%2F%2Fwx.caixie.top%2Fimplicit-oauth&response_type=code&scope=snsapi_base&state=userAuth#wechat_redirect
    },
    mounted () {
      if (isBrowser) {
        // EventBus.$emit('nav-close');

        if (this.userInfo.openid !== '') {
          console.log('lll')
        } else {
          console.log(this.oauth.implicitOAuth)
          // window.location.href = this.oauth.implicitOAuth
          // window.location.href = `${config.server}/activity/weChat/openId?callback=${config.host}`
        }
      }
      // console.log(this.$route.query)
      // window.location.href = this.oauth.oauthUrl
    }

  }
</script>
