<template>
  <div>
    <nuxt-link
      class="link"
      to="/home">
      集福首页
    </nuxt-link>
    <a
      class="link c-btn"
      @click="showDialog('intro')">
      活动介绍
    </a>
    <br>
    <a
      class="link c-btn"
      @click="showDialog('limit', {showClose: true})">
      今日可参与次数已用完
    </a>
    <br>
    <a
      class="link c-btn"
      @click="showDialog('share')">
      分享给好友
    </a>
    <br>
    <a
      class="link c-btn"
      @click="showDialog('prize', { word: 'kou', coupon: 'mianfei'})">
      恭喜你集到
    </a>
    <br>
    <a
      class="link c-btn"
      @click="showDialog('prize', {coupon: 'qizhe'})">
      未集到
    </a>

    <br>
    <a
      class="link c-btn"
      @click="showDialog('success', {showClose: false})">
      领取成功
    </a>
  </div>
</template>

<script>
  import titleImg from '~/assets/images/text/jifuyoli.png'
  import {has} from 'lodash'

  export default {
    methods: {
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          word: has(option, 'word') ? option.word : '',
          coupon: has(option, 'coupon') ? option.coupon : '',
          showClose: has(option, 'showClose') ? option.showClose : true
        })
        this.dialog.show()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .c-btn
    display: block
    margin: 0
    padding: 17px 16px
    width: 100%
    text-align: center
    white-space: nowrap
    cursor: pointer
    font-size: $fontsize-large
    line-height: 1
    color: $btn-color
    background: $btn-bgc
    outline: none
    border: none
    border-radius: 2px
    box-sizing: border-box
    -webkit-tap-highlight-color: transparent
    btn-active($btn-active-bgc)
</style>
