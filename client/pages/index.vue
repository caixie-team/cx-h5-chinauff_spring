<template>
  <div>
    <div class="c-cover">
      <van-button>我的福包</van-button>
      <!--<van-address-edit-->
      <!--:area-list="areaList"-->
      <!--:search-result="searchResult"-->
      <!--show-postal-->
      <!--show-delete-->
      <!--show-set-default-->
      <!--show-search-result-->
      <!--@save="onSave"-->
      <!--@delete="onDelete"-->
      <!--@change-detail="onChangeDetail"-->
      <!--/>-->
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-undef */

  import Vue from 'vue'

  import {mapState} from 'vuex'
  import apiConfig from '~/api.config'
  import CPage from '../components/c-page.vue'

  const API_PREFIX = apiConfig.baseUrl
  import {isBrowser} from '~/environment'
  import EventBus from '../utils/event-bus.js'
  // import { Toast, Button } from 'vant'
  // Vue.use(Button)

  export default {
    name: 'Index',
    components: {
      CPage
      // Toast,
      // VanButton: Button
    },
    data () {
      return {
        // areaList,
        searchResult: []
      }
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
    fetch ({store, route}) {
      const query = route.query
      console.log(query)
      if (query.code !== undefined && query.state !== undefined && query.state === 'userAuth') {
        return store.dispatch('loadWechatUserInfo', query.code)
        // console.log('a')
      }
      // return store.dispatch('loadGithubRepositories')
    },
    async asyncData ({context, route}) {
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
          // console.log('lll')
        } else {
          // console.log(this.oauth.implicitOAuth)
          // window.location.href = this.oauth.implicitOAuth
          // window.location.href = `${config.server}/activity/weChat/openId?callback=${config.host}`
        }
      }
      // console.log(this.$route.query)
      // window.location.href = this.oauth.oauthUrl
    },
    methods: {
      onSave () {
        this.$toast('save')
      },
      onDelete () {
        this.$toast('delete')
      },
      onChangeDetail (val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }]
        } else {
          this.searchResult = []
        }
      }
    }

  }
</script>
