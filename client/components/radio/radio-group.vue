<template>
  <div
    :class="_groupClass"
    :data-horz="horizontal"
    class="c-radio-group">
    <slot>
      <c-radio
        v-for="(option, index) in options"
        :key="index"
        :option="option"
        :position="position"
        :hollow-style="hollowStyle"
        v-model="radioValue"/>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import CubeRadio from './radio.vue'

  const COMPONENT_NAME = 'c-radio-group'

  const EVENT_INPUT = 'input'

  export default {
    name: COMPONENT_NAME,
    components: {
      CubeRadio
    },
    props: {
      value: {
        type: [String, Number],
        default: 0
      },
      options: {
        type: Array,
        default () {
          return []
        }
      },
      position: {
        type: String,
        default: 'left'
      },
      horizontal: {
        type: Boolean,
        default: false
      },
      hollowStyle: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        radioValue: this.value
      }
    },
    computed: {
      _groupClass () {
        if (!this.horizontal) {
          return 'border-top-1px border-bottom-1px'
        }
      }
    },
    watch: {
      value (newV) {
        this.radioValue = newV
      },
      radioValue (newV) {
        this.$emit(EVENT_INPUT, newV)
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/

  .c-radio-group
    z-index: 1
    overflow: hidden
    background-color: $radio-group-bgc

    .c-radio
      &:last-child
        .c-radio-wrap
          border-none()

  .c-radio-group[data-horz="true"]
    display: flex
    padding-left: 0
    border-1px($radio-group-horizontal-bdc, 2px)
    border-radius: 2px

    .c-radio
      flex-fix()
      text-align: center
      padding-left: 10px
      padding-right: 10px

      &:after
        border-color: $radio-group-horizontal-bdc

      &:last-child
        border-none()

      &:last-child
        border-none()

      &[data-pos="right"]
        .c-radio-ui
          position: relative
          margin-left: .42em
          order: 1

        .c-radio-label
          margin-right: 0

    .c-radio-wrap
      justify-content: center
</style>
