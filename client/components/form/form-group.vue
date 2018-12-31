<template>
  <div class="c-form-group">
    <p class="c-form-group-legend">{{ legend }}</p>
    <div class="c-form-group-content">
      <slot>
        <c-form-item
          v-for="(field, index) in fields"
          :key="index"
          :field="field"
        />
      </slot>
    </div>
  </div>
</template>

<script>
  import CFormItem from './form-item.vue'

  const COMPONENT_NAME = 'c-form-group'
  export default {
    name: COMPONENT_NAME,
    components: {
      CFormItem
    },
    props: {
      legend: {
        type: String,
        default: ''
      },
      fields: {
        type: Array,
        default() {
          /* istanbul ignore next */
          return []
        }
      }
    },
    beforeCreate() {
      this.form = this.$parent.form
    },
    beforeDestroy() {
      this.form = null
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/

  .c-form-group
    overflow: hidden
  .c-form-group-legend
    font-size: $fontsize-medium
    color: $form-group-legend-color
    background-color: $form-group-legend-bgc
</style>
