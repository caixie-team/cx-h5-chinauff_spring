<!-- 4.3、店铺列表 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page43">
      <top-buttons/>
      <div class="content">
        <div class="shopList">
          <div class="input-search">
            <c-input
              v-model="value"
              placeholder="请输入门店关键字">
              <i
                slot="append"
                class="cubeic-search"/>
            </c-input>
          </div>
          <div class="scroll-list-wrap">
            <c-scroll
              ref="scroll"
              :data="items"
              :options="options"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp">
              <ul class="foods-wrapper">
                <c-radio-group>
                  <c-radio
                    v-for="(shop, index) in shopList"
                    :option="{
                      label: shop.shop_name,
                      value: shop.shop_code
                    }"
                    :key="index"
                    v-model="selected">
                    <li
                      class="food-item border-1px">
                      <div class="icon">
                        <img
                          src="~assets/img/bg/shop_bg.jpg"
                          width="100"
                          height="59">
                      </div>
                      <div class="shop-content">
                        <h2 class="name">{{ shop.shop_name }}</h2>
                        <p class="description">{{ shop.address }}</p>
                        <div
                          v-if="shop.distance"
                          class="extra">
                          <span>距您 {{ shop.distance / 1000 }} 公里</span>
                        </div>
                        <!--<div class="extra">-->
                        <!--<span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>-->
                        <!--</div>-->
                        <!--<div class="price">-->
                        <!--<span class="now">￥{{ food.price }}</span>-->
                        <!--<span-->
                        <!--v-show="food.oldPrice"-->
                        <!--class="old">￥{{ food.oldPrice }}</span>-->
                        <!--</div>-->
                      </div>
                    </li>
                  </c-radio>
                </c-radio-group>
              </ul>
              <template
                v-if="customPullDown"
                slot="pulldown"
                slot-scope="props">
                <div
                  v-if="props.pullDownRefresh"
                  :style="props.pullDownStyle"
                  class="c-pulldown-wrapper">
                  <div
                    v-show="props.beforePullDown"
                    :style="{paddingTop: props.bubbleY + 'px'}"
                    class="before-trigger">
                    <span :class="{rotate: props.bubbleY > pullDownRefreshThreshold - 40}">↓</span>
                  </div>
                  <div
                    v-show="!props.beforePullDown"
                    class="after-trigger">
                    <div
                      v-show="props.isPullingDown"
                      class="loading">
                      <!--<c-loading/>-->
                    </div>
                    <div
                      v-show="!props.isPullingDown"
                      class="text"><span class="refresh-text">Refresh success</span></div>
                  </div>
                </div>
              </template>
            </c-scroll>
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
  import goodsData from '~/example/data/goods-list.json'

  let _foods = []

  goodsData.goods.forEach(item => {
    _foods = _foods.concat(item.foods)
  })
  export default {
    name: 'Index',
    fetch ({store, params}) {
      return store.dispatch('loadShopList', params)
    },
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
        selected: '',
        value: '',
        items: _foods,
        pullDownRefresh: false,
        pullDownRefreshThreshold: 60,
        pullDownRefreshStop: 40,
        pullDownRefreshTxt: 'Refresh success',
        pullUpLoad: false,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: 'Load more',
        pullUpLoadNoMoreTxt: 'No more data',
        customPullDown: false,
        total: '12,345',
        count: '2',
        tip1,
        tip2,
        limit: 2
      }
    },
    computed: {
      userLocation () {
        return this.$store.state.user.location.data
      },
      shopList () {
        return this.$store.state.shop.list.data
      },
      options () {
        return {
          pullDownRefresh: this.pullDownRefreshObj,
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: true
        }
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold, 10),
          // Do not need to set stop value, but you can if you want
          // stop: parseInt(this.pullDownRefreshStop),
          txt: this.pullDownRefreshTxt
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold, 10),
          txt: {
            more: this.pullUpLoadMoreTxt,
            noMore: this.pullUpLoadNoMoreTxt
          }
        } : false
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
    async mounted () {
      if (isBrowser) {
        // const wx = window.wechatObj.getOriginalWx()
        // console.log(wx)
        // console.log('mounted page43')
        // await this.$store.dispatch('loadShopList', this.userLocation)
      }
    },
    methods: {
      onPullingDown () {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.items.unshift(_foods[1])
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      onPullingUp () {
        // 更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            const newPage = _foods.slice(0, 5)
            this.items = this.items.concat(newPage)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      updatePullDownRefresh (val) {
        this.pullDownRefresh = val
      },
      updatePullDownRefreshThreshold (val) {
        this.pullDownRefreshThreshold = val
      },
      // updatePullDownRefreshStop(val) {
      //   this.pullDownRefreshStop = val
      // },
      updatePullDownRefreshTxt (val) {
        this.pullDownRefreshTxt = val
      },
      updatePullUpLoad (val) {
        this.pullUpLoad = val
      },
      updatePullUpLoadThreshold (val) {
        this.pullUpLoadThreshold = val
      },
      updatePullUpLoadMoreTxt (val) {
        this.pullUpLoadMoreTxt = val
      },
      updatePullUpLoadNoMoreTxt (val) {
        this.pullUpLoadNoMoreTxt = val
      },
      updateCustomPullDown (val) {
        this.customPullDown = val
      },
      rebuildScroll () {
        // Vue.nextTick(() => {
        //   this.$refs.scroll.destroy()
        //   this.$refs.scroll.initScroll()
        // })
      },
      showDatePicker () {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: '预约兑换时间',
            min: new Date(2018, 12, 5),
            max: new Date(2019, 1, 4),
            value: new Date(),
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle,
            onChange: () => {
              console.log('change')
            }
          })
        }

        this.datePicker.show()
      },
      selectHandle (date, selectedVal, selectedText) {
        console.log(date)
        // this.$createDialog({
        //   type: 'warn',
        //   content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
        //   icon: 'cubeic-alert'
        // }).show()
      },
      cancelHandle () {
        // this.$createToast({
        //   type: 'correct',
        //   txt: 'Picker canceled',
        //   time: 1000
        // }).show()
      },
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .c-input
    background: #ffebd9
    border-radius: 10px

  .c-input-field
    border-radius: 10px

  .page43
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

    .shopList
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 475px
      height: 780px
      background-image: url("~assets/img/page43/list_bg.png")
      background-size: 475px 780px

    .input-search
      height: 50px
      width: 90%
      margin-top: 20px

    .content
      display: flex
      flex-direction: column
      align-items: center

      .gift
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        width: 383px
        height: 382px
        background: #E5D9A1

        img
          width: 383px
          height: 382px

      .text-jzc
        margin: 20px 0 30px 0
        width: 416px
        height: 25px

      .exchange-form
        width: 419px
        height: 165px
        background-image: url("~assets/img/page41/form_mdbg.png")
        background-size: 419px 165px
        display: flex
        justify-content: flex-end

        &__content
          position: relative
          top: 40px
          display: flex
          flex-direction: column
          justify-content: space-between
          height: 90px
          width: 200px

        span
          font-weight: 500
          font-size: 24px
          position: relative
          text-align: right
          right: 30px

    .footer
      display: flex
      position: absolute
      bottom: 0
      width: 100%;
      height: 167px;
      background-image: url("~assets/img/common/footer_bsbg.png")
      background-size: 640px 167px
      justify-content: center


  .scroll-wrapper
    .c-pulldown-wrapper
      .before-trigger
        font-size: 30px
        line-height: 30px
        align-self: flex-end

        span
          display: inline-block
          transition: all 0.3s
          color: #666

          &.rotate
            transform: rotate(180deg)

      .after-trigger
        .refresh-text
          color: grey

  .scroll-list-wrap
    height: 760px
    /*border-radius: 5px*/
    padding: 10px
    transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden


  .foods-wrapper
    .food-item
      display: flex
      padding: 18px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)

      &:last-child
        border-none()
        margin-bottom: 0

      .icon
        flex: 0 0 57px
        margin-right: 10px

      .shop-content
        flex: 1
        .name
          margin: 4px 0 16px 0
          height: 14px
          line-height: 14px
          font-size: 18px
          color: rgb(7, 17, 27)

        .description, .extra
          line-height: 14px
          font-size: 14px
          color: rgb(147, 153, 159)

        .description
          line-height: 12px
          margin-bottom: 8px

</style>
