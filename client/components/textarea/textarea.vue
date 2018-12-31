<template>
  <div
    :class="{'c-textarea_expanded': expanded, 'c-textarea_active': isFocus}"
    class="c-textarea-wrapper">
    <textarea
      v-model="textareaValue"
      v-bind="$props"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      class="c-textarea"
      @focus="handleFocus"
      @blur="handleBlur"/>
    <span
      v-if="indicator"
      v-show="expanded"
      class="c-textarea-indicator">{{ indicatorConf.remain ? remain : count }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'c-textarea'
  const EVENT_INPUT = 'input'

  const DEFAULT_INDICATOR = {
    negative: true,
    remain: true
  }

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        type: String,
        default: ''
      },
      cols: {type: Number, default: 0},
      rows: {type: Number, default: 0},
      readonly: {type: Boolean, default: false},
      wrap: {type: String, default: ''},
      required: {type: Boolean, default: false},
      placeholder: {
        type: String,
        default: 'please type here...'
      },
      dirname: {type: String, default: ''},
      form: {type: String, default: ''},
      name: {type: String, default: ''},
      autofocus: {type: Boolean, default: false},
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: 60
      },
      indicator: {
        type: [Boolean, Object],
        default: true
      },
      autoExpand: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        textareaValue: this.value,
        expanded: this.autoExpand ? !!this.value : false,
        isFocus: false
      }
    },
    computed: {
      indicatorConf () {
        let indicator = this.indicator
        if (typeof indicator === 'boolean') {
          indicator = {}
        }
        return Object.assign({}, DEFAULT_INDICATOR, indicator)
      },
      count () {
        return this.textareaValue.length
      },
      remain () {
        let diff = this.maxlength - this.count
        if (!this.indicatorConf.negative && diff < 0) {
          diff = 0
        }
        return diff
      }
    },
    watch: {
      value (newValue) {
        this.textareaValue = newValue
      },
      textareaValue (newValue) {
        this.$emit(EVENT_INPUT, newValue)
        if (!this.isFocus && this.expanded) {
          this.expanded = false
        }
      }
    },
    methods: {
      handleFocus (e) {
        this.$emit('focus', e)
        this.expanded = true
        this.isFocus = true
      },
      handleBlur (e) {
        this.$emit('blur', e)
        if (this.textareaValue.length === 0) {
          this.expanded = false
        }
        this.isFocus = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/

  .c-textarea-wrapper
    position: relative
    transition: height 200ms
    height: 40px
    font-size: $fontsize-medium
    line-height: 1.429
    textarea:

    :-webkit-input-placeholder
      color: $textarea-placeholder-color
      text-overflow: ellipsis
    border-1px($textarea-border-color)

  .c-textarea_expanded
    height: 80px

  .c-textarea_active
    border-1px($textarea-focus-border-color)

  .c-textarea-indicator
    position: absolute
    bottom: 7px
    right: 10px
    color: $textarea-indicator-color

  .c-textarea
    width: 100%
    height: 100%
    text-align: left
    padding: 10px
    box-sizing: border-box
    font-size: 100%
    line-height: inherit
    color: $textarea-color
    background-color: $textarea-bgc
    border-radius: 2px
    resize: none
    border: none
    outline: none
</style>
