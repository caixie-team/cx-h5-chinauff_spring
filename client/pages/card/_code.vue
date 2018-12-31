<!-- 5.1、二维码兑换 -->
<template>
  <c-page>
    <div
      slot="content"
      class="pageCardForm">
      <!--<top-buttons/>-->
      <div class="content">
        <img
          src="~assets/img/icon/icon_card_cover.png"
          class="cover">
        <c-form
          :model="model"
          @validate="validateHandler"
          @submit="submitHandler">
          <c-form-group>
            <c-form-item :field="fields[0]" />
            <c-form-item :field="fields[1]" />
          </c-form-group>
          <c-form-group>
            <c-button type="submit"> 提交 </c-button>
          </c-form-group>
        </c-form>
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '~/components/c-page.vue'
  import {isBrowser} from '~/environment'
  import TopButtons from '~/components/top-buttons'
  import { provinceList, cityList, areaList } from '~/example/data/area'

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
        default() {
          return []
        }
      }
    },
    data() {
      return {
        selected: []
      }
    },
    render(createElement) {
      return createElement('c-button', {
        on: {
          click: this.showPicker
        }
      }, this.selected.length ? this.selected.join(' ') : 'placeholder')
    },
    mounted() {
      this.picker = this.$createCascadePicker({
        title: 'PCA Select',
        data: cityData,
        selectedIndex: this.value,
        onSelect: this.selectHandler
      })
    },
    methods: {
      showPicker() {
        this.picker.show()
      },
      selectHandler(selectedVal, selectedIndex, selectedTxt) {
        this.selected = selectedTxt
        this.$emit('input', selectedVal)
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

    fetch ({store, params, error}) {
      // console.log(params)
      // return store.dispatch('')
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
          inputValue: '',
          pcaValue: []
        },
        fields: [
          {
            type: 'input',
            modelKey: 'inputValue',
            label: 'Input',
            props: {
              placeholder: '请输入'
            },
            rules: {
              required: true
            }
          },
          {
            component: PCA,
            modelKey: 'pcaValue',
            label: 'PCASelect',
            rules: {
              required: true
            },
            messages: {
              required: '请选择'
            }
          }
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
      this.blessingCode = this.$route.params.code
      // clearInterval(this.timer);
      // this.setTimer();
    },
    destroyed () {
      console.log('destoryed....')
      // clearInterval(this.timer)
    },
    methods: {
      submitHandler (e) {
        console.log('submit')
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      checkBlessing () {
        // this.$axios.$get()
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
  .page51
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

      .qrcode
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        width: 380px
        height: 380px
        background: #E5D9A1

        img
          width: 340px
          height: 340px

      .text-qjrwmzsgsyy
        margin: 20px 0 30px 0
        width: 299px
        height: 25px

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
