<!-- 活动介绍 -->
<template>
  <div class="popup limit">
    <div class="text">
      {{ msg }}
    </div>
    <div class="buttons">
      <img
        :src="btn1"
        @click="close">
    </div>
  </div>
</template>
<script>
  import text from '~/assets/img/text/text_popup_limit.png'
  import btn1 from '~/assets/img/btn/btn_zdlh.png'
  import btn2 from '~/assets/img/btn/btn_yqhyl.png'
  import EventBus from '~/utils/event-bus.js'

  const EVENT_CLOSE = 'close'
  export default {
    props: {
      msg: {
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
    methods: {
      shareGuide() {
        EventBus.$emit('share', true)
      },
      close (e) {
        this.$emit(EVENT_CLOSE, e)
      },
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          ...option
        })
        this.dialog.show()
        this.close()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .popup.limit
    width: 418px
    height: 474px
    overflow: hidden
    background: url('~assets/img/bg/popup_bg_small.png') no-repeat
    background-size: 418px 474px
    display: flex
    flex-direction: column
    text-align: center
    align-items: center
    justify-content: center

    .text
      position: absolute
      top: 200px
      width: 292px
      height: 62px
      font-size: $fontsize-large-xx

    .buttons
      position: absolute
      bottom: 100px
      width: 292px
      display: flex
      justify-content: center
      align-items: center

      img
        width: 136px
        height: 41px
</style>
