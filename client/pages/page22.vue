<!-- 5.1、二维码兑换 -->
<template>
  <c-page>
    <div slot="content">
      <div
        id="gameContainer"
        ref="gameContainer"/>
        <!--<pixi-index-bg class="bg"/>-->
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment'
  import TopButtons from '../components/top-buttons'
  import PageContent from '../components/page-content'
  import PixiIndexBg from '../components/pixi/pixi-indexbg'
  import bgLightImg from '~/assets/images/bg/page_bg_light.jpg'

  // import bunny from '../components/bunnyPlayground'
  /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
  /* global PIXI, Game */
  // import * as Game from '~/plugins/game'
  // if (isBrowser) {
  //   const Game = require('../components/pixi/game')
  // }
  // import Game from '~/plugins/game'
  export default {
    name: 'Index',
    components: {
      CPage,
      TopButtons,
      PageContent,
      PixiIndexBg
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
        app: null,
        game: null,
        isFirst: false,
        isLoadFirst: false,
        W: 0,
        H: 0,
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
      this.initGame()
    },
    methods: {
      initGame () {
        if (isBrowser) {
          const [w, h] = [window.innerWidth, window.innerHeight]
          const Ratio = window.devicePixelRatio
          // console.log(Ratio)
          this.W = w * Ratio
          this.H = h * Ratio
          this.worldWidth = 640
          this.worldHeight = 1136

          this.app = new PIXI.Application(
            window.innerWidth * Ratio,
            window.innerHeight * Ratio,
            {
              transparent: true
            })
          this.isHaveLoad = false
          this.isLoadFirst = false
          // this.game = Game.getInstance()
          const viewport = new PIXI.extras.Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: this.worldWidth,
            worldHeight: this.worldHeight
          })
          viewport.fitWidth(this.worldWidth, false, false)
            .fitHeight(this.worldHeight, false, false)
          this.app.stage.addChild(viewport)
          // 添加背景容器
          const bg = viewport.addChild(new PIXI.Container())
          // 添加背景图
          bg.addChild(new PIXI.Sprite.fromImage(bgLightImg))
          // 添加背景
          viewport.addChild(bg)

          this.$refs.gameContainer.appendChild(this.app.view)
          this.loadRes(() => {
            this.init6s()
            console.log('loading end...')
            // this.$store.dispatch('showLoading', {show: false})
          })
        }
      },
      /**
       * 初始化数据
       * @param d
       * @param cb
       */
      initData (d, cb) {
        if (!this.isHaveLoad) {
          this.loadRes(() => {
            cb && this.renderData(d, cb)
          })
        } else {
          cb && this.renderData(d, cb)
        }
      },
      /**
       * 加载资源
       * @param cb
       * @returns {boolean}
       */
      loadRes (cb) {
        if (this.isLoadFirst) {
          cb && cb()
          return false
        }

        this.isLoadFirst = true
        // 'assets/animation/6s/data.json',
        //   'assets/audio/6s.mp3'
        PIXI.loader.add([
          'assets/animation/6s/data.json',
          'assets/audio/6s.mp3'
        ]).load(() => {
          this.isHaveLoad = true
          cb && cb()
        })
      },
      init6s (data) {
        this.container && this.container.destory()
        this.container = new PIXI.Container()
        this.app.stage.addChild(this.container)
        // this.happyMusic = this.loader.resources['assets/audio/6s.mp3']
        const frames = []
        for (let i = 0; i < 61; i++) {
          frames.push(new PIXI.Texture.fromFrame('6s_001' + (26 + i)))
        }
        const anim = new PIXI.extras.AnimatedSprite(frames)
        // this.setSize(anim, this.W * 0.11)
        // anim.x = this.W / 2
        // anim.y = this.W / 2 - 50
        anim.x = window.innerWidth / 2
        anim.y = window.innerHeight / 2 - 50
        this.container.addChild(anim)
        anim.anchor.set(0.5)
        anim.animationSpeed = 0.2
        anim.play()
        // anim.width = this.W / 2
        // anim.height = this.H / 2
        // anim.anchor.set(0.5)
        // anim.animationSpeed = 0.2
        // anim.play()
        anim.width = this.worldWidth / 2
        anim.height = this.worldHeight / 2
        // this.app.stage.addChild(anim)
        // this.App.stage.addChild(anim)
        // this.happyMusic.sound.play()
      },
      setSize (sprite, len, size = 'width') {
        if (size === 'height') {
          const precent = len / sprite.height
          sprite.height = len
          sprite.width *= precent
        } else {
          const precent = len / sprite.width
          sprite.width = len
          sprite.height *= precent
        }
      },
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
    overflow: hidden
</style>
