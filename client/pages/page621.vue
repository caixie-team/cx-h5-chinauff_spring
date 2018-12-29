<!-- 6.2.1、助力者打开邀请助力链接 -->
<template>
  <c-page type="bg1">
    <div
      slot="content"
      class="page621">
      <top-buttons
        :actions="actions"
        type="second"/>
      <span class="title"/>
      <div class="content">
        <div class="info">
          <div
            v-if="helps.avatars.length > 0"
            class="members members--overlap">
            <ul>
              <li
                v-for="(item, index) in helps.avatars"
                :key="index"
                class="member">
                <img
                  :src="item"
                  class="c-avatar c-avatar-image">
              </li>
            </ul>
          </div>
          <span class="moredot">••••••</span>

          <div class="total">
            <img
              src="~assets/img/page621/deng.png"
              class="text-deng">
            <span class="count">{{ helps.total }}</span>
            <img
              src="~assets/img/page621/weihaoyou.png"
              class="text-weihaoyou">
          </div>
          <img
            v-if="helper === 1 || helper === 2"
            src="~assets/img/page621/zhulizhuli.png"
            class="text-zhulizhuli">
          <div
            v-if="helper === 3"
            class="helperInfo">
            <h2>
              邀请好友为你助力集满“福”
            </h2>
            <span>
              参与助力的好友也将获得优惠券奖励
            </span>
          </div>
        </div>
        <img
          v-if="helper === 1"
          src="~assets/img/btn/btn_ljzl.png"
          class="btn-ljzl"
          @click="helpAction">
        <span
          v-else-if="helper === 2"
          class="helpLucky">
          <img
            src="~assets/img/btn/btn_ywczlg.png"
            class="btn-ywczlg">
          <nuxt-link to="/">
            点击此处前往集福
          </nuxt-link>
        </span>
        <img
          v-else-if="helper === 3"
          src="~assets/img/btn/btn_jxyqhyzl.png"
          class="btn-jxyqhyzl"
          @click="showDialog('share', { showClose: true })">
      </div>
      <div class="footer"/>
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
    // beOpenId 被助力者
    // openId 助力者
    // 分享时带上 beOpenId
    validate ({query}) {
      return query.beOpenId
    },
    fetch ({store, query, error}) {
      // console.log('query.beopenid....')
      // console.log(query.beOpenId)
      return Promise.all([
        store.dispatch('loadActivityHelperStatus', {beOpenId: query.beOpenId}),
        // 加载活动参与的关联信息
        store.dispatch('loadActivityHelps', {beOpenId: query.beOpenId})
      ])
      // if (query.coupon_code) {
      //
      // }
      // return store.dispatch('loadActivityHelps', params).catch(err => {
      //   error({statusCode: 404, message: '找不到页面'})
      // })
    },
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
      // coupon: {
      //   type: String,
      //   default: 'mianfei'
      // },
      // word: {
      //   type: String,
      //   default: 'kou'
      // }
    },
    data () {
      return {
        actions: ['hdjs'],
        total: '12,345',
        count: '2',
        tip1,
        tip2,
        limit: 2,
        headimgs: [
          'https://i.loli.net/2017/08/21/599a521472424.jpg',
          'https://i.loli.net/2017/08/21/599a521472424.jpg',
          'https://i.loli.net/2017/08/21/599a521472424.jpg',
          'https://i.loli.net/2017/08/21/599a521472424.jpg',
          'https://i.loli.net/2017/08/21/599a521472424.jpg',
        ],
        blessing_type: 0
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.user.info.data
      },
      // 助力页数据
      helps () {
        return this.$store.state.activity.helps.data
      },
      // 助力者
      helper () {
        return this.$store.state.activity.helper.status
      },
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
    watch: {
      // blessing (newVal) {
      //   if (newVal) {
      //     this.blessing_type = newVal.blessing_type
      //   }
      // },
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
          this.showDialog('success', {showClose: false})
        }
      }
    },
    mounted () {
      const coupon_code = this.$route.query.coupon_code
      // console.log(this.$route.query)
      // this.$nextTick(() => {
      if (this.userInfo.status === 1 && coupon_code && coupon_code !== null && coupon_code !== '') {
        // 领劵
        // http://demo.micvs.com/crmSession/console/api/coupon/sendCouponByActivity
        this.$store.dispatch('loadPrizeCoupon', {
          coupon_code: this.$route.query.coupon_code
        })
      }
      // })
    },
    methods: {
      async helpAction () {
        const beOpenId = this.$route.query.beOpenId
        // console.log(this.$route.query)
        // 检查助力者信息
        // this.$store.dispatch('loadPrizeBlessing')
        const isSuccess = await this.$store.dispatch('dealHelpAction', {
          openId: this.$store.getters.openId,
          beOpenId: this.$route.query.beOpenId
        })
        if (isSuccess) {
          await this.$store.dispatch('loadActivityHelperStatus', {beOpenId})
          const blessingData = await this.$store.dispatch('loadPrizeBlessing', {openId: beOpenId, encrypt: true})
          if (blessingData) {
            await this.$store.dispatch('loadPrizeLucky', {openId: beOpenId, encrypt: true})
          }
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

  .page621
    color: $color-dark
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: absolute
    left: 0
    width: 100%
    height: 100%
    justify-content: space-between
    overflow: hidden
    background: url('~assets/img/page621/topbg.png') no-repeat left top
    background-size: 566px 301px

    .helpLucky
      display: flex
      align-content: flex-start
      flex-direction: column
      align-items: center
      position: relative
      bottom: 100px

      a
        font-size: 24px
        font-weight: 500
        color: $color-white

      .btn-ywczlg
        position: relative
        width: 266px
        margin-bottom: 20px

    .helperInfo
      color: $color-white
      display: flex
      flex-direction: column
      align-content: flex-start
      align-items: center
      line-height: 30px
      font-size: 18px

      h2
        font-weight: 500
        font-size: 24px

    .title
      top: 50px
      position: relative
      background: url('~assets/img/page621/biaoti.png') no-repeat left top
      width: 340px
      height: 135px
      background-size: 340px 135px

    .content
      z-index: 0
      position: relative
      top: 60px
      display: flex
      flex-direction: column
      justify-content: space-between
      align-items: center
      background: url('~assets/img/page621/tcbg.png') no-repeat left top
      background-size: 394px 584px
      width: 394px
      height: 600px

      .info
        position: relative
        top: 160px
        display: flex
        flex-direction: column
        justify-content space-between
        align-items: center

        .total
          color: $color-white
          font-size: 21px
          display: flex
          flex-direction: row
          justify-content: center
          margin-bottom: 50px

          .count
            font-weight: 500
            margin: 0 4px 0 4px

          .text-deng
            width: 18px
            height: 21px

          .text-weihaoyou
            width: 128px
            height: 21px

      .text-zhulizhuli
        width: 185px
        height: 53px

      .btn-ljzl
        position: relative
        bottom: 100px
        width: 218px

      .btn-jxyqhyzl
        position: relative
        bottom: 100px
        width: 266px

      .moredot
        color: $color-white
        letter-spacing: 3px
        font-size: 18px
        padding: 10px

      .members
        ul
          float: left

        &--overlap
          .member
            margin-left: -15px
            float: right
            font-size: 10px

      .c-avatar
        display: inline-block
        text-align: center
        background: #ccc
        color: #fff
        white-space: nowrap
        position: relative
        overflow: hidden
        vertical-align: middle
        width: 48px
        height: 48px
        /*line-height: 32px*/
        border-radius: 100%
        border: 3px solid #fff

        > img
          width: 100%
          height: 100%

        &-image
          background: 0 0

    .footer
      z-index: 2
      background: url('~assets/img/page621/bottombg.png') no-repeat left bottom
      background-size: 640px 292px
      width: 640px
      height: 292px

</style>
