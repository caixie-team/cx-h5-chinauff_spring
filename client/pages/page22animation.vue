<!-- 5.1、二维码兑换 -->
<template>
  <!--<c-page type="bg2">-->
  <!--<div slot="content">-->
  <div>
    <pixi-background/>
  </div>
  <!--</c-page>-->
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment'
  import TopButtons from '../components/top-buttons'
  import PageContent from '../components/page-content'
  import PixiBackground from '../components/pixi/pixi-background'
  // import bunny from '../components/bunnyPlayground'

  export default {
    name: 'Index',
    components: {
      CPage,
      TopButtons,
      PageContent,
      PixiBackground
    },

    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
      }
    },
    props: {
      coupon: {
        type: String,
        default: 'mianfei'
      },
      word: {
        type: String,
        default: 'kou'
      }
    },
    timers: {
      log: {time: 1000, autostart: true}
    },
    data () {
      return {
        total: '12,345',
        count: '2',
        limit: 2,
        time: 6,
        // By creating the provider in the data property, it becomes reactive,
        // so child components will update when `context` changes.
        provider: {
          // This is the CanvasRenderingContext that children will draw to.
          context: null
        }
      }
    },
    // Allows any child component to `inject: ['provider']` and have access to it.
    provide () {
      return {
        provider: this.provider
      }
    },
    computed: {
      _couponClass () {
        return [
          'coupon',
          'coupon-' + this.coupon
        ]
      },
      _wordClass () {
        return [
          'word',
          'word-' + this.word
        ]
      }
    },
    mounted () {
      // console.log('test ....')
      //
      // let type = "WebGL"
      // if(!PIXI.utils.isWebGLSupported()) {
      //   type = "canvas"
      // }
      // PIXI.utils.sayHello(type)
      // if (isBrowser) {
      // const play6s = this.$refs.play6s
      // We can't access the rendering context until the canvas is mounted to the DOM.
      // Once we have it, provide it to all child components.
      // this.provider.context = play6s.getContext('2d')
      // this.ctx = play6s.getContext('2d')
      // this.stage = new createjs.Stage(this.ctx)
      // Resize the canvas to fit its parent's width.
      // Normally you'd use a more flexible resize system.
      // play6s.width = play6s.parentElement.clientWidth
      // play6s.height = play6s.parentElement.clientHeight
      // setTimeout(() => {
      //   this.$router.push('/')
      // }, 6000)
      // this.timer()
      // }
    },
    methods: {
      timer () {
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000);
        } else {
          this.$router.push('/page23')
        }
      },
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      },
      log () {
        console.log('Hello world')
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .page22
    color: $color-dark
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: absolute
    left: 0
    width: 100%
    height: 100%
    justify-content: center
    overflow: hidden

    .content
      display: flex
      flex-direction: column
      align-items: center

      .qrcode
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        width: 380px
        height: 380px
        background: #E5D9A1

        img
          width: 340px
          height: 340px

      .text-qjrwmzsgsyy
        margin: 20px 0 30px 0
        width: 299px
        height: 25px

      .exchange-form
        width: 419px
        height: 235px
        background-image: url("~assets/img/bg/form_yydh.png")
        background-size: 419px 235px
        display: flex
        justify-content: flex-end

        &__content
          position: relative
          top: 110px
          display: flex
          flex-direction: column
          justify-content: space-between
          height: 80px
          width: 300px

        span
          font-weight: 500
          font-size: 22px
          position: relative

          &.date
            left: 30px

          &.shop
            left: 30px

    .footer
      display: flex
      position: absolute
      bottom: 0
      width: 100%;
      height: 167px;
      background-image: url("~assets/img/common/footer_bsbg.png")
      background-size: 640px 167px
      justify-content: center
</style>
