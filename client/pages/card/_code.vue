<!-- 领取会员充值卡 -->
<template>
  <c-page type="bg4">
    <div
      slot="content"
      class="pageCardForm">
      <!--<top-buttons/>-->
      <div class="content">
        <img
          src="~assets/img/icon/icon_card_cover.png"
          class="cover">
        <no-ssr>
          <div class="card-form">
            <c-form
              :model="model"
              :options="options"
              @submit="submitHandler"
              @validate="validateHandler">
              <c-form-group>
                <c-form-item :field="fields[0]"/>
                <c-form-item :field="fields[1]"/>
                <c-form-item :field="fields[2]"/>
                <c-form-item :field="fields[3]"/>
              </c-form-group>
              <c-form-group class="form-footer">
                <c-button
                  class="btn-submit"
                  type="submit">
                  <img
                    src="~assets/img/btn/btn_tijiaolingqu.png"
                    class="btn-tijiaolingqu">
                </c-button>
              </c-form-group>
            </c-form>
          </div>
        </no-ssr>
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '~/components/c-page.vue'
  import {isBrowser} from '~/environment_es'
  import TopButtons from '~/components/top-buttons'
  import {provinceList, cityList, areaList} from '~/example/data/area'

  // import PageContent from '~/components/page-content'
  import tip1 from '~/assets/img/text/text_gxnjd.png'
  import tip2 from '~/assets/img/text/text_gxncz.png'

  const cityData = provinceList
  cityData.forEach(province => {
    province.children = cityList[province.value]
    province.children.forEach(city => {
      city.children = areaList[city.value]
    })
  })
  const PCA = {
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        selected: []
      }
    },
    render (createElement) {
      return createElement('c-button', {
        on: {
          click: this.showPicker
        }
      }, this.selected.length ? this.selected.join(' ') : '选择区域')
    },
    mounted () {
      this.picker = this.$createCascadePicker({
        title: '区域选择',
        data: cityData,
        selectedIndex: this.value,
        onSelect: this.selectHandler
      })
    },
    methods: {
      showPicker () {
        this.picker.show()
      },
      selectHandler (selectedVal, selectedIndex, selectedTxt) {
        this.selected = selectedTxt
        this.$emit('input', selectedTxt)
      }
    }
  }

  export default {
    name: 'Index',
    head () {
      return {
        title: '领取充值会员卡'
      }
    },
    // 验证卡号
    validate ({params, query}) {
      return !!params.code
    },
    components: {
      CPage,
      TopButtons
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
        validity: {},
        valid: undefined,
        model: {
          inputAddressValue: '',
          inputNameValue: '',
          inputPhoneValue: '',
          pcaValue: []
        },
        options: {
          scrollToInvalidField: true,
        },
        fields: [
          {
            component: PCA,
            modelKey: 'pcaValue',
            // label: '省份、城市、区县',
            rules: {
              required: true
            },
            props: {
              placeholder: '省份、城市、区县',
            },
            messages: {
              required: '请选择'
            }
          },
          {
            type: 'input',
            modelKey: 'inputAddressValue',
            // label: '省份、城市、区县',
            props: {
              placeholder: '详细地址,如街道、楼牌号'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'inputNameValue',
            // label: '收件人姓名',
            props: {
              placeholder: '收件人姓名'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'inputPhoneValue',
            // label: '手机号码',
            props: {
              placeholder: '手机号码'
            },
            rules: {
              type: 'tel',
              required: true
            }
          },
        ],
        total: '12,345',
        count: '2',
        tip1,
        tip2,
        limit: 2,
        blessingCode: ''
      }
    },
    computed: {
      isReceive () {
        return this.$store.state.prize.receiveCard.data.receive_time !== null
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
      isReceive (newVal) {
        if (newVal === true) {
          // 弹出预约成功
          // this.showDialog('jdfl')
          this.showDialog('success2')
        }
      }
    },
    mounted () {
      this.cardCode = this.$route.params.code
    },
    methods: {
      async submitHandler (e) {
        e.preventDefault()
        // this.$store.dispatch('postReceiveCard', this.model)
        // console.log(this.model)
        const form = {
          card_code: this.cardCode,
          address: this.model.pcaValue.join(' ') + this.model.inputAddressValue,
          recipient_name: this.model.inputNameValue,
          phone_number: this.model.inputPhoneValue
        }
        await this.$store.dispatch('postReceiveCard', form)
        // console.log(form)
        // console.log('submit')
        // return
      },
      validateHandler (result) {
        this.validity = result.validity
        this.valid = result.valid
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      checkBlessing () {
        // this.$axios.$get()
      },
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

<style lang="stylus" rel="stylesheet/stylus">
  .pageCardForm
    color: $color-dark
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: absolute
    left: 0
    width: 100%
    height: 100%
    /*justify-content: center*/
    overflow: hidden

    .card-form
      background: url("~assets/img/bg/card_form_bg.png") no-repeat
      background-size: 489px 361px
      width: 489px
      height: 450px
      display: flex
      flex-direction: column
      align-items: center

      .form-footer
        margin-top: 50px
        display: flex
        flex-direction: column
        align-items: center

      .btn-submit
        padding: 0
        width: 248px
        height: 60px

      .c-form
        background: transparent
        margin-top: 120px
        width: 450px
        height: 350px

      .btn-tijiaolingqu
        width: 248px
        height: 60px

      .c-input
        background: transparent

    /*background-size: 419px 235px*/


    .c-validator-content
      .c-btn
        background: transparent
        color: $color-dark-grey
        text-align: left
        margin: 0
        padding: 0

    .content
      top: 100px
      position: relative
      display: flex
      flex-direction: column
      height: 800px
      justify-content: space-between

      .cover
        width: 452px
        height: 304px

      .exchange-form
        width: 419px
        height: 235px
        background-image: url("~assets/img/bg/form_yydh.png")
        background-size: 419px 235px
        display: flex
        justify-content: flex-end

        &__content
          position: relative
          top: 110px
          display: flex
          flex-direction: column
          justify-content: space-between
          height: 80px
          width: 300px

        span
          font-weight: 500
          font-size: 22px
          position: relative

          &.date
            left: 30px

          &.shop
            left: 30px
</style>
