<!-- 扫一扫 -->
<template>
  <div class="popup scan">
    <div class="icon-shitou"/>
    <div
      class="scanimg">
      <preloader
        class="index"/>
      <div class="mask"/>
      <img :src="imgsrc">
    </div>
    <!--<img-->
    <!--:src="btn1"-->
    <!--@click="close">-->
  </div>
</template>
<script>
  import text from '~/assets/img/text/text_popup_limit.png'
  import btn1 from '~/assets/img/btn/btn_zdlh.png'
  import btn2 from '~/assets/img/btn/btn_yqhyl.png'
  import Preloader from '~/components/preloader'

  const EVENT_CLOSE = 'close'
  export default {
    components: {
      Preloader
    },
    props: {
      imgsrc: {
        type: String,
        default: ''
      }

    },
    data () {
      return {
        text,
        btn1,
        btn2
      }
    },
    methods: {
      close (e) {
        this.$emit(EVENT_CLOSE, e)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .popup.scan
    width: 418px
    height: 474px
    overflow: hidden
    display: flex
    flex-direction: column
    justify-content: space-between
    text-align: center
    align-items: center

    .icon-shitou
      position: relative
      z-index: 100
      background: url('~assets/img/icon/icon_shitou.png') no-repeat left top
      background-size: 198px 169px
      width: 198px
      height: 169px

    .scanimg
      z-index: 1
      position: absolute
      bottom: 0
      background: url('~assets/img/bg/popup_small.png') no-repeat left top
      background-size: 418px 400px
      /*top: 150px*/
      width: 418px
      height: 400px
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center

      .index
        z-index: 10

      .mask
        width: 100%
        height: 100%
        background: $color-mask-bg
        position: absolute
        border-radius: 18px
        z-index: 1

      > img
        border-radius: 18px
        width: 93%
        height: 93%
        object-fit: cover

    .text
      position: absolute
      top: 200px
      width: 292px
      height: 62px

    .buttons
      position: absolute
      bottom: 100px
      width: 292px
      display: flex
      justify-content: space-between

      img
        width: 136px
        height: 41px
</style>
