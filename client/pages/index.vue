<template>
  <c-page>
    <div
      slot="content">
      <div class="notices">
        <div class="content">
          <h1>
            活动即将开始
            <br>
            敬请关注
          </h1>
          <p>
            活动时间: 2019年1月5日——2月6日
          </p>
        </div>
        <div class="footer">
          <p>
            关注公众号，活动消息早知道
          </p>
          <a href="">
            <span>关注老娘舅公众号</span>
          </a>
        </div>
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment'
  export default {
    name: 'Index',
    head() {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
      }
    },
    components: {
      CPage,
    },
    data () {
      return {
      }
    }
  }
</script>

<!--<style lang="stylus" rel="stylesheet/stylus">-->
<!--.c-page-->
<!--width: 640px;-->
<!--position: absolute-->
<!--z-index: 10-->
<!--top: 0-->
<!--left: 0-->
<!--/*width: 100%*/-->
<!--/*height: 100%*/-->
<!--background-size: 100% 100%;-->
<!--background: url("/static/image/page-bg.jpg") no-repeat left top;-->

<!--</style>-->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .notices
    color: #000
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    h1
      font-size: 48px
      font-weight: bold
      line-height: 100px
      text-shadow: 0 1px 30px rgba(0,0,0,0.30);
      opacity: .8
    p
      font-size: $fontsize-large-xxx
      font-weight: bold
    .content
      flex: 1
      line-height: 50px
      padding-top: 40%
      text-align: center
    .footer
      display: flex
      height: 260px
      flex-direction: column
      justify-content: center;
      align-items: center
      line-height: 80px;
      color: #e6daa2;
      a
        width: 266px
        height: 64px
        background: url('~assets/images/bg/btn_default_bg.png') no-repeat
        background-size: 266px 64px
        display: flex
        align-items: center
        justify-content: center
        span
          color: #000
          font-weight: bold
          font-size: $fontsize-large-xxx
          opacity: .8
</style>
