<!-- 这个是卡，预约卡成功 -->
<template>
  <div class="popup success">
    <img
      :src="text"
      class="text">
    <div class="buttons">
      <img
        :src="btn1"
        @click="toPage261">
    </div>
  </div>
</template>
<script>
  // import text_limit from '~/assets/img/text/text_popup_limit.png'
  // 领取成功
  import text from '~/assets/img/text/text_lqcg.png'
  import btn1 from '~/assets/img/btn/btn_zdlm.png'

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
        btn1
      }
    },
    computed: {
    },
    methods: {
      toPage261 (e) {
        this.$router.push('/page261')
        this.$emit(EVENT_CLOSE, e)
      }
      // close (e) {
      //   this.$emit(EVENT_CLOSE, e)
      // }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .popup.success
    width: 418px
    height: 474px
    overflow: hidden
    background: url('~assets/img/bg/popup_bg_smallr.png') no-repeat
    background-size: 418px 474px
    display: flex
    flex-direction: column
    text-align: center
    align-items: center
    justify-content: center

    .text
      position: absolute
      top: 200px
      width: 249px
      height: 75px

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
