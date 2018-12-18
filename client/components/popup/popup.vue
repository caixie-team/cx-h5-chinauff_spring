<template>
  <div
    v-show="isVisible"
    :style="{'z-index': zIndex}"
    :class="rootClass"
    class="c-popup">
    <div
      class="c-popup-mask"
      @touchmove.prevent
      @click="maskClick">
      <slot name="mask"/>
    </div>
    <div
      :class="containerClass"
      class="c-popup-container"
      @touchmove.prevent>
      <div
        v-if="$slots.default"
        class="c-popup-content">
        <slot/>
      </div>
      <div
        v-else
        class="c-popup-content"
        v-html="content"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'

  const COMPONENT_NAME = 'c-popup'
  const EVENT_MASK_CLICK = 'mask-click'

  export default {
    name: COMPONENT_NAME,
    mixins: [visibilityMixin, popupMixin],
    props: {
      type: {
        type: String,
        default: ''
      },
      mask: {
        type: Boolean,
        default: true
      },
      content: {
        type: String,
        default: ''
      },
      center: {
        type: Boolean,
        default: true
      },
      position: {
        type: String,
        default: ''
      }
    },
    computed: {
      rootClass () {
        const cls = {
          'c-popup_mask': this.mask
        }
        if (this.type) {
          cls[`c-${this.type}`] = true
        }
        return cls
      },
      containerClass () {
        const center = this.center
        const position = this.position
        if (position) {
          return {
            [`c-popup-${position}`]: true
          }
        }
        if (center) {
          return {
            'c-popup-center': true
          }
        }
      }
    },
    methods: {
      maskClick (e) {
        this.$emit(EVENT_MASK_CLICK, e)
        if (this.maskClosable) {
          this.hide()
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .c-popup
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 100
    pointer-events: none

  .c-popup_mask
    pointer-events: auto
    .c-popup-mask
      display: block

  .c-popup-mask, .c-popup-container
    position: absolute
    width: 100%
    height: 100%

  .c-popup-mask
    display: none
    overflow: hidden
    background-color: $popup-mask-bgc
    opacity: $popup-mask-opacity
    pointer-events: auto
    // fix some android webview opacity render bug
    &::before
      content: "."
      display: block
      width: 1px
      height: 1px
      background-color: rgba(0, 0, 0, .1)
      margin-left: -10px

  .c-popup-container
    transform: translate(100%, 100%)

  .c-popup-content
    position: absolute
    top: 0
    left: 0
    width: 100%
    box-sizing: border-box
    transform: translate(-100%, -100%)
    pointer-events: auto

  .c-popup-center,
  .c-popup-right,
  .c-popup-left
    .c-popup-content
      top: -50%
      left: -50%
      width: auto
      max-width: 100%
      transform: translate(0, 0)

  .c-popup-right,
  .c-popup-left
    .c-popup-content
      height: 100%
      top: -100%

  .c-popup-center
    .c-popup-content
      transform: translate(-50%, -50%)

  .c-popup-top
    .c-popup-content
      top: -100%
      left: -100%
      transform: translate(0, 0)

  .c-popup-right
    .c-popup-content
      top: -100%
      right: 100%

  .c-popup-left
    .c-popup-content
      left: -100%
</style>
