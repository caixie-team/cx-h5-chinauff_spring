<template>
  <button
    :type="type"
    :class="btnClass"
    class="c-btn"
    @click="handleClick">
    <i
      v-if="icon"
      :class="icon"/>
    <slot/>
  </button>
</template>

<script>
  const COMPONENT_NAME = 'c-button'
  export default {
    name: COMPONENT_NAME,
    props: {
      icon: {
        type: String,
        default: ''
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      inline: {
        type: Boolean,
        default: false
      },
      primary: {
        type: Boolean,
        default: false
      },
      outline: {
        type: Boolean,
        default: false
      },
      light: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'button'
      }
    },
    computed: {
      btnClass() {
        return {
          'c-btn_active': this.active,
          'c-btn_disabled': this.disabled,
          'c-btn-inline': this.inline,
          'c-btn-primary': this.primary,
          'c-btn-outline': this.outline,
          'c-btn-outline-primary': this.outline && this.primary,
          'c-btn-light': this.light
        }
      }
    },
    methods: {
      handleClick(event) {
        if (this.disabled) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
        this.$emit('click', event)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/
  btn-active($bg, $border = null)
    &.c-btn_active, &:active
      background: $bg
      if $border != null
        border-1px($border)

  .c-btn
    display: block
    margin: 0
    padding: 17px 16px
    width: 100%
    text-align: center
    white-space: nowrap
    cursor: pointer
    font-size: $fontsize-large-xx
    line-height: 1
    color: $btn-color
    // background: $btn-bgc
    background: transparent
    outline: none
    border: none
    border-radius: 2px
    box-sizing: border-box
    -webkit-tap-highlight-color: transparent
    btn-active($btn-active-bgc)
    > i
      display: inline-block
      margin-right: 4px
      font-size: 100%
      transform: scale(1.13)
      transform-origin: right center

  .c-btn-inline
    width: auto
    display: inline-block
    vertical-align: middle
    padding: 9px 10px
    font-size: $fontsize-small
    > i
      margin-right: 2px
      transform: scale(1.14)

  .c-btn-primary
    color: $btn-primary-color
    background: $btn-primary-bgc
    btn-active($btn-primary-active-bgc)

  .c-btn-light
    color: $btn-light-color
    background: $btn-light-bgc
    box-shadow: $box-shadow-content
    btn-active($btn-light-active-bgc)

  .c-btn-outline
    color: $btn-outline-color
    background: $btn-outline-bgc
    border-1px($btn-outline-bdc)
    btn-active($btn-outline-active-bgc, $btn-outline-active-bdc)

  .c-btn-outline-primary
    color: $btn-outline-primary-color
    background: $btn-outline-primary-bgc
    border-1px($btn-outline-primary-bdc)
    btn-active($btn-outline-primary-active-bgc, $btn-outline-primary-active-bdc)

  .c-btn_disabled
    color: $btn-disabled-color
    background: $btn-disabled-bgc
    border-1px($btn-disabled-bdc)
    btn-active($btn-disabled-bgc, $btn-disabled-bdc)
</style>
