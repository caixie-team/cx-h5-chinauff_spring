<template>
  <div
    v-cloak
    id="app">
    <share-guide v-show="share"/>
    <loading/>
    <transition
      name="fade">
      <div
        v-show="showGame"
        id="game_container"
        ref="game_container">
        <div
          v-if="showTimer"
          class="topbar">
          <span class="timer">
            {{ time }} 秒
          </span>
          <span
            class="jump"
            @click="jump">
            跳过
          </span>
        </div>
      </div>
    </transition>
    <nuxt v-if="!loading.show"/>
  </div>
</template>
<script>
  /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
  /* global PIXI, Game */
  import ShareGuide from '../components/share/share-guide'
  import Loading from '../components/game/loading'
  import EventBus from '../utils/event-bus.js'

  export default {
    components: {
      ShareGuide,
      Loading
    },
    data () {
      return {
        game: null,
        showGame: false,
        time: 12,
        app: null,
        isFirst: false,
        isLoadFirst: false,
        W: 0,
        H: 0,
        share: false,
        isShow12s: false,
        isShow6s: false,
        showTimer: false
      }
    },
    computed: {
      loading () {
        return this.$store.state.game.loading
      },
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
        // console.log(newVal)
        if (newVal.errno > 0) {
          this.showDialog('msg', {
            msg: newVal.errmsg
          })
          return
        }
        let coupon_type = 0
        let coupon_code = ''
        // 类型 1 为优惠劵
        if (newVal.type === 1) {
          coupon_type = newVal.coupon.type_code
          coupon_code = newVal.coupon.coupon_code
        } else if (newVal.type === 2) {
          coupon_type = newVal.card.card_code
          coupon_code = newVal.card.card_code.toString()
        }
        if (this.$route.path === '/page621') {
          this.showDialog('prize1', {
            blessing_type: this.blessing.blessing_type,
            coupon_type,
            coupon_code
          })
        } else {
          this.showDialog('prize', {
            blessing_type: this.blessing.blessing_type,
            coupon_type,
            coupon_code
          })
        }
      },
      coupon (newVal) {
        if (newVal.errno > 0) {
          this.showDialog('msg', {
            msg: newVal.errmsg
          })
          return
        }
        // console.log(this.$route.path)
        if (newVal.receive_status === 2 || newVal.status === 2) {
          if (this.$route.path !== '/page621') {
            this.showDialog('success', {showClose: false})
          } else {
            this.showDialog('success1', {showClose: false})
          }
        }
      },
    },
    mounted () {
      // EventBus.$on('re-signature', (path) => {
      //   console.log(path)
      this.$store.dispatch('nuxtClientInit')
      // })
      EventBus.$on('share', (e) => {
        this.share = e
      })
      EventBus.$on('getLucky', async () => {
        await this.getLucky()
      })
      if (process.browser) {
        if (this.game === null) {
          const GameClass = require('../components/game/game').default
          const gameInstance = new GameClass()
          // 初始化游戏
          this.initGame(gameInstance)
        }
      }
    },
    methods: {
      // 初始化游戏
      initGame (gameInstance) {
        // this.game = Game.getInstance()
        this.game = gameInstance
        this.$refs.game_container.appendChild(this.game.app.view)
        this.game.init(() => {
          this.$store.dispatch('showLoading', {show: false})
          EventBus.$on('play12s', (e) => {
            if (e === true) {
              this.time = 12
              this.timer()
              this.showTimer = true
              this.game.play12s()
              this.showGame = e
            } else {
              this.game.stop12s()
            }
          })
          EventBus.$on('play6s', (e) => {
            this.showGame = e
            e ? this.game.play6s() : this.game.stop6s()
          })

          EventBus.$on('jump-play12s', (e) => {
            this.showTimer = false
            this.time = 0
            this.game.stop12s()
            setTimeout(this.game.play6s(), 1000)
          })
        })
      },
      // 收下福气，抽奖
      async getLucky () {
        // 集福字
        const blessingData = await this.$store.dispatch('loadPrizeBlessing', {openId: this.$store.getters.openId})
        if (blessingData) {
          await this.$store.dispatch('loadPrizeLucky', {openId: this.$store.getters.openId})
          // 抽奖劵
          setTimeout(
            EventBus.$emit('play6s', false)
            , 500)
        }
      },
      timer () {
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000);
        } else {
          EventBus.$emit('jump-play12s', true)
        }
      },
      jump () {
        EventBus.$emit('jump-play12s', true)
      },
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          ...option
        })
        this.dialog.show()
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    background: #d92530
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%

    canvas
      width: 100%
      height: 100%

  #game_container
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 100

    .topbar
      position: absolute
      display: flex
      flex-direction: row
      justify-content: space-between
      padding: 20px
      width: 600px

      span
        display: flex
        font-size: 20px
        /*justify-items: center*/
        justify-content: center
        flex-direction: column
        text-align: center
        opacity: 0.5
        background: #000;
        width: 100px
        height: 40px
        border-radius: 100px
        /*text-align: center*/
        vertical-align: middle
        color: #fff
</style>

