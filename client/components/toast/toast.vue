<template>
  <transition name="c-toast-fade">
    <c-popup
      v-show="isVisible"
      :z-index="zIndex"
      :mask="mask"
      type="toast"
      @mask-click="maskClick"
    >
      <i
        v-if="!isLoading && iconClass.length"
        :class="iconClass"
        class="c-toast-icon"/>
      <c-loading v-if="isLoading"/>
      <div
        v-show="txt"
        class="c-toast-tip"
        v-html="txt"/>
    </c-popup>
  </transition>
</template>
<script type="text/ecmascript-6">
  import CLoading from '../loading/loading.vue'
  import CPopup from '../popup/popup.vue'
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'

  const COMPONENT_NAME = 'c-toast'

  const EVENT_TIMEOUT = 'timeout'

  export default {
    name: COMPONENT_NAME,
    components: {
      CPopup,
      CLoading
    },
    mixins: [visibilityMixin, popupMixin],
    props: {
      type: {
        type: String,
        default: 'loading'
      },
      icon: {
        type: String,
        default: ''
      },
      mask: {
        type: Boolean,
        default: false
      },
      txt: {
        type: String,
        default: ''
      },
      time: {
        type: Number,
        default: 3000
      },
      // By default, Toast has the bigest z-index among popoup-based components.
      zIndex: {
        type: Number,
        default: 900
      }
    },
    computed: {
      iconClass () {
        const iconClass = []
        if (this.icon) {
          iconClass.push(this.icon)
        }
        const classMap = {
          correct: 'cubeic-right',
          error: 'cubeic-wrong',
          warn: 'cubeic-warn'
        }
        const icon = classMap[this.type]
        if (icon) {
          iconClass.push(icon)
        }
        return iconClass
      },
      isLoading () {
        return this.type === 'loading'
      }
    },
    methods: {
      maskClick () {
        this.maskClosable && this.hide()
      },
      show () {
        this.isVisible = true
        this.clearTimer()
        this.$nextTick(() => {
          if (this.time !== 0) {
            this.timer = setTimeout(() => {
              this.hide()
              this.$emit(EVENT_TIMEOUT)
            }, this.time)
          }
        })
      },
      hide () {
        this.isVisible = false
        this.clearTimer()
      },
      clearTimer () {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  .c-toast
    &.c-popup
      z-index: 900

    .c-popup-content
      display: flex
      align-items: center
      padding: 13px 16px
      color: $toast-color
      background-color: $toast-bgc
      border-radius: 2px

  .c-toast-icon
    width: 24px
    height: 24px
    font-size: $fontsize-large-xxx

  .c-toast-tip
    line-height: 20px
    font-size: $fontsize-medium
    max-width: 12em
    max-height: 40px
    overflow: hidden

  .c-toast-icon, .c-loading
    ~ .c-toast-tip
      margin-left: 8px

  .c-toast-fade-enter-active
    animation: toast-in .2s

  .c-toast-fade-leave-active
    animation: toast-out .2s

  @keyframes toast-in
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes toast-out
    0%
      opacity: 1
    100%
      opacity: 0
</style>
