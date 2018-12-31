<template>
  <div
    ref="group"
    :class="groupClass"
    :data-horz="horizontal"
    class="c-checkbox-group">
    <slot>
      <c-checkbox
        v-for="(option, index) in options"
        :key="index"
        :option="option"
        :shape="shape"
        :position="position"
        :hollow-style="hollowStyle"/>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import CubeCheckbox from '../checkbox/checkbox.vue'

  const COMPONENT_NAME = 'c-checkbox-group'

  const EVENT_INPUT = 'input'
  const EVENT_CHECKED = 'checked'
  const EVENT_CANCLE_CHECKED = 'cancel-checked'

  export default {
    name: COMPONENT_NAME,
    components: {
      CubeCheckbox
    },
    props: {
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      horizontal: {
        type: Boolean,
        default: false
      },
      shape: {
        type: String,
        default: 'circle'
      },
      position: {
        type: String,
        default: 'left'
      },
      hollowStyle: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array,
        default () {
          return []
        }
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: Infinity
      }
    },
    data () {
      return {
        privateValue: [],
        // _checkboxGroup: true
      }
    },
    computed: {
      groupClass () {
        if (!this.horizontal) {
          return 'border-top-1px border-bottom-1px'
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (newValue, oldValue) {
          this.privateValue = this.value.concat()
        }
      }
    },
    mounted () {
      this.$on(EVENT_CHECKED, (value) => {
        if (this.privateValue.length < this.max) {
          this.privateValue.push(value)
        }
        this.$emit(EVENT_INPUT, this.privateValue)
      })
      this.$on(EVENT_CANCLE_CHECKED, (value) => {
        if (this.privateValue.length > this.min) {
          const index = this.privateValue.indexOf(value)
          this.privateValue.splice(index, 1)
        }
        this.$emit(EVENT_INPUT, this.privateValue)
      })
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/

  .c-checkbox-group
    z-index: 1
    overflow: hidden
    background-color: $checkbox-group-bgc

    .c-checkbox
      &:last-child
        .c-checkbox-wrap
          border-none()

  .c-checkbox-group[data-horz="true"]
    display: flex
    padding-left: 0
    border-1px($checkbox-group-horizontal-bdc, 2px)
    border-radius: 2px

    .c-checkbox
      flex-fix()
      text-align: center
      padding-left: 10px
      padding-right: 10px

      &:after
        border-color: $checkbox-group-horizontal-bdc

      &:last-child
        border-none()

      &[data-pos="right"]
        .c-checkbox-ui
          position: relative
          margin-left: .42em
          order: 1

        .c-checkbox-label
          margin-right: 0

    .c-checkbox-wrap
      justify-content: center
</style>
