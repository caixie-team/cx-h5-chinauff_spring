<template>
  <transition name="c-dialog-fade">
    <c-popup
      v-show="isVisible"
      :z-index="zIndex"
      :mask="true"
      :center="true"
      type="dialog"
      @mask-click="maskClick"
    >
      <div class="c-dialog-main">
        <span
          v-show="showClose"
          class="c-dialog-close"
          @click="close">
          <img src="~assets/img/btn/btn_close_r.png">
        </span>
        <intro v-if="type === 'intro'"/>
        <limit
          v-if="type === 'limit'"
          @close="close"/>
        <share
          v-if="type === 'share'"/>
        <prize
          v-if="type === 'prize'"
          :coupon_type="coupon_type"
          :coupon_code="coupon_code"
          :blessing_type="blessing_type"/>
        <success
          v-if="type === 'success'"
          @close="close"/>
        <success1
          v-if="type === 'success1'"
          @close="close"/>
        <!-- 预约领取卡成功 -->
        <success2
          v-if="type === 'success2'"
          @close="close"/>
        <!-- 预约满福礼品成功 -->
        <success3
          v-if="type === 'success3'"
          @close="close"/>
        <jdfl
          v-if="type === 'jdfl'"/>
        <dhff
          v-if="type === 'dhff'"/>
        <popup-scan
          v-if="type === 'scan'"
          :imgsrc="imgsrc"
          @close="close"/>
      </div>
    </c-popup>
  </transition>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import CPopup from '../popup/popup.vue'
  import CInput from '../input/input.vue'
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'
  import localeMixin from '../../common/mixins/locale'
  import Intro from './popup-intro'
  import Limit from './popup-limit'
  import Share from './popup-share'
  import Prize from './popup-prize'
  import Success from './popup-success'
  import Success1 from './popup-success1'
  import Success2 from './popup-success2'
  import Success3 from './popup-success3'
  import Jdfl from './popup-jdfl'
  import Dhff from './popup-dhff'
  import EventBus from '~/utils/event-bus.js'
  import PopupScan from "./popup-scan";

  const COMPONENT_NAME = 'c-dialog'
  const EVENT_CONFIRM = 'confirm'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CLOSE = 'close'

  const defHref = 'javascript:;'
  const defConfirmBtn = {
    textType: 'ok',
    active: true,
    disabled: false,
    href: defHref
  }
  const defCancelBtn = {
    textType: 'cancel',
    active: false,
    disabled: false,
    href: defHref
  }
  const parseBtn = function (btn, defBtn) {
    if (typeof btn === 'string') {
      btn = {
        text: btn
      }
    }
    const text = defBtn && this.$t(defBtn.textType)
    return Object.assign({}, defBtn, {text}, btn)
  }

  export default {
    name: COMPONENT_NAME,
    components: {
      PopupScan,
      CPopup,
      CInput,
      Intro,
      Limit,
      Share,
      Prize,
      Success,
      Success1,
      Success2,
      Success3,
      Jdfl,
      Dhff
    },
    mixins: [visibilityMixin, popupMixin, localeMixin],
    props: {
      coupon_type: {
        type: Number,
        default: 0
      },
      coupon_code: {
        type: String,
        default: ''
      },
      blessing_type: {
        type: Number,
        default: 0
      },
      imgsrc: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'alert'
      },
      prompt: {
        type: Object,
        default () {
          return {
            value: '',
            placeholder: ''
          }
        }
      },
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: false
      },
      confirmBtn: {
        type: [Object, String],
        default () {
          return {
            ...defConfirmBtn
          }
        }
      },
      cancelBtn: {
        type: [Object, String],
        default () {
          return {
            ...defCancelBtn
          }
        }
      }
    },
    data () {
      return {
        defHref,
        promptValue: this.prompt.value
      }
    },
    computed: {
      _confirmBtn () {
        return parseBtn.call(this, this.confirmBtn, defConfirmBtn)
      },
      _cancelBtn () {
        return parseBtn.call(this, this.cancelBtn, defCancelBtn)
      },
      isConfirm () {
        return this.type === 'confirm'
      },
      isPrompt () {
        return this.type === 'prompt'
      },
      containerClass () {
        return `c-dialog-${this.type}`
      }
    },
    watch: {
      'prompt.value': {
        handler: function (newVal) {
          this.promptValue = newVal
        }
      }
    },
    methods: {
      maskClick (e) {
        this.maskClosable && this.cancel(e)
      },
      confirm (e) {
        if (this._confirmBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CONFIRM, e, this.promptValue)
      },
      cancel (e) {
        if (this._cancelBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CANCEL, e)
      },
      close (e) {
        EventBus.$emit('share', false);
        this.hide()
        this.$emit(EVENT_CLOSE, e)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/
  .c-popup-content
    display: flex
    flex-direction: column
    text-align: center
    overflow: hidden
    align-items: center
    justify-content: center

  .c-dialog-main
    width: 460px
    padding: 0
    display: flex
    flex-direction: column
    text-align: center
    overflow: hidden
    align-items: center
    justify-content: center

  // background-color: $dialog-bgc
  .c-dialog-confirm, .c-dialog-alert
    position: relative
    overflow: hidden
    /*background: url('~assets/images/bg/page_bg_light.jpg') no-repeat*/
    /*background-size: 640px 1136px*/
    border: 8px solid #000
    border-radius: 20px
    padding: 5px
    width: 400px
    height: 730px

  .c-dialog-icon
    display: flex
    align-items: center
    justify-content: center
    z-index: 100
    position: absolute
    width: 229px
    height: 194px
    color: $dialog-close-color
    top: 0px

    img
      width: 229px
      height: 194px

    +
    .c-dialog-title
      .c-dialog-title-def
        margin-top: 0

    +
    .c-dialog-content
      margin-top: -4px

  .c-dialog-title
    color: $dialog-title-color
    font-size: $fontsize-large
    line-height: 1

    +
    .c-dialog-content
      margin-top: 24px

  .c-dialog-title-def
    margin: 30px 16px 0
    overflow: hidden
    white-space: nowrap

    img
      padding-top: 100px
      width: 332px
      height: 108px

  .c-dialog-content
    margin: 16px 0
    text-align: left
    color: $dialog-color
    font-size: $fontsize-large
    line-height: 24px
    display: flex
    flex-direction: column

  .c-dialog-content-def
    padding: 0 16px

    > p
      display: table
      margin: auto

      + .c-input
        margin-top: 12px

  .c-dialog-confirm, .c-dialog-prompt
    .c-dialog-btns
      .c-dialog-btn
        width: 50%
        float: left

      &.border-right-1px
        &::after
          right: 50%
          border-color: $dialog-btns-split-color

  .c-dialog-close
    display: flex
    align-items: center
    justify-content: center
    z-index: 1
    position: absolute
    top: 0
    right: 0
    width: 32px
    height: 32px
    color: $dialog-close-color
    font-size: $fontsize-large-x

    img
      width: 27px
      height: 26px

  .c-dialog-btns
    overflow: hidden
    width: 100%
    font-size: 0

  .c-dialog-btn
    display: inline-block
    width: 100%
    padding: 17px 10px
    margin: 0
    font-size: $fontsize-large
    line-height: 1
    text-align: center
    text-decoration: none
    color: $dialog-btn-color
    background-color: $dialog-btn-bgc
    background-clip: padding-box
    box-sizing: border-box

    &:active
      background-color: $dialog-btn-active-bgc

  .c-dialog-btn_highlight
    color: $dialog-btn-highlight-color

    &:active
      background-color: $dialog-btn-highlight-active-bgc

  .c-dialog-btn_disabled
    color: $dialog-btn-disabled-color

    &:active
      background-color: $dialog-btn-disabled-active-bgc

  .c-dialog-fade-enter-active
    animation: dialog-fadein .4s

  //    .c-dialog-main
  /*animation: dialog-zoom .4s*/

  @keyframes dialog-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes dialog-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>

