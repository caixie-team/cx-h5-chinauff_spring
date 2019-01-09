<!-- 5.1、二维码兑换 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page51">
      <!--<top-buttons/>-->
      <div class="content">
        <div
          v-if="status === 0"
          class="qrcode">
          <img :src="'https://weixin.chinauff.com/spring/qrcode/?size=360&txt='+blessingCode">
        </div>
        <div
          v-else
          class="qrcode">
          已兑换
        </div>
        <img
          src="~assets/img/text/text_qjrwmzsgsyy.png"
          class="text-qjrwmzsgsyy">
        <div
          v-if="reserve.shop_name !== null"
          class="exchange-form">
          <div class="exchange-form__content">
            <span class="date">
              {{ reserve.reserve_date }}
            </span>
            <span class="shop">
              {{ reserve.shop_name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '~/components/c-page.vue'
  import {isBrowser} from '~/environment_es'
  import TopButtons from '~/components/top-buttons'
  import PageContent from '~/components/page-content'
  import tip1 from '~/assets/img/text/text_gxnjd.png'
  import tip2 from '~/assets/img/text/text_gxncz.png'
  import apiConfig from '~/api.config.es'

  const API_PREFIX = apiConfig.baseUrl

  export default {
    name: 'Index',
    head () {
      return {
        title: '礼品兑换码'
      }
    },
    validate ({params, query}) {
      return !!params.code
    },

    fetch ({store, params, error}) {
      const blessing_code = params.code
      return store.dispatch('getReserve', {blessing_code})
      // console.log(params)
      // return store.dispatch('')
    },
    components: {
      CPage,
      TopButtons,
      PageContent
    },
    props: {
    },
    data () {
      return {
        total: '12,345',
        count: '2',
        tip1,
        tip2,
        limit: 2,
        blessingCode: '',
        status: 0,
        myInterval: null
      }
    },
    computed: {
      reserve () {
        return this.$store.state.user.reserve.data
      },
    },
    mounted () {
      this.blessingCode = this.$route.params.code
      // clearInterval(this.timer);
      // this.setTimer();
      this.myInterval = setInterval(async () => {
        await this.check()
        // ajax_wx_pay_status(timer)
      }, 2000);
    },
    destroyed () {
      console.log('destoryed....')
      // clearInterval(this.timer)
    },
    methods: {
      async check () {
        const data = await this.$axios.$post(`${API_PREFIX}/blessing/checkCode`, {
          blessing_code: this.blessingCode
        })
        if (data.errno > 0) {
          this.status = 1
          window.clearInterval(this.myInterval);
        }
      },
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      }
    },
    beforeRouteLeave (to, from, next) {
      window.clearInterval(this.myInterval);
      next()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .page51
    color: $color-dark
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: absolute
    left: 0
    width: 100%
    height: 100%
    justify-content: center
    overflow: hidden

    .content
      display: flex
      flex-direction: column
      align-items: center

      .qrcode
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        width: 380px
        height: 380px
        background: #E5D9A1

        img
          width: 340px
          height: 340px

      .text-qjrwmzsgsyy
        margin: 20px 0 30px 0
        width: 299px
        height: 25px

      .exchange-form
        width: 419px
        height: 235px
        background-image: url("~assets/img/bg/form_yydh.png")
        background-size: 419px 235px
        display: flex
        justify-content: flex-end

        &__content
          position: relative
          top: 110px
          display: flex
          flex-direction: column
          justify-content: space-between
          height: 80px
          width: 300px

        span
          font-weight: 500
          font-size: 22px
          position: relative

          &.date
            left: 30px

          &.shop
            left: 30px

    .footer
      display: flex
      position: absolute
      bottom: 0
      width: 100%;
      height: 167px;
      background-image: url("~assets/img/common/footer_bsbg.png")
      background-size: 640px 167px
      justify-content: center
</style>
