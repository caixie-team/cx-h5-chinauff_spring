<template>
  <div class="test openid">
    {{ defaultParams }}
  </div>
</template>
<script>
  // import JsonPertty from 'vue-json-pretty'
  // import JsonView from 'vue-json-viewer'

  export default {
    validate({ params, query }) {
      return !!query.openId
    },
    fetch ({store, params, error}) {
      return store.dispatch('')
    },
    computed: {
      defaultParams() {
        return {
          openId: this.$route.query.openId
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .test
    display: flex
    flex-direction: column
    padding: 24px;
</style>
