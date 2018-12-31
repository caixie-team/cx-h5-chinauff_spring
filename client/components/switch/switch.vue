<template>
  <div class="c-switch">
    <input
      v-model="checkboxValue"
      :disabled="disabled"
      class="c-switch-input"
      type="checkbox">
    <i class="c-switch-ui"/>
    <span class="c-switch-label"><slot/></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'c-switch'

  const EVENT_INPUT = 'input'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        checkboxValue: this.value
      }
    },
    watch: {
      value (newVal) {
        this.checkboxValue = newVal
      },
      checkboxValue (newVal) {
        this.$emit(EVENT_INPUT, newVal)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/

  $switch-width = 48px
  $switch-height = 28px

  .c-switch
    display: flex
    position: relative
    align-items: center

    .c-switch-input
      position: absolute
      z-index: 1
      width: $switch-width
      height: $switch-height
      opacity: 0

      &:checked + .c-switch-ui
        border-color: $switch-on-bgc
        background-color: $switch-on-bgc

        &::before
          transform: scale(0)

        &::after
          transform: translateX($switch-width - $switch-height)

      &:disabled + .c-switch-ui
        opacity: 0.3

    .c-switch-ui
      position: relative
      display: block
      width: $switch-width
      height: $switch-height
      box-sizing: content-box
      border: 1px solid $switch-off-border-color
      border-radius: $switch-height
      background-color: $switch-off-border-color

      &::before, &::after
        content: ""
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        border-radius: $switch-height
        background-color: $switch-off-bgc
        transition: transform .4s cubic-bezier(.25, .1, .25, 1.28)

      &::after
        width: $switch-height
        background-color: $color-white
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4)

    .c-switch-label
      display: block
      margin-left: 10px

      &:empty
        margin-left: 0
</style>
