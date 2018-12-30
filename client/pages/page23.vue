<!-- 2.3、收下福气 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page23">
      <pixi-background/>
      <div class="content">
        <span
          class="c-btn"
          @click="getLucky"/>
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment'
  import TopButtons from '../components/top-buttons'
  import PageContent from '../components/page-content'
  import tip1 from '~/assets/img/text/text_gxnjd.png'
  import tip2 from '~/assets/img/text/text_gxncz.png'
  import PixiBackground from '../components/pixi/pixi-background'

  export default {
    transition: 'bounce',
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
    timers: {
      log: {time: 1000, autostart: true}
    },
    data () {
      return {
        total: '12,345',
        count: '2',
        tip1,
        tip2,
        limit: 2,
        time: 6
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
      const coupon_code = this.$route.query.coupon_code
      // 用于回调页面回来之后处理发劵，领劵
      if (this.userInfo.status === 1 && coupon_code && coupon_code !== null && coupon_code !== '') {
        // 领劵
        // http://demo.micvs.com/crmSession/console/api/coupon/sendCouponByActivity
        this.$store.dispatch('loadPrizeCoupon', {
          coupon_code: this.$route.query.coupon_code
        })
      }
    },
    methods: {
      // 收下福气，抽奖
      async getLucky () {
        // 集福字
        const blessingData = await this.$store.dispatch('loadPrizeBlessing', {openId: this.$store.getters.openId})
        if (blessingData) {
          // 抽奖劵
          await this.$store.dispatch('loadPrizeLucky', {openId: this.$store.getters.openId})
        }
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
  .page23
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

      .c-btn
        display: flex
        justify-content: center
        align-items: center
        /*border: 2px solid #222222*/
        /*background: #ab2d2f*/
        background-image: url('~assets/img/btn/btn_sxfq.png')
        /*color: #ffffff*/
        position: absolute;
        z-index: 100;
        background-size: 248px 60px
        height: 60px
        width: 248px
        font-size: 24px

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
