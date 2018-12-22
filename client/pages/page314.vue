<!-- 3.1.1、集满福兑好礼 -->
<template>
  <c-page type="bg2">
    <div
      slot="content"
      class="page263">
      <top-buttons type="second"/>
      <img
        src="~assets/img/page311/shiba.png"
        class="imgShiba">
      <h1>
        {{ total }}人已集满 “福”, 您 已集满 {{ count }}个 “福”
      </h1>
      <div class="content">
        <span class="fuzi fuzi-fu1"/>
        <nuxt-link
          to="/pageYydh"
          class="">
          <img
            src="~assets/img/btn/btn_yydhh.png"
            class="btn">
        </nuxt-link>
        <img
          src="~assets/img/page311/qtqst.png"
          class="imgQtqst">
      </div>
      <div class="footer">
        <div class="toolbar">
          <span class="icon icon-shi">
            <sub>1</sub>
          </span>
          <span class="icon icon-yi">
            <sub>5</sub>
          </span>
          <span class="icon icon-kou">
            <sub>3</sub>
          </span>
          <span class="icon icon-tian">
            <sub>0</sub>
          </span>
        </div>
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

  export default {
    name: 'Index',
    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
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
    color: $color-dark
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: absolute
    left: 0
    width: 100%
    height: 100%
    justify-content: flex-start
    overflow: hidden
    .btn
      padding: 20px
      width: 248px
    .imgQtqst
      width: 158px
      height: 22px
    .imgShiba
      width: 263px
      height: 85px
      padding-top: 130px

    h1
      font-size: 22px
      font-weight: bold
      margin-top: 10px
      margin-bottom: 10px

    .content
      display: flex
      flex-direction: column
      align-items: center
      .fuzi
        width: 400px
        height: 436px
        background-size: 400px 436px

        &-fu1
          background-image: url("~assets/img/common/fu1.png")

        &-fu2
          background-image: url("~assets/img/common/fu2.png")

        &-fu3
          background-image: url("~assets/img/common/fu3.png")

        &-fu4
          background-image: url("~assets/img/common/fu4.png")

        &-fu5
          background-image: url("~assets/img/common/fu5.png")

        &-fu6
          background-image: url("~assets/img/common/fu6.png")

        &-fu7
          background-image: url("~assets/img/common/fu7.png")

        &-fu8
          background-image: url("~assets/img/common/fu8.png")

        &-fu9
          background-image: url("~assets/img/common/fu9.png")

        &-fu10
          background-image: url("~assets/img/common/fu10.png")

        &-fu11
          background-image: url("~assets/img/common/fu11.png")

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
            width: 266px
            height: 64px
            position: relative
            top: 100px

    .footer
      display: flex
      position: absolute
      bottom: 0
      width: 100%;
      height: 167px;
      background-image: url("~assets/img/common/footer_bsbg.png")
      background-size: 640px 167px
      justify-content: center

      .toolbar
        width: 90%;
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center;
        font-size: 20px

        .icon
          width: 120px
          height: 120px
          position: relative
          display: inline-block

          sub
            display: flex
            align-content: center
            justify-content: center
            align-items: center
            font-weight: bold
            position: absolute
            right: 0
            height: 30px
            width: 30px
            border-radius: 100%
            min-width: 30px
            font-size: 22px;
            background: #e6daa2;
            color: #a28e31;
            text-align: center;
            white-space: nowrap;
            z-index: 10;

          &-yi
            background: url("~assets/img/word/word_yi.png") no-repeat
            background-size: 120px 120px

          &-kou
            background: url("~assets/img/word/word_kou.png") no-repeat
            background-size: 120px 120px

          &-shi
            background: url("~assets/img/word/word_shi.png") no-repeat
            background-size: 120px 120px

          &-tian
            background: url("~assets/img/word/word_tian.png") no-repeat
            background-size: 120px 120px

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


</style>
