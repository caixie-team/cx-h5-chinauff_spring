<!-- 查看领到的充值卡 -->
<template>
  <c-page type="bg2">
    <div
      slot="content"
      class="pageCard">
      <top-buttons
        :actions="actions"
        type="second"/>
      <div class="content">
        <div
          v-if="card"
          class="cards">
          <img
            src="~assets/img/icon/icon_card_cover.png"
            class="cover">
          <div
            class="cards-list">
            <div
              v-if="card.receive_time !== null && card.receive_time !== ''"
              class="cards-list__item">
              <span class="date">{{ card.receive_time }} </span>
              <span class="user">
                <span class="name">{{ card.recipient_name }}</span>
                <span class="phone">{{ card.phone_number }}</span>
              </span>
              <span class="address">{{ card.address }}</span>
            </div>
            <div
              v-else
              class="cards-list__item">
              <span class="no-info">
                未填入收件信息，卡未领取，<nuxt-link :to="`/card/${card.card_code}`">点此立即领取</nuxt-link>
              </span>
            </div>
          </div>
        </div>
        <img
          v-else
          src="~assets/img/icon/icon_no_czk.png"
          class="no-czk">
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
  import fu1 from '~/assets/img/common/fu1.png'
  import fu2 from '~/assets/img/common/fu2.png'
  import fu3 from '~/assets/img/common/fu3.png'
  import fu4 from '~/assets/img/common/fu4.png'
  import {has} from 'lodash'

  export default {
    transition: 'page',
    name: 'Index',
    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米',
      }
    },
    fetch ({store, query, error}) {
      return Promise.all([
        store.dispatch('loadMyCard')
        // store.dispatch('loadBlessingStatistics')
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
    props: {},
    data () {
      return {
        cardList: [],
        actions: ['hdjs', 'dhff', 'wdfb'],
        total: '12,345',
        count: '3',
        tip1,
        tip2,
        limit: 3,
        items: [
          {
            image: fu1
          }, {
            image: fu2
          }, {
            image: fu3
          }
        ],
        loop: true,
        autoPlay: false,
        interval: 4000,
        threshold: 0.3,
        speed: 400,
        allowVertical: false,
        initialIndex: 0,
        dotsSlot: false,
        addItem3: false
      }
    },
    computed: {
      card () {
        const list = this.$store.state.my.cards.data
        if (list.length > 0) {
          return list[0]
        }
      },
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
      options () {
        return {
          eventPassthrough: this.allowVertical ? 'vertical' : ''
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
    mounted () {
      // 集满福进入手弹窗
      // this.showDialog('jdfl')
    },
    methods: {
      changePage (current) {
        console.log('当前序号为:' + current)
      },
      clickPage (item, index) {
        console.log(item, index)
      },
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      },
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          word: has(option, 'word') ? option.word : '',
          coupon: has(option, 'coupon') ? option.coupon : '',
          showClose: has(option, 'showClose') ? option.showClose : true
        })
        this.dialog.show()
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .pageCard
    color: $color-dark
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: absolute
    left: 0
    width: 100%
    height: 100%
    overflow: hidden

    .content
      display: flex
      flex-direction: column
      align-content: center
      align-items: center
      justify-content: center
      height: 100%
      padding-top: 180px
      .cards-list
        margin-top: 50px
        width: 489px
        height: 205px
        background: url("~assets/img/bg/card_list_bg.png") no-repeat
        background-size: 489px 205px
        display: flex
        flex-direction: column
        /*padding: 20px*/
        /*justify-content: center*/
        &__item
          height: 300px
          font-size: 18px
          text-align: left
          .no-info
            font-size: 22px
            position: relative
            top: 120px
            left: 15px
          .date
            padding: 20px
            position: relative
            top: 30px
            left: 0
          .user
            display: flex
            flex-direction: row
            justify-content: flex-start
            width: 100%
            position: relative
            top: 80px
            left: 15px
            span
              padding-right: 20px
          .address
            position: relative
            top: 100px
            left: 15px

      .no-czk
        justify-self: center
        width: 379px
        height: 414px

      .cover
        width: 452px
        height: 304px

      .cards
        height: 100%
        display: flex
        flex-direction: column
        align-content: center
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
