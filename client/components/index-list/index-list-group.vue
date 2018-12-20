<template>
  <li class="c-index-list-group">
    <h2
      class="c-index-list-anchor"
      v-html="group.name"/>
    <ul>
      <slot>
        <c-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem"/>
      </slot>
    </ul>
  </li>
</template>

<script type="text/ecmascript-6">
  import CIndexListItem from './index-list-item.vue'

  const COMPONENT_NAME = 'c-index-list-group'
  const EVENT_SELECT = 'select'

  export default {
    name: COMPONENT_NAME,
    components: {
      CIndexListItem
    },
    props: {
      group: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      selectItem(item) {
        this.$emit(EVENT_SELECT, item)
      }
    },
  }
</script>
