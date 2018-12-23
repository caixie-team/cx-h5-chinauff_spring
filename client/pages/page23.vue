<!-- 2.3、收下福气 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page23">
      <div class="content">
        <span
          class="c-btn"
          @click="picker">
          收下福气
        </span>
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
    components: {
      CPage,
      TopButtons,
      PageContent
    },

    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
      }
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
    mounted () {
    },
    methods: {
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      },
      picker () {
        this.$router.push('/page241')
      },
      log () {
        console.log('Hello world')
      }
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
        border: 2px solid #222222
        background: #ab2d2f
        color: #ffffff
        height: 48px
        width: 218px
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
