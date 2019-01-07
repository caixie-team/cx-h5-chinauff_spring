<template>
  <div
    v-show="loading.show"
    id="progressbar">
    <span id="loading"/>
    <div id="load">资源加载中...</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    computed: {
      loading () {
        return this.$store.state.game.loading
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #progressbar
    height: 26px
    position: absolute
    left: 50%
    top: 50%
    width: 200px
    background: #fdd32a
    /*background: #ff4500*/
    border-radius: 10px
    margin: -20px 0 0 -100px
    padding: 2px
    z-index: 9999

  #loading
    transition: all 500ms ease
    height: 20px
    width: calc(100% - 10px)
    border-radius: 8px
    background: #d92530
    position: absolute
    margin: 3px
    display: inline-block
    animation: load 15s ease infinite

  #load
    font-family: Arial
    font-weight: bold
    text-align: center
    color: #fff
    margin-top: -50px

  @keyframes load
    0%
      width: 2%;
    10%
      width: 10%;
</style>
