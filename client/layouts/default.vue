<template>
  <div
    v-cloak
    id="app">
    <share-guide v-show="share"/>
    <transition
      name="fade">
      <play12s v-show="isShow12s"/>
    </transition>
    <transition
      name="fade">
      <play6s v-show="isShow6s"/>
    </transition>
    <nuxt/>
  </div>
</template>
<script>
  /* eslint-disable new-cap,no-unused-vars,no-undef,space-infix-ops */
  /* global PIXI, Game */
  // import {mapState} from 'vuex'
  import ShareGuide from '../components/share/share-guide'
  import Play12s from '../components/game/play12s'
  import Play6s from '../components/game/play6s'

  import EventBus from '../utils/event-bus.js'
  // import bgLightImg from '~/assets/images/bg/page_bg_light.jpg'
  export default {
    // ...mapState('option', [
    //   'mobileLayout'
    // ]),
    components: {
      ShareGuide,
      Play12s,
      Play6s
    },
    data () {
      return {
        app: null,
        game: null,
        isFirst: false,
        isLoadFirst: false,
        W: 0,
        H: 0,
        share: false,
        isShow12s: false,
        isShow6s: false
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
      EventBus.$on('share', (e) => {
        this.share = e
      })
      EventBus.$on('show12s', (e) => {
        this.isShow12s = e
      })
      EventBus.$on('show6s', (e) => {
        this.isShow6s = e
      })
    },
    methods: {
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

