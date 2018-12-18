<template>
  <div
    v-cloak
    id="app">
    <nuxt/>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    ...mapState('option', [
      'mobileLayout'
    ])
  }
</script>

