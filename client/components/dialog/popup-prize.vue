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

  export default {
    props: {
      coupon: {
        type: String,
        default: ''
      },
      word: {
        type: String,
        default: ''
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
        // 验证用户是否登录，未登录跳转
        this.redirectLogin()
        // 是
        // 发劵
        // 否
        // 注册\登录
      },
      redirectLogin () {
        if (isBrowser) {
          const encodeUrl = encodeURIComponent(window.location.href)
          window.location.href = `${apiConfig.proxyUrl}/weixin/page/loginPage?callback=${encodeUrl}`
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
</style>
