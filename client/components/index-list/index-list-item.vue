<template>
  <li
    :class="itemClass"
    class="c-index-list-item"
    @touchstart="addActiveCls"
    @touchend="removeActiveCls"
    @click="selectItem()">
    <slot>
      <div class="c-index-list-item-def border-bottom-1px">
        {{ item.name }}
      </div>
    </slot>
  </li>
</template>

<script type="text/ecmascript-6">
  import {
    addClass,
    removeClass
  } from '../../common/helpers/dom'

  const COMPONENT_NAME = 'c-index-list-item'
  const ACTIVE_CLS = 'c-index-list-item_active'
  const EVENT_SELECT = 'select'

  export default {
    name: COMPONENT_NAME,
    props: {
      item: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      itemClass () {
        return this.item.active ? ACTIVE_CLS : ''
      }
    },
    methods: {
      addActiveCls (e) {
        addClass(e.currentTarget, ACTIVE_CLS)
      },
      removeActiveCls (e) {
        removeClass(e.currentTarget, ACTIVE_CLS)
      },
      selectItem () {
        this.$emit(EVENT_SELECT, this.item)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .c-index-list-item-def
    position: relative
    height: 50px
    line-height: 50px
    padding: 0 16px
    font-size: $fontsize-medium
    color: $index-list-item-color

    &:last-child
      border-none()

  .c-index-list-item_active
    background: $index-list-item-active-bgc
</style>
