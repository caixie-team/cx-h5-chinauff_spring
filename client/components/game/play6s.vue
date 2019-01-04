<template>
  <div id="play6s">
    <div
      ref="play6s" />
    <span
      class="c-btn"
      @click="getLucky"/>
  </div>

</template>
<script>
  /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
  /* global PIXI, Game */
  import CPage from '~/components/c-page.vue'
  import EventBus from '../../utils/event-bus.js'
  import bgLightImg from '~/assets/images/bg/page_bg_light.jpg'
  export default {
    components: {
      CPage
    },
    data () {
      return {
        app: null,
        game: null,
        isFirst: false,
        isLoadFirst: false,
        W: 0,
        H: 0,
        share: false
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.user.info.data
      },
      // 抽奖数据
      // 集福数据
      blessing () {
        return this.$store.state.prize.blessing.data
      },
      // 抽奖数据
      lucky () {
        return this.$store.state.prize.lucky.data
      },
      // 领劵数据
      coupon () {
        return this.$store.state.prize.coupon.data
      }
    },
    watch: {
      lucky (newVal) {
        let coupon_type = 0
        let coupon_code = ''
        if (newVal.type === 1) {
          coupon_type = newVal.coupon.type_code
          coupon_code = newVal.coupon.coupon_code
        } else if (newVal.type === 2) {
          coupon_type = newVal.card.card_code
          coupon_code = newVal.card.card_code.toString()
        }
        this.showDialog('prize', {
          blessing_type: this.blessing.blessing_type,
          coupon_type,
          coupon_code
        })
      },
      coupon (newVal) {
        if (newVal.status === 2) {
          this.showDialog('success1', {showClose: false})
        }
      }
    },
    mounted () {
      // 初始化动化资源
      const [w, h] = [window.innerWidth, window.innerHeight]
      const Ratio = window.devicePixelRatio
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
      // 添加背景容器
      const bg = viewport.addChild(new PIXI.Container())
      // 添加背景图
      bg.addChild(new PIXI.Sprite.fromImage(bgLightImg))
      // 添加背景
      viewport.addChild(bg)
      this.$refs.play6s.appendChild(this.app.view)
      this.loadRes(() => {
        // console.log('loading end...')
        this.app.stage.addChild(viewport)
        this.init6s()
        // EventBus.$emit('')
        // this.$store.dispatch('showLoading', {show: false})
      })
    },
    methods: {
      // 收下福气，抽奖
      async getLucky () {
        // 集福字
        const blessingData = await this.$store.dispatch('loadPrizeBlessing', {openId: this.$store.getters.openId})
        if (blessingData) {
          // 抽奖劵
          await this.$store.dispatch('loadPrizeLucky', {openId: this.$store.getters.openId})
          // EventBus.$on('scan-success', () => {
            setTimeout(() => {
              EventBus.$emit('show6s', false)
              // EventBus.$emit('show12s', true)
            }, 1000)
          // })
        }
      },
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          ...option
        })
        this.dialog.show()
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
        this.loader = new PIXI.loaders.Loader()

        this.loader.add([
          'assets/animation/6s/data.json',
          'assets/audio/6s.mp3'
        ]).load(() => {
          this.isHaveLoad = true
          cb && cb()
        })
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
      init6s (data) {
        this.container && this.container.destory()
        this.container = new PIXI.Container()
        this.app.stage.addChild(this.container)
        this.happyMusic = this.loader.resources['assets/audio/6s.mp3']
        const frames = []
        for (let i = 0; i < 61; i++) {
          frames.push(new PIXI.Texture.fromFrame('6s_001' + (26 + i)))
        }
        const anim = new PIXI.extras.AnimatedSprite(frames)
        anim.x = window.innerWidth / 2
        anim.y = window.innerHeight / 2 - 50
        this.container.addChild(anim)
        anim.anchor.set(0.5)
        anim.animationSpeed = 0.2
        anim.width = this.worldWidth / 2
        anim.height = this.worldHeight / 2

        EventBus.$on('show6s', (e) => {
          if (e === true) {
            anim.play()
            this.happyMusic.sound.play()
          } else {
            anim.stop()
            this.happyMusic.sound.stop()
          }
        });
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #play6s
    position: fixed
    z-index: 30
  .c-btn
    align-self: center
    background-image: url('~assets/img/btn/btn_sxfq.png')
    position: absolute
    top: 550px
    left: 200px
    z-index: 31;
    background-size: 248px 60px
    height: 60px
    width: 248px
    font-size: 24px
</style>


