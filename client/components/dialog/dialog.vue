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
          @click="close"><i class="cubeic-close"/></span>
        <div :class="containerClass">
          <p
            v-if="icon"
            class="c-dialog-icon"><i :class="icon"/></p>
          <h2
            v-if="title || $slots.title"
            class="c-dialog-title">
            <slot name="title">
              <p class="c-dialog-title-def">{{ title }}</p>
            </slot>
          </h2>
          <div class="c-dialog-content">
            <slot name="content">
              <div class="c-dialog-content-def">
                <p
                  v-if="content"
                  v-html="content"/>
                <c-input
                  v-if="isPrompt"
                  v-bind="prompt"
                  v-model="promptValue"/>
              </div>
            </slot>
          </div>
          <div
            :class="{'border-right-1px': isConfirm || isPrompt}"
            class="c-dialog-btns">
            <slot name="btns">
              <a
                v-if="isConfirm || isPrompt"
                :href="_cancelBtn.href"
                :class="{'c-dialog-btn_highlight': _cancelBtn.active, 'c-dialog-btn_disabled': _cancelBtn.disabled}"
                class="c-dialog-btn border-top-1px"
                @click="cancel">{{ _cancelBtn.text }}</a>
              <a
                :href="_confirmBtn.href"
                :class="{'c-dialog-btn_highlight': _confirmBtn.active, 'c-dialog-btn_disabled': _confirmBtn.disabled}"
                class="c-dialog-btn border-top-1px"
                @click="confirm">{{ _confirmBtn.text }}</a>
            </slot>
          </div>
        </div>
      </div>
    </c-popup>
  </transition>
</template>

<script type="text/ecmascript-6">
  import CPopup from '../popup/popup.vue'
  import CInput from '../input/input.vue'
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'
  import localeMixin from '../../common/mixins/locale'

  const COMPONENT_NAME = 'c-dialog'
  const EVENT_CONFIRM = 'confirm'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CLOSE = 'close'

// eslint-disable-next-line no-script-url
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
    return Object.assign({}, defBtn, { text }, btn)
  }

  export default {
    name: COMPONENT_NAME,
    components: {
      CPopup,
      CInput
    },
    mixins: [visibilityMixin, popupMixin, localeMixin],
    props: {
      type: {
        type: String,
        default: 'alert'
      },
      prompt: {
        type: Object,
        default() {
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
        default() {
          return {
            ...defConfirmBtn
          }
        }
      },
      cancelBtn: {
        type: [Object, String],
        default() {
          return {
            ...defCancelBtn
          }
        }
      }
    },
    data() {
      return {
        defHref,
        promptValue: this.prompt.value
      }
    },
    computed: {
      _confirmBtn() {
        return parseBtn.call(this, this.confirmBtn, defConfirmBtn)
      },
      _cancelBtn() {
        return parseBtn.call(this, this.cancelBtn, defCancelBtn)
      },
      isConfirm() {
        return this.type === 'confirm'
      },
      isPrompt() {
        return this.type === 'prompt'
      },
      containerClass() {
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
      maskClick(e) {
        this.maskClosable && this.cancel(e)
      },
      confirm(e) {
        if (this._confirmBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CONFIRM, e, this.promptValue)
      },
      cancel(e) {
        if (this._cancelBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CANCEL, e)
      },
      close(e) {
        this.hide()
        this.$emit(EVENT_CLOSE, e)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/

  .c-dialog-main
    width: 418px
    padding: 0
    text-align: center
    overflow: hidden
    border-radius: 20px
    border: 8px solid #000
    // background-color: $dialog-bgc
    background: url('~assets/images/bg/page_bg_light.jpg') no-repeat
    background-size: 640px 1136px
  .c-dialog-confirm, .c-dialog-alert
    position: relative
    overflow: hidden

  .c-dialog-icon
    margin-top: 20px
    margin-bottom: 16px
    line-height: 1
    color: $dialog-icon-color
    font-size: $fontsize-large-xxxx
    i
      display: inline-block
      width: 30px
      height: 30px
      padding: 10px
      box-sizing: content-box
      border-radius: 50%
      background-color: $dialog-icon-bgc
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
      margin-top: 12px

  .c-dialog-title-def
    margin: 30px 16px 0
    overflow: hidden
    white-space: nowrap

  .c-dialog-content
    margin: 16px 0
    text-align: left
    color: $dialog-color
    font-size: $fontsize-medium
    line-height: 22px

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
    .c-dialog-main
      animation: dialog-zoom .4s

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

