<!-- 领取成功进入会员中心劵包，用在助力集福页的弹窗, 不是去 261页，是去第65页 -->
<template>
  <div class="popup success">
    <img
      :src="text"
      class="text">
    <div class="buttons">
      <!-- 其实是去 page65 没来得及改名字 -->
      <img
        :src="btn1"
        @click="toPage261">
    </div>
  </div>
</template>
<script>
  // import text_limit from '~/assets/img/text/text_popup_limit.png'
  // 领取成功
  import text from '~/assets/img/text/text_lqcg1.png'
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
      toPage261 (e) {
        this.$router.push('/page65')
        // this.$router.push('/page261')
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
    background: url('~assets/img/bg/popup_bg_small.png') no-repeat
    background-size: 418px 474px
    display: flex
    flex-direction: column
    text-align: center
    align-items: center
    justify-content:center

    .text
      position: absolute
      top: 200px
      width: 331px
      height: 79px

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
