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
      <img
        src="~assets/img/btn/btn_ljlqh.png"
        class="btn-lijilq">
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
    methods: {}
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
        margin-top: 20px
        width: 120px
        height: 120px
        background-size: 120px 120px

        &-heng
          background-image: url("~assets/img/word/word_heng.png")

        &-kou
          background-image: url("~assets/img/word/word_kou.png")

        &-shizipang
          background-image: url("~assets/img/word/word_shizipang.png")

        &-shizipang
          background-image: url("~assets/img/word/word_tian.png")

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
