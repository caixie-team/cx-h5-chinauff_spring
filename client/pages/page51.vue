<!-- 5.1、二维码兑换 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page51">
      <top-buttons/>
      <div class="content">
        <div class="qrcode">
          <img src="http://spring.chinauff.com/qrcode/?size=360">
        </div>
        <img
          src="~assets/img/text/text_qjrwmzsgsyy.png"
          class="text-qjrwmzsgsyy">
        <div class="exchange-form">
          <div class="exchange-form__content">
            <span class="date">
              2019年1月27日—2月7日
            </span>
            <span class="shop">
              湖州总部自由港店
            </span>
          </div>
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
  .page51
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
      .qrcode
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        width: 380px
        height: 380px
        background: #E5D9A1
        img
          width: 340px
          height: 340px
      .text-qjrwmzsgsyy
        margin: 20px 0 30px 0
        width: 299px
        height: 25px
      .exchange-form
        width: 419px
        height: 235px
        background-image: url("~assets/img/bg/form_yydh.png")
        background-size: 419px 235px
        display: flex
        justify-content: flex-end
        &__content
          position: relative
          top: 110px
          display: flex
          flex-direction: column
          justify-content: space-between
          height: 80px
          width: 300px
        span
          font-weight: 500
          font-size: 22px
          position: relative
          &.date
            left: 30px
          &.shop
            left: 30px
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
