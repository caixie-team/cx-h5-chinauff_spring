<!-- 3.1.1、集满福兑好礼 -->
<template>
  <c-page type="bg2">
    <div
      slot="content"
      class="page311">
      <top-buttons
        :actions="actions"
        type="second"/>
      <img
        src="~assets/img/page311/shiba.png"
        class="imgShiba">
      <!--<h1>-->
      <!--{{ stats.peopleNumber }}人已集满 “福”, 您已集满 {{ stats.myblessingNumber }}个 “福”-->
      <!--</h1>-->
      <div
        v-if="myBlessingList.length > 0"
        class="content">
        <div
          ref="slideWrapper"
          class="slide-container">
          <c-slide
            ref="slide"
            :data="myBlessingList"
            :initial-index="initialIndex"
            :loop="loop"
            :auto-play="autoPlay"
            :interval="interval"
            :threshold="threshold"
            :speed="speed"
            :options="options"
            @change="changePage"
            @click="clickPage">
            <template
              v-if="dotsSlot"
              slot="dots"
              slot-scope="props">
              <span
                v-for="(item, index) in props.dots"
                :class="{active: props.current === index}"
                :key="index"
                class="my-dot">{{ index + 1 }}</span>
            </template>
          </c-slide>
        </div>
        <img
          v-if="currentBlessing.status === 1"
          src="~assets/img/btn/btn_yydhh.png"
          class="btn-yydh"
          @click="toPage41">
        <img
          v-if="currentBlessing.status === 2"
          src="~assets/img/btn/btn_dkdhmh.png"
          class="btn-yydh"
          @click="toPage51">
        <img
          v-if="currentBlessing.status === 3"
          src="~assets/img/btn/btn_ydhg.png"
          class="btn-yydh"
          @click="shareGuide">
        <p
          v-if="currentBlessing.status === 3">
          兑换于 {{ currentBlessing.exchange_time }}
        </p>
        <img
          v-if="currentBlessing.status === 1"
          src="~assets/img/page311/qtqst.png"
          class="imgQtqst">
      </div>
      <div
        v-else>
        <img
          src="~assets/img/icon/icon_hhdj.png"
          class="icon-hhdj"
          @click="shareGuide">
          <!--@click="showDialog('share', { showClose: true })">-->
      </div>
      <div class="footer">
        <div class="toolbar">
          <span
            v-for="icon in blessingIconList"
            :key="icon.blessing_type"
            :class="icon.class">
            <sub>{{ icon.num }}</sub>
          </span>
        </div>
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
  import EventBus from '~/utils/event-bus.js'

  export default {
    transition: 'page',
    name: 'Page311',
    head () {
      return {
        title: '我的福包',
      }
    },
    fetch ({store, query, error}) {
      return Promise.all([
        // 加载我的满福
        store.dispatch('loadMyBlessing'),
        // 加载我的福字记录
        store.dispatch('loadMyBlessingRecords')
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
        actions: ['hdjs', 'dhff', 'ckkb'],
        total: '12,345',
        count: '3',
        tip1,
        tip2,
        limit: 3,
        loop: true,
        autoPlay: false,
        interval: 4000,
        threshold: 0.3,
        speed: 400,
        allowVertical: false,
        initialIndex: 0,
        dotsSlot: false,
        addItem3: false,
        currentBlessing: {},
      }
    },
    computed: {
      myBlessingList () {
        return this.$store.state.my.blessing.data
      },
      myBlessingRecords () {
        return this.$store.state.my.blessingRecords.data
      },
      // 集到的福字Icon 处理
      blessingIconList () {
        const icons = [{
          class: 'icon icon-shi',
          blessing_type: 1,
          name: 'shi',
          num: 0
        }, {
          class: 'icon icon-yi',
          blessing_type: 2,
          name: 'yi',
          num: 0
        }, {
          class: 'icon icon-kou',
          blessing_type: 3,
          name: 'kou',
          num: 0
        }, {
          class: 'icon icon-tian',
          blessing_type: 4,
          name: 'tian',
          num: 0
        }]
        if (this.myBlessingRecords.length > 0) {
          for (let i = 0; i < this.myBlessingRecords.length; i++) {
            const record = this.myBlessingRecords[i]
            for (let j = 0; j < icons.length; j++) {
              if (icons[j].blessing_type === record.blessing_type) {
                icons[j].num = record.num
              }
            }
          }
        }
        return icons
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
      // console.log(this.myBlessingRecords)
      // 集满福进入弹窗
      // this.showDialog('prize', {
      //   coupon_type: 3419,
      //   blessing_type: 1
      // })
      this.currentBlessing = this.myBlessingList[this.initialIndex]
      // console.log()
    },
    methods: {
      shareGuide () {
        // console.log('share.....')
        EventBus.$emit('share', true)
      },
      // 预约兑换页
      toPage41 () {
        this.$store.commit('user/SET_RESERVER_FORM', {
          blessing_code: this.currentBlessing.blessing_code
        })
        this.$router.push('/page41/' + this.currentBlessing.blessing_code)
        // this.initialIndex
        // const blessing = this.myBlessingList[this.current]
        // console.log(blessing)
      },
      // 兑换码页
      toPage51 () {
        this.$router.push('/page51/' + this.currentBlessing.blessing_code)
      },
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          ...option
        })
        this.dialog.show()
      },
      changePage (current) {
        this.currentBlessing = this.myBlessingList[current]
        // this.current = current
        // console.log('当前序号为:' + current)
      },
      clickPage (item, index) {
        // console.log(item, index)
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .page311
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

    .slide-container
      width: 400px
      height: 436px
      margin-bottom: 5px
      transform: translateZ(0px)
      /*border-radius: 2px*/
      overflow: hidden
      /*box-shadow: 0 2px 9px #ddd*/

      .c-slide-item
        padding: 20px

      .c-slide-dots
        .my-dot
          height: auto
          font-size: 24px
          background: none

          &.active
            color: #fc9153

    .btn-yydh
      padding: 20px
      width: 248px

    .imgQtqst
      width: 158px
      height: 22px

    .imgShiba
      /*position: relative*/
      top: 100px
      width: 263px
      height: 85px
      padding-top: 18%

    h1
      font-size: 22px
      font-weight: bold
      margin-top: 10px
      margin-bottom: 10px

    .icon-hhdj
      z-index: 100
      width: 355px
      height: 585px

    /*background-size: 389px 618px*/
    /*background: url("~assets/img/icon/icon_hhdj.png") no-repeat*/

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
