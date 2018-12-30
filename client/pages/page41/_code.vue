<!-- 4.1、预约兑换 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page41">
      <top-buttons/>
      <div class="content">
        <div class="gift">
          <img src="~assets/img/page41/gift.png">
        </div>
        <img
          src="~assets/img/page41/text_jzc.png"
          class="text-jzc">
        <div class="exchange-form">
          <div class="exchange-form__content">
            <span
              class="date"
              @click="showDatePicker">
              选择日期
            </span>
            <!--// to: {name: 'people/team', params: {type: 'team'}},-->
            <span>
              <nuxt-link
                :to="{name: 'page43', params: userLocation}"
                class="shop">
                选择门店
              </nuxt-link>
            </span>

            <!--<span class="shop">-->
            <!--选择门店-->
            <!--</span>-->
            <img
              src="~assets/img/btn/btn_tjyyg.png"
              class="exchange-form__content btn">
            <img
              src="~assets/img/btn/btn_tjyy.png"
              class="exchange-form__content btn">
          </div>
        </div>

      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '~/components/c-page.vue'
  import {isBrowser} from '~/environment'
  import TopButtons from '~/components/top-buttons'
  import PageContent from '~/components/page-content'
  import tip1 from '~/assets/img/text/text_gxnjd.png'
  import tip2 from '~/assets/img/text/text_gxncz.png'

  export default {
    name: 'Index',
    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
      }
    },
    validate ({params, query}) {
      return !!params.code
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
      userLocation () {
        return this.$store.state.user.location.data
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
  .page41
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
          .btn
            position: relative
            width: 266px
            height: 64px
            bottom: 0
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
</style>
