<template>
  <c-page type="bg1">
    <div
      slot="content"
      class="home">
      <top-buttons :actions="actions"/>
      <img
        src="~assets/images/home/bt.png"
        class="imgBt">
      <div class="footer">
        <div
          v-if="luckyTimes > 0"
          class="upload">
          <label for="theFile">
            <img
              src="~assets/img/btn/btn_sys.png"
              @click="picker">
          </label>
        </div>
        <div
          v-else
          class="upload"
          @click="showDialog('limit')">
          <label>
            <img src="~assets/img/btn/btn_sys.png">
          </label>
        </div>
      </div>
    </div>
    <!--<ai-scan class="scan"/>-->
  </c-page>
</template>
<script>
  /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
  /* global PIXI, Game */
  import EventBus from '~/utils/event-bus.js'

  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment_es'
  import TopButtons from '../components/top-buttons'
  import AiScan from '../components/ai-scan'
  import DialogScan from '../components/dialog/dialog-scan'
  // import Exif from 'exif-js'
  // import apiConfig from '~/api.config'

  export default {
    transition: 'fade',
    name: 'Index',
    // fetch ({store, query, error}) {
    //   console.log(query)
    //   if (query.coupon_code) {
    //     console.log(store.state.user.info.data)
    //     return this.$store.state.user.info.data
        //
        // if (store.state.user.info.data.status === 1 && query.coupon_code !== '') {
        //   return store.dispatch('loadPrizeCoupon', {
        //     coupon_code: query.coupon_code
        //   })
        // }
      // }
    // },
    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
      }
    },
    components: {
      CPage,
      TopButtons,
      AiScan,
      DialogScan
    },
    data () {
      return {
        isScan: false,
        headerImage: '',
        picValue: '',
        localId: '',
        serverId: '',
        showClose: true,
        actions: ['hdjs', 'wdfb']
      }
    },
    computed: {
      score () {
        return this.$store.state.ai.data.score
      },
      luckyTimes () {
        return this.$store.state.user.lucky.data.times
      },
      userInfo () {
        return this.$store.state.user.info.data
      },
      // 领劵数据
      coupon () {
        return this.$store.state.prize.coupon.data
      },
    },
    watch: {
      coupon (newVal) {
        if (newVal.receive_status === 2) {
          this.showDialog('success', {showClose: false})
        }
      },
      score (newVal) {
        // console.log('score .......')
        // console.log(newVal)
        // if (this.score === 100) {
        // 跳转到集福动画页
        // setTimeout(() => {
        //   this.$store.commit('ai/RESET_SCORE')
        //   EventBus.$emit('show12s', true)
        // this.$router.push('/page22')
        // }, 2500)

        // } else {
        //   setTimeout(() => {
        //     this.dialog.hide()
        //   }, 2500)
        //   this.picValue = ''
        // }
      },
    },
    mounted () {
      const coupon_code = this.$route.query.coupon_code
      if (coupon_code) {
        // 用于回调页面回来之后处理发劵，领劵
        if (this.userInfo.status === 1 && coupon_code !== null && coupon_code !== '') {
          // 领劵
          // http://demo.micvs.com/crmSession/console/api/coupon/sendCouponByActivity
          this.$store.dispatch('loadPrizeCoupon', {
            coupon_code: this.$route.query.coupon_code
          })
        }
      }
      // this.showDialog('limit', {showClose: false})

      this.$store.commit('ai/RESET_SCORE')
      this.$store.dispatch('luckyTimes', {
        openId: this.userInfo.openId
      })

      EventBus.$on('scan-success', () => {
        setTimeout(() => {
          this.dialog.hide()
          this.$store.commit('ai/RESET_SCORE')
          EventBus.$emit('show12s', true)
        }, 2500)
      })
      EventBus.$on('scan-failure', () => {
        // this.showClose = true
        // setTimeout(() => {
        //   this.dialog.hide()
        // }, 2500)
        this.picValue = ''
      })

    },
    methods: {
      picker () {
        // console.log('choose image ....')
        const self = this
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'],
          success: function (res) {
            const tempFilePaths = res.tempFilePaths
            const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            self.localId = localIds[0]

            if (self.localId) {
              self.showDialog('scan', {
                imgsrc: self.localId
              })
              self.upToWeixinServer(self.localId)
            }
          }
        })
      },
      upToWeixinServer (src) {
        wx.uploadImage({
          localId: src, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: async (res) => {
            // console.log('上传图片到微信服务完成')
            // console.log(res)
            await this.$store.dispatch('checkImage', {
              mediaId: res.serverId,
              openId: this.$store.getters.openId
            })
          }
        })
      },
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      },
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          ...option
        })
        this.dialog.show()
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .scan
    z-index: 100

  .c-dialog-content-def
    img
      width: 332px
      height: 108px

  .home
    color: #000
    display: flex
    align-items: center
    flex-direction: column
    justify-content: space-between
    min-height: 100vh
    /*position: absolute*/
    z-index: 1
    left: 0
    width: 100%
    height: 100%
    /*background: #ab2d2f;*/
    background-image: url('~assets/images/home/hn.png')
    background-size: 640px 1136px
    overflow: hidden

    .imgBt
      padding: 145px 112px 0 112px
      width: 444px
      height: 176px

    h1
      font-size: 48px
      font-weight: bold
      line-height: 100px
      text-shadow: 0 1px 30px rgba(0, 0, 0, 0.30);
      opacity: .8

    p
      font-size: $fontsize-large-xxx
      font-weight: bold

    .footer
      /*top: 200px*/
      position: relative
      /*flex: 1*/
      /*display: flex*/
      /*height: 300px*/
      /*flex-direction: column*/
      /*justify-content: flex-end;*/
      /*align-items: flex-end;*/
      margin-bottom: 40px
      color: #e6daa2;

      .upload
        width: 266px
        height: 100px

        label
          position: absolute

          img
            width: 266px
            height: 64px

        .file
          display: none

      a
        width: 266px
        height: 200px
        /*height: 64px*/
        /*background: url('~assets/images/bg/btn_default_bg.png') no-repeat*/
        /*background-size: 266px 64px*/
        display: flex
        align-items: center
        justify-content: center

        img
          width: 266px
          height: 64px
</style>
