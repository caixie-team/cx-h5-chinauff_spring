<!--领取成功、今日已领完 -->
<template>
  <div class="popup success">
    <img
      :src="text"
      class="text">
    <div class="buttons">
      <img
        :src="btn1"
        @click="close">
    </div>
  </div>
</template>
<script>
  // import text_limit from '~/assets/img/text/text_popup_limit.png'
  // 领取成功
  import text from '~/assets/img/text/text_lqcg.png'
  import btn1 from '~/assets/img/btn/btn_zdlh.png'
  import btn2 from '~/assets/img/btn/btn_yqhyl.png'

  const EVENT_CLOSE = 'close'
  export default {
    props: {
      type: {
        type: String, // success/limit
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
    computed: {
    },
    methods: {
      close (e) {
        this.$emit(EVENT_CLOSE, e)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .popup.success
    width: 418px
    height: 474px
    overflow: hidden
    background: url('~assets/img/bg/popup_bg_small.png') no-repeat
    background-size: 418px 474px
    display: flex
    flex-direction: column
    text-align: center
    align-items: center

    .text
      position: absolute
      top: 200px
      width: 342px
      height: 66px

    .buttons
      position: absolute
      bottom: 100px
      width: 292px
      display: flex
      justify-content: center

      img
        width: 136px
        height: 41px
</style>
