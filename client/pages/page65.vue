<!-- 6.5、助力者已领助力奖励 -->
<template>
  <c-page bg="bg1">
    <div
      slot="content"
      class="page65">
      <top-buttons
        :actions="actions"/>
      <span class="title"/>
      <div class="content">
        <section class="section1">
          <span
            :class="_couponClass"
            @click="redirectUserCenter"/>
          <img
            :src="tip1"
            class="tip1">

        </section>
        <section class="section2">
          <nuxt-link to="/">
            <img
              :src="btn1"
              class="tip2">
          </nuxt-link>
        </section>
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment_es'
  import TopButtons from '../components/top-buttons'
  import PageContent from '../components/page-content'
  // 查看领取的劵
  import tip1 from '~/assets/img/page65/text_cklddq.png'
  import tip2 from '~/assets/img/text/text_gxncz.png'
  import btn1 from '~/assets/img/page65/btn_wywjf.png'
  import apiConfig from '~/api.config.es'

  export default {
    name: 'Index',
    head () {
      return {
        title: '助力好友集福'
      }
    },
    components: {
      CPage,
      TopButtons,
      PageContent
    },
    data () {
      return {
        total: '12,345',
        actions: ['hdjs'],
        count: '2',
        tip1,
        tip2,
        btn1,
        limit: 2,
        headimgs: [
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        ]
      }
    },
    computed: {
      // 抽奖数据
      lucky () {
        return this.$store.state.prize.lucky.data
      },
      coupon () {
        switch (this.lucky.coupon.type_code) {
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
            return 'wuzhe'
        }
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
      redirectUserCenter () {
        let locationHref = window.location.href
        locationHref = locationHref + '&coupon_code=' + this.coupon_code
        const encodeUrl = encodeURIComponent(locationHref)
        window.location.href = `${apiConfig.proxyUrl}/weixin/page/couponList`
      },
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

  .page65
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

    .title
      position: relative
      background: url('~assets/img/page621/biaoti.png') no-repeat left top
      width: 340px
      height: 135px
      background-size: 340px 135px
    .content
      width: 412px
      height: 600px
      background: url('~assets/img/bg/popup_bg_big.png')
      background-size: 412px 600px
      display: flex
      flex-direction: column
      align-items: center

      section
        display: flex
        flex-direction: column
        align-items: center
        width: 360px
        height: 200px

        &.section1
          position: relative
          top: 180px

        &.section2
          margin-top: 200px

      .tip1
        margin-top:40px
        width: 149px
        height: 23px
        position: relative

      .tip2
        width: 251px
        height: 61px
        position: relative

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
