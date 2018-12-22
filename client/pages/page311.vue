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
        <!--<span class="fuzi fuzi-fu1"/>-->
        <div
          ref="slideWrapper"
          class="slide-container">
          <c-slide
            ref="slide"
            :data="items"
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
        <nuxt-link
          to="/pageYydh"
          class="">
          <img
            src="~assets/img/btn/btn_yydhh.png"
            class="btn-yydh">
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
  import fu1 from '~/assets/img/common/fu1.png'
  import fu2 from '~/assets/img/common/fu2.png'
  import fu3 from '~/assets/img/common/fu3.png'
  import fu4 from '~/assets/img/common/fu4.png'
  import {has} from 'lodash'

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
