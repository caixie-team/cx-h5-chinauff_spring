<template>
  <c-page>
    <div
      slot="content">
      <div class="landing">
        <img src="~assets/images/landing.png">
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment_es'

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
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .landing
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    min-height: 100vh
    img
      width: 418px
      height: 923px
  .notices
    color: #fff
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    h1
      padding-top: 20px
      font-size: 48px
      font-weight: bold
      line-height: 90px
    p
      font-size: $fontsize-large-xxx
      font-weight: bold
    .content
      flex: 1
      line-height: 50px
      padding-top: 25%
      text-align: center
    .footer
      display: flex
      height: 350px
      flex-direction: column
      justify-content: center
      align-items: center
      line-height: 80px
      color: #fff
      img
        width: 160px
        height: 160px
</style>
