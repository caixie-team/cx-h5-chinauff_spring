<template>
  <div class="test jssdk">
    <json-viewer
      :value="jssdkConfig"
      :expand-depth="5"
      copyable
      boxed/>
    <br>
    <json-viewer
      :value="logInfo"
      boxed/>
  </div>
</template>
<script>
  // import JsonPertty from 'vue-json-pretty'
  // import JsonView from 'vue-json-viewer'

  export default {
    components: {
      // JsonView
    },
    computed: {
      jssdkConfig () {
        return this.$store.state.option.jssdkConfig
      },
      logInfo () {
        return this.$store.state.option.logInfo
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
