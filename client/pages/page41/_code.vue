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
              <span v-if="formData.reserve_date === null">
                选择日期
              </span>
              <span v-else>
                {{ formData.format_date }}
              </span>
            </span>
            <!--// to: {name: 'people/team', params: {type: 'team'}},-->
            <span>
              <nuxt-link
                :to="{name: 'page43', params: userLocation}"
                class="shop">
                <span v-if="formData.shop === null">
                  选择门店
                </span>
                <span v-else>
                  {{ formData.shop_name }}
                </span>
              </nuxt-link>
            </span>
          </div>
        </div>
        <img
          v-if="isDisabled || isSubmit"
          src="~assets/img/btn/btn_tjyyg.png"
          class="btn">
        <img
          v-else
          src="~assets/img/btn/btn_tjyy.png"
          class="btn"
          @click="submit">
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '~/components/c-page.vue'
  import {isBrowser} from '~/environment_es'
  import TopButtons from '~/components/top-buttons'
  import PageContent from '~/components/page-content'
  import tip1 from '~/assets/img/text/text_gxnjd.png'
  import tip2 from '~/assets/img/text/text_gxncz.png'
  import EventBus from '~/utils/event-bus.js'

  export default {
    name: 'Index',
    head () {
      return {
        title: '预约兑换礼品'
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
        isSubmit: false,
        total: 0,
        count: 0,
        tip1,
        tip2,
        limit: 2,
        selectedDate: ''
      }
    },
    computed: {
      userLocation () {
        return this.$store.state.user.location.data
      },
      formData () {
        return this.$store.state.user.reserveForm.data
      },
      // reserve () {
      //   return this.$store.state.prize.receiveBlessing.data
      // },
      isDisabled () {
        const data = this.formData
        for (const i in data) {
          if (data[i] === '' || data[i] == null) {
            return true
          }
        }
        return false
      },
    },
    mounted () {
      // this.$store.commit('user/SET_RESERVER_FORM', {
      //   openId: this.$store.getters.openId
      // })
    },
    methods: {
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          ...option
        })
        this.dialog.show()
      },
      async submit () {
        this.isSubmit = true
        const res = await this.$store.dispatch('postReceiveBlessing', {
          openId: this.$store.getters.openId,
          shop_id: this.$store.state.user.reserveForm.data.shop,
          blessing_code: this.$store.state.user.reserveForm.data.blessing_code,
          reserve_date: this.$store.state.user.reserveForm.data.reserve_date
          // reserve_date: ''
        })
         if (res.errno > 0) {
           EventBus.$emit('err-msg', res.errmsg)
           this.isSubmit = false
          return
        }
         if (res.reserve_date !== null && res.status === 1) {
            this.showDialog('success3', {showClose: false})
         }
      },
      showDatePicker () {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: '预约兑换时间',
            min: new Date(2018, 12, 5),
            max: new Date(2019, 1, 1),
            value: new Date(),
            format: {
              year: 'YYYY年',
              month: ' MM月',
              date: ' D日'
            },
            onSelect: this.onSelect,
            onCancel: this.cancelHandle,
            onChange: () => {
              console.log('change')
            }
          })
        }

        this.datePicker.show()
      },
      onSelect (date, selectedVal, selectedText) {
        this.selectedDate = selectedText.join('')
        this.$store.commit('user/SET_RESERVER_FORM', {
          reserve_date: new Date(selectedVal).getTime(),
          format_date: selectedText.join('')
        })
        console.log(this.formData)
        console.log('current time: ' + new Date(selectedVal).getTime())
      },
      cancelHandle () {
        // this.$store.commit('user/SET_RESERVER_FORM', {
        //   reserve_date: null,
        //   format_date: null
        // })
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
    position: fixed
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

      .btn
        padding: 20px
        position: relative
        width: 248px

      .shop, .date
        color: $color-dark
        font-size: 20px
        line-height: 10px

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
          justify-items: center

        span
          font-weight: 500
          position: relative
          text-align: right
          right: 20px

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
