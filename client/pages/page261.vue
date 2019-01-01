<!-- 2.6.1、领取完成后页面-有字 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page261">
      <top-buttons :actions="actions"/>
      <h1>
        {{ stats.peopleNumber }}人已集满 “福”, 您 已集满 {{ stats.myblessingNumber }}个 “福”
      </h1>
      <div class="content">
        <section class="section1">
          <img
            :src="tip1"
            class="tip1">
          <span :class="_wordClass"/>

        </section>
        <section class="section2">
          <img
            :src="tip2"
            class="tip2">
          <span :class="_couponClass"/>

        </section>
      </div>
      <div class="footer">
        <a @click="showDialog('share', { showClose: true })">
          <img src="~assets/img/btn/btn_yqhyzl.png">
        </a>
        <nuxt-link
          v-if="luckyTimes > 1"
          to="/home">
          <img src="~assets/img/btn/btn_zlycl.png">
        </nuxt-link>
        <p>今天日还可参与 {{ luckyTimes }} 次</p>
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
    // validate ({query}) {
    //   return query.beOpenId
    // },
    fetch ({store, query, error}) {
      return Promise.all([
        store.dispatch('loadBlessingStatistics')
        // 获取集福统计数
        // store.dispatch('loadActivityHelperStatus', {beOpenId: query.beOpenId}),
        // 加载活动参与的关联信息
        // store.dispatch('loadActivityHelps', {beOpenId: query.beOpenId})
      ])
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
        limit: 2,
        actions: ['hdjs', 'wdqb', 'wdfb']
      }
    },
    computed: {
      luckyTimes () {
        return this.$store.state.user.lucky.data.times
      },
      stats () {
        return this.$store.state.prize.stats.data
      },
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
      // coupon () {
      //   return this.$store.state.prize.coupon.data
      // },
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
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          ...option
        })
        this.dialog.show()
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
  .page261
    color: #fff
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: absolute
    left: 0
    width: 100%
    height: 100%
    justify-content: center
    /*background: url('~assets/images/home/hn.png')*/
    /*background-size: 640px 1136px*/
    overflow: hidden

    h1
      font-size: 20px
      font-weight: bold
      margin-top: 150px
      margin-bottom: 10px

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
        width: 217px
        height: 43px
        position: relative

      .tip2
        width: 217px
        height: 43px
        position: relative

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

      //text-shadow: 0 1px 30px rgba(0, 0, 0, 0.30);

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
</style>
