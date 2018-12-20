<!-- 活动介绍 -->
<template>
  <div class="popup share">
    <div class="buttons">
      <img
        :src="btn1"
        class="btn1">
      <img
        :src="btn2"
        class="btn2">
    </div>
  </div>
</template>
<script>
  import btn1 from '~/assets/img/btn/btn_friend.png'
  import btn2 from '~/assets/img/btn/btn_friend_timeline.png'

  export default {
    data () {
      return {
        btn1,
        btn2
      }
    },
    methods: {
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .popup.share
    width: 418px
    height: 474px
    overflow: hidden
    background: url('~assets/img/bg/popup_bg_small.png') no-repeat
    background-size: 418px 474px
    display: flex
    flex-direction: column
    text-align: center
    align-items: center

    .buttons
      position: absolute
      bottom: 100px
      width: 292px;
      display: flex
      justify-content: space-between
      .btn1
        width: 134px
        height: 176px
      .btn2
        width: 132px
        height: 176px

</style>
