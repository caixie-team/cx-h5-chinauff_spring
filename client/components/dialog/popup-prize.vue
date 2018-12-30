<!-- 活动介绍 -->
<template>
  <div class="popup prize">
    <div
      v-if="word"
      class="section">
      <img
        :src="_title"
        class="title">
      <span :class="_wordClass"/>
    </div>
    <div
      v-else
      class="section1">
      <img
        :src="_title"
        class="title1">
      <img
        src="~assets/img/icon/icon_cyddxz.png"
        class="icon">
    </div>
    <div class="section2">
      <span :class="_couponClass"/>
      <!-- 立即领取, 发劵 -->
      <img
        src="~assets/img/btn/btn_ljlqh.png"
        class="btn-lijilq"
        @click="getCoupon">
      <img
        :src="tips"
        class="tips">
    </div>

  </div>
</template>
<script>
  import title from '~/assets/img/text/text_gxnjd.png'
  import title1 from '~/assets/img/text/text_aocydd.png'
  import tips from '~/assets/img/text/text_yhqlqlcyx.png'
  import btn1 from '~/assets/img/btn/btn_friend.png'
  import btn2 from '~/assets/img/btn/btn_friend_timeline.png'
  import {isBrowser} from '~/environment'
  import apiConfig from '~/api.config'
  // 免费劵 3409
  // 4 元劵 (3410)
  // 8 元劵 (3411)
  // 5 折劵 (3412,3413,3414,3415,3416,3417,3418,3419)
  // 6 折劵 (3420,3421,3422,3423,3424,3425,3426,3427,3428)
  // 7 折劵 (3429,3430,3431,3432,3433,3434,3435)
  // 8 折劵 (3436,3437,3438,3439,3440,3441,3442,3443,3444)
  export default {
    props: {
      coupon_code: {
        type: String,
        default: ''
      },
      coupon_type: {
        type: Number,
        default: 0
      },
      blessing_type: {
        type: Number,
        default: 0
      },
    },
    data () {
      return {
        tips,
        btn1,
        btn2
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.user.info.data
      },
      coupon () {
        switch (this.coupon_type) {
          case 3409:
            return 'mianfei'
          case 3410:
            return 'siyuan'
          case 3411:
            return 'bayuan'
          case 3412:
          case 3413:
          case 3414:
          case 3415:
          case 3416:
          case 3417:
          case 3418:
          case 3419:
            return 'wuzhe'
          case 3420:
          case 3421:
          case 3422:
          case 3423:
          case 3424:
          case 3425:
          case 3426:
          case 3427:
          case 3428:
            return 'liuzhe'
          case 3429:
          case 3430:
          case 3431:
          case 3432:
          case 3433:
          case 3434:
          case 3435:
            return 'qizhe'
          case 3436:
          case 3437:
          case 3438:
          case 3439:
          case 3440:
          case 3441:
          case 3442:
          case 3443:
          case 3444:
            return 'bazhe'
          case 50:
            return 'huiyuanka'
          default:
            return 'aaaa'
        }
      },
      word () {
        switch (this.blessing_type) {
          case 1:
            return 'shi'
          case 2:
            return 'yi'
          case 3:
            return 'kou'
          case 4:
            return 'tian'
          default:
            return ''
        }
      },
      _title () {
        return this.word ? title : title1
      },
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
    methods: {
      getCoupon () {
        // 1 验证用户登录状态
        // 2 未登录跳转登录，回调地址包含验证劵码信息
        if (this.userInfo.status === 1) {
          // 领劵
          // http://demo.micvs.com/crmSession/console/api/coupon/sendCouponByActivity
          this.$store.dispatch('loadPrizeCoupon', {
            coupon_code: this.coupon_code
          })
        } else {
          this.redirectLogin()
        }
      },
      redirectLogin () {
        if (isBrowser) {
          let locationHref = window.location.href
          locationHref = locationHref + '&coupon_code=' + this.coupon_code
          const encodeUrl = encodeURIComponent(locationHref)
          window.location.href = `${apiConfig.proxyUrl}/weixin/page/loginPage?&channel2=18&callback2=${encodeUrl}`
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  .popup.prize
    width: 412px
    height: 688px
    overflow: hidden
    background: url('~assets/img/bg/popup_bg_big.png') no-repeat
    background-size: 412px 688px
    display: flex
    flex-direction: column
    text-align: center
    align-items: center

    .section,
    .section1
    .section2
      display: flex
      flex-direction: column
      align-items: center
      width: 360px
      height: 200px

    .section
      margin-top: 200px
      padding-bottom: 20px
      border-bottom: 1px solid #808080

      .title
        width: 252px
        height: 50px

      .word
        margin-top: 30px
        width: 80px
        height: 80px

        &-yi
          background-image: url("~assets/img/word/word_yi2.png")
          background-size: 60px 14px
          width: 60px
          height: 14px

        &-kou
          background-image: url("~assets/img/word/word_kou2.png")
          background-size: 53px 43px
          width: 53px
          height: 43px

        &-shi
          background-image: url("~assets/img/word/word_shi2.png")
          background-size: 61px 62px
          width: 61px
          height: 62px

        &-tian
          background-image: url("~assets/img/word/word_tian2.png")
          background-size: 59px 47px
          width: 59px
          height: 47px

    .section1
      margin-top: 200px
      padding-bottom: 20px
      border-bottom: 1px solid #808080

      .title1
        margin-bottom: 8px
        width: 326px
        height: 31px

      .icon
        width: 157px
        height: 166px

    .section2
      .tips
        width: 180px
        height: 19px
        top: 50px
        position: relative

      .btn-lijilq
        top: 40px
        position: relative
        width: 248px

      .coupon
        position: relative
        top: 20px
        width: 248px
        height: 88px
        background-size: 248px 88px

        &-bayuan
          background-image: url("~assets/img/gift/coupon_bayuan.png")

        &-bazhe
          background-image: url("~assets/img/gift/coupon_bazhe.png")

        &-liuzhe
          background-image: url("~assets/img/gift/coupon_liuzhe.png")

        &-mianfei
          background-image: url("~assets/img/gift/coupon_mianfei.png")

        &-qizhe
          background-image: url("~assets/img/gift/coupon_qizhe.png")

        &-siyuan
          background-image: url("~assets/img/gift/coupon_siyuan.png")

        &-wuzhe
          background-image: url("~assets/img/gift/coupon_wuzhe.png")

        &-huiyuanka
          background-image: url("~assets/img/gift/coupon_huiyuanka.png")

</style>
