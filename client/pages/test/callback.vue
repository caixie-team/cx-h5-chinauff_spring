<template>
  <div class="test openid">
    <json-viewer
      :value="defaultParams"
      boxed/>
  </div>
</template>
<script>
  // import JsonPertty from 'vue-json-pretty'
  // import JsonView from 'vue-json-viewer'

  export default {
    validate({ params, query }) {
      console.log(query)
      return !!query.openId
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
