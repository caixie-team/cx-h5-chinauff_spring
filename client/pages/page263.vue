<!-- 2.6.3、集满福兑好礼 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page263">
      <top-buttons/>
      <img
        src="~assets/img/icon/icon_bt.png"
        class="imgBt">
      <div class="content">
        <section class="section1">
          <span :class="_couponClass"/>
          <nuxt-link
            to="/lingdaodejuan"
            class="link">
            查看领到的劵
          </nuxt-link>
          <img src="~assets/img/btn/btn_wyyjfh.png">
        </section>
      </div>
      <div class="footer">
        <!--
        <p>
          {{ stats.peopleNumber }}人已集满 “福”, 您已集满 {{ stats.myblessingNumber }}个 “福”
        </p>
        -->
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment_es'
  import TopButtons from '../components/top-buttons'
  import PageContent from '../components/page-content'
  import tip1 from '~/assets/img/text/text_gxnjd.png'
  import tip2 from '~/assets/img/text/text_gxncz.png'

  export default {
    name: 'Index',
    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米',
      }
    },
    components: {
      CPage,
      TopButtons,
      PageContent
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
    data () {
      return {
        total: '12,345',
        count: '2',
        tip1,
        tip2,
        limit: 2
      }
    },
    computed: {
      stats () {
        return this.$store.state.prize.stats.data
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
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .page263
    color: $color-white
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

    .imgBt
      padding: 120px 112px 20px 112px
      width: 444px
      height: 176px

    .content
      width: 412px
      height: 600px
      background: url('~assets/img/common/popup_bg_big.png')
      background-size: 412px 600px
      display: flex
      flex-direction: column
      align-items: center

      section
        display: flex
        flex-direction: column
        align-items: center
        width: 360px

        a
          color: #000
          font-weight: bold
          font-size: $fontsize-large-xxx
          top: 50px
          position: relative
          text-decoration: underline

        &.section1
          position: relative
          top: 180px

          img
            width: 248px
            position: relative
            top: 100px

    .footer
      display: flex
      flex-direction: column
      justify-content: center;
      align-items: center;
      font-size: 20px
      margin-top: 10px

      p
        line-height: 30px
        font-size: $fontsize-large-x
        font-weight: bold

      a
        width: 266px
        height: 64px
        display: flex
        align-items: center
        justify-content: center
        padding: 10px

        img
          width: 266px
          height: 64px

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

    .word
      margin-top: 20px
      width: 120px
      height: 120px
      background-size: 120px 120px

      &-heng
        background-image: url("~assets/img/word/word_yi2.png")

      &-kou
        background-image: url("~assets/img/word/word_kou2.png")

      &-shizipang
        background-image: url("~assets/img/word/word_shi2.png")

      &-shizipang
        background-image: url("~assets/img/word/word_tian2.png")
</style>
