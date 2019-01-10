<!-- 恭喜你集到福了 -->
<template>
  <div class="popup jdfl">
    <!-- 恭喜你集到福了 -->
    <img
      :src="text"
      class="text">
    <img
      :src="icon"
      class="icon">
    <div
      v-if="blessing_code !== '' && blessing_code !== null"
      class="buttons">
      <img
        :src="btn"
        @click="exchange">
    </div>
  </div>
</template>
<script>
  // import text_limit from '~/assets/img/text/text_popup_limit.png'
  // 领取成功
  import text from '~/assets/img/text/text_gxnjdfl.png'
  import icon from '~/assets/img/icon/icon_gxxz.png'
  import btn from '~/assets/img/btn/btn_yydhh.png'

  const EVENT_CLOSE = 'close'
  export default {
    props: {
      blessing_code: {
        type: String,
        required: true
      },
      type: {
        type: String, // success/limit
        default: ''
      }
    },
    data () {
      return {
        text,
        icon,
        btn,
      }
    },
    computed: {
    },
    mounted () {
      console.log('init jdfl')
      console.log(this.blessing_code)
    },
    methods: {
      close (e) {
        this.$emit(EVENT_CLOSE, e)
      },
      // 跳转至预约兑换页面
      exchange (e) {
        console.log('--d-d-d-d-')
        this.$router.push('/page41/' + this.blessing_code)
        this.$emit(EVENT_CLOSE, e)
        // this.$router.push(`/${name}`)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .popup.jdfl
    width: 412px
    height: 654px
    overflow: hidden
    background: url('~assets/img/bg/popup_bg_big.png') no-repeat
    background-size: 412px 654px
    display: flex
    justify-content: center
    flex-direction: column
    text-align: center
    align-items: center
    .icon
      margin-top: 130px
      width: 186px
      height: 164px
    .text
      position: absolute
      top: 200px
      width: 303px
      height: 78px

    .buttons
      position: absolute
      bottom: 80px
      width: 292px
      display: flex
      justify-content: center
      img
        width: 266px
        height: 64px
</style>
