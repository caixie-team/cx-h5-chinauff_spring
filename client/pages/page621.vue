<!-- 6.2.1、助力者打开邀请助力链接 -->
<template>
  <c-page type="bg1">
    <div
      slot="content"
      class="page621">
      <top-buttons
        :actions="actions"/>
      <span class="title"/>
      <div class="content">
        <div class="info">
          <!--headimgs-->
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
            <span class="moredot"/>
          </div>

          <div class="total">
            <img
              v-if="helps.total > 0"
              src="~assets/img/page621/deng.png"
              class="text-deng">
            <span class="count">{{ helps.total }}</span>
            <img
              src="~assets/img/page621/weihaoyou.png"
              class="text-weihaoyou">
          </div>
          <img
            v-if="helper === 1 || helper === 2"
            src="~assets/img/page621/zlhyjmf.png"
            class="text-zhulizhuli">
          <!-- 如果是被助力者自己看到的 -->
          <div
            v-if="helper === 3"
            class="helperInfo">
            <img
              src="~assets/img/page621/yaoqinghaoyou.png"
              class="text-zlhyjmf">
          </div>
        </div>
        <!-- 立即助力 -->
        <img
          v-if="helper === 1"
          src="~assets/img/page621/ljzl.png"
          class="btn-ljzl"
          @click="helpAction">
        <!-- 已完成助力 -->
        <span
          v-if="helper === 2"
          class="helpLucky">
          <img
            src="~assets/img/page621/ywczl.png"
            class="btn-ywczlg">
          <nuxt-link to="/">
            <img
              src="~assets/img/page621/btn_djccqw.png"
              class="btn-djccqw">
          </nuxt-link>
        </span>
        <!-- 被助力者自己 -->
        <img
          v-if="helper === 3"
          src="~assets/img/page621/jixuyaoqing.png"
          class="btn-jxyqhyzl"
          @click="shareGuide">
          <!--@click="showDialog('share', { showClose: true })">-->
      </div>
      <div class="footer"/>
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
  // import text_zlhyjmf from '~/assets/img/page621/zlhyjmf.png'
  import EventBus from '~/utils/event-bus.js'

  export default {
    name: 'Index',
    // beOpenId 被助力者
    // openId 助力者
    // 分享时带上 beOpenId
    validate ({query}) {
      return query.beOpenId
    },
    fetch ({store, query, error}) {
      return Promise.all([
        store.dispatch('loadActivityHelperStatus', {beOpenId: query.beOpenId}),
        // 加载活动参与的关联信息
        store.dispatch('loadActivityHelps', {beOpenId: query.beOpenId})
      ])
    },
    head () {
      return {
        title: '助力好友集福',
      }
    },
    components: {
      CPage,
      TopButtons,
      PageContent
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
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          // 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        ],
        // headimgs: [
        // ],
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
      lucky (newVal) {
        // if (this.$route.path !== '/page65') {
        let coupon_type = 0
        let coupon_code = ''
        if (newVal.type === 1) {
          coupon_type = newVal.coupon.type_code
          coupon_code = newVal.coupon.coupon_code
        } else if (newVal.type === 2) {
          coupon_type = newVal.card.card_code
          coupon_code = newVal.card.card_code.toString()
        }
        // this.showDialog('prize1', {
        //   blessing_type: this.blessing.blessing_type,
        //   coupon_type,
        //   coupon_code
        // })
        // }
      },
      coupon (newVal) {
        // if (this.$route.path !== '/page65') {
        // if (newVal.receive_status === 2) {
        //   this.showDialog('success', {showClose: false})
        // }
        // }
      }
    },
    mounted () {
      // 这里不对要处理openid ....
      const coupon_code = this.$route.query.coupon_code
      if (coupon_code) {
        // 用于回调页面回来之后处理发劵，领劵
        if (this.userInfo.status === 1 &&
          this.userInfo.cardNo > 0 &&
          coupon_code &&
          coupon_code !== null &&
          coupon_code !== '') {
          // 领劵
          // http://demo.micvs.com/crmSession/console/api/coupon/sendCouponByActivity
          this.$store.dispatch('loadPrizeCoupon', {
            coupon_code: coupon_code,
          })
        }
      }
    },
    methods: {
      shareGuide () {
        EventBus.$emit('share', true)
      },
      // 开始助力
      // 1 提交助力者openId
      // 2 提交被助力者beOpenId
      async helpAction () {
        const beOpenId = this.$route.query.beOpenId
        const openId = this.$store.getters.openId
        const isSuccess = await this.$store.dispatch('dealHelpAction', {
          // 助力者打开后的自己的 openId
          openId,
          beOpenId
          // openId: this.$store.getters.openId,
          // beOpenId: this.$route.query.beOpenId
        })
        console.log(beOpenId + '被助力者')
        console.log(openId + '助力者')
        // 如果助力成功
        if (isSuccess) {
          // 根据被助力者，查询获取助力者状态，判断1、未助力，2、已助力，3、同一人
          await this.$store.dispatch('loadActivityHelperStatus', {beOpenId})
          // 帮助好友集福
          const blessingData = await this.$store.dispatch('loadPrizeBlessing', {
            openId: openId,
            beOpenId: beOpenId,
            encrypt: true
          })
          // 如果集福成功,自己抽个奖
          if (blessingData) {
            const luckyData = await this.$store.dispatch('loadPrizeLucky', {
              openId: openId,
              beOpenId: beOpenId,
              encrypt: true
            })

            let coupon_type = 0
            let coupon_code = ''
            // 类型 1 为优惠劵
            if (luckyData.type === 1) {
              coupon_type = luckyData.coupon.type_code
              coupon_code = luckyData.coupon.coupon_code
            }
            // else if (luckyData.type === 2) {
            //   coupon_type = luckyData.card.card_code
            //   coupon_code = luckyData.card.card_code.toString()
            // }
            if (this.$route.path === '/page621') {
              console.log('page 621 jprize 1')
              this.showDialog('prize1', {
                blessing_type: blessingData.blessing_type,
                coupon_type,
                coupon_code
              })
            } else {
              this.showDialog('prize', {
                blessing_type: blessingData.blessing_type,
                coupon_type,
                coupon_code
              })
            }
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
    position: fixed
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
        width: 208px
        margin-bottom: 10px

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
      background: url('~assets/img/page621/zlbg.png') no-repeat left top
      background-size: 389px 580px
      width: 389px
      height: 580px

      .info
        position: relative
        top: 160px
        display: flex
        flex-direction: column
        justify-content space-between
        align-items: center

        .total
          margin-top: 10px
          color: #524743
          font-size: 21px
          display: flex
          flex-direction: row
          justify-content: center
          margin-bottom: 10px

          .count
            font-weight: 500
            margin: 0 4px 0 4px

          .text-deng
            width: 21px
            height: 21px

          .text-weihaoyou
            width: 128px
            height: 21px

      .text-zhulizhuli
        width: 185px
        height: 53px

      .text-zlhyjmf
        width: 286px
        height: 53px

      .btn-ljzl
        position: relative
        bottom: 100px
        width: 218px

      .btn-jxyqhyzl
        position: relative
        bottom: 100px
        width: 266px

      .btn-djccqw
        position: relative
        width: 230px
        height: 27px


      .members
        display: flex
        flex-direction: column
        justify-content: flex-start
        align-content: center
        align-items: center
        margin-top: 20px
        height: 100px

        .moredot
          position: relative
          top: 20px
          background: url('~assets/img/page621/shenglue.png') no-repeat left bottom
          background-size: 56px 5px
          width: 56px
          height: 5px

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
