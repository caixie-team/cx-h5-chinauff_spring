<template>
  <c-page>
    <div
      slot="content"
      class="home">
      <div class="topButtons">
        <a
          class="btn hdjsBtn"
          @click="showAlert"/>
        <nuxt-link
          class="btn wdfbBtn"
          to="/about"/>
      </div>
      <img
        src="~assets/images/home/bt.png"
        class="imgBt">
      <div class="footer">
        <a href="">
          <img
            src="~assets/images/home/sys.png">
        </a>
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment'

  export default {
    name: 'Index',
    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
      }
    },
    components: {
      CPage,
    },
    data () {
      return {}
    },
    methods: {
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'alert',
          showClose: true,
          title: `<img src="/assets/images/text/jifuyoli.png">`,
          content: `
<p>
集福活动时间：
<br>
2019年1月5日0:00:00 - 2019年2月4日23:59:59
</p>
<br>
<p>
进入活动主页,扫一扫任意米饭,即可参与新春集"福",集齐"礻"、"一"、"口"、"田"等四个结构字,合成“福”字,即为集"福"成功,每个账户可集满的"福"字数量不限;
</p>
<br>
<p>
活动期内参与集福,每参与一次还可获得老娘舅新春优惠礼券一份,更有机会抢到50元新春会员充值卡;
</p>
<br>
<p>
活动期内,每个活动账户每天仅可参与3次集福;
</p>
<br>
<p>
集到的结构字和福字,可在“我的福包”中查看;
</p>
<br>
<p>
获得的优惠礼券可在"老娘舅会员中心-券包"中查看;
</p>
<br>
获得的会员充值卡可在"活动主页-我的福包-查看卡包"中查看.
`,
          icon: 'cubeic-alert'
        })
        this.dialog.show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .c-dialog-content-def
    img
      width: 332px
      height: 108px

  .home
    color: #000
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: absolute
    z-index: 10
    left: 0
    width: 100%
    height: 100%
    background: url('~assets/images/home/hn.png')
    background-size: 640px 1136px
    overflow: hidden
    .imgBt
      padding: 145px 112px 0 112px
      width: 444px
      height: 176px
    .imgSys
      width: 543px
      height: 528px
    .topButtons
      position: absolute
      right: 30px
      top: 0
      height: 150px
      width: 111px
      z-index: 100
      display: flex
      justify-content: space-between
      .btn
        width: 51px
        heigth: 144px
        &.hdjsBtn
          background: url('~assets/images/buttons/hdjsm.png') no-repeat
          background-size: 51px 144px
        &.wdfbBtn
          background: url('~assets/images/buttons/wdfbm.png') no-repeat
          background-size: 51px 144px
    h1
      font-size: 48px
      font-weight: bold
      line-height: 100px
      text-shadow: 0 1px 30px rgba(0, 0, 0, 0.30);
      opacity: .8
    p
      font-size: $fontsize-large-xxx
      font-weight: bold
    .footer
      flex: 1
      display: flex
      height: 300px
      flex-direction: column
      justify-content: flex-end;
      align-items: flex-end;
      color: #e6daa2;
      a
        width: 266px
        height: 200px
        /*height: 64px*/
        /*background: url('~assets/images/bg/btn_default_bg.png') no-repeat*/
        /*background-size: 266px 64px*/
        display: flex
        align-items: center
        justify-content: center
        img
          width: 266px
          height: 64px
</style>
