<template>
  <div class="topButtons">
    <a
      v-for="btn in buttons"
      v-if="isAction(btn.name, actions)"
      :key="btn.name"
      :class="btn.class"
      class="btn"
      href="javascript:;"
      @click="show(btn.name)"/>
  </div>
</template>

<script>
  import {oneOf} from '../utils/assist.js'
  import apiConfig from '~/api.config.es'
  export default {
    props: {
      type: {
        type: String,
        default: 'main'
      },
      actions: {
        type: Array,
        default: () => {
          return [
            'hdjs',
            'wdfb'
          ]
        }
      }
    },
    data () {
      return {
        buttons: [
          {
            name: 'hdjs',
            text: '活动介绍',
            class: this.type === 'main' ? 'btn-hdjsm' : 'btn-hdjs'
          },
          {
            name: 'dhff',
            text: '兑换方法',
            class: this.type === 'main' ? 'btn-dhff' : 'btn-dhff'
          },
          {
            name: 'wdfb',
            text: '我的福包',
            class: this.type === 'main' ? 'btn-wdfbm' : 'btn-wdfb'
          },
          {
            name: 'wdqb',
            text: '我的劵包',
            class: this.type === 'main' ? 'btn-wdqbm' : 'btn-wdqb'
          },
          {
            name: 'ckkb',
            text: '查看卡包',
            class: this.type === 'main' ? 'btn-ckkbm' : 'btn-ckkb'
          }
        ]
      }
    },
    computed: {},
    methods: {
      isAction (value, array) {
        return oneOf(value, array)
      },
      show (name) {
        if (name === 'hdjs') {
          this.showDialog('intro')
        } else if (name === 'dhff') {
          this.showDialog('dhff')
        } else if (name === 'wdfb') { // 我的福包页
          setTimeout(() => {
            this.$router.push('/page311')
          }, 100)
        } else if (name === 'wdqb') {
          setTimeout(() => {
            this.redirectUserCenter()
          }, 100)
        } else if (name === 'ckkb') {
          setTimeout(() => {
            this.$router.push('/pageCard')
          }, 100)
        }
      },
      redirectUserCenter () {
          let locationHref = window.location.href
          locationHref = locationHref + '&coupon_code=' + this.coupon_code
          const encodeUrl = encodeURIComponent(locationHref)
          window.location.href = `${apiConfig.proxyUrl}/weixin/page/loginPage`
      },
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          showClose: true
        })
        this.dialog.show()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .topButtons
    position: absolute
    right: 20px
    top: 0
    height: 150px
    width: auto
    display: flex
    flex-direction: row
    /*justify-content: flex-end*/
    z-index: 100

    .btn
      width: 51px
      heigth: 144px
      padding: 3px
      &-hdjsm
        background: url('~assets/img/btn/btn_hdjsm.png') no-repeat
        background-size: 51px 144px
      &-hdjs
        background: url('~assets/img/btn/btn_hdjs.png') no-repeat
        background-size: 51px 144px

      &-dhffm
        background: url('~assets/img/btn/btn_dhffm.png') no-repeat
        background-size: 51px 144px

      &-wdfbm
        background: url('~assets/img/btn/btn_wdfbm.png') no-repeat
        background-size: 51px 144px

      &-hdjs
        background: url('~assets/img/btn/btn_hdjs.png') no-repeat
        background-size: 51px 144px

      &-dhff
        background: url('~assets/img/btn/btn_dhff.png') no-repeat
        background-size: 51px 144px

      &-wdfb
        background: url('~assets/img/btn/btn_wdfb.png') no-repeat
        background-size: 51px 144px
      &-wdqb
        background: url('~assets/img/btn/btn_wdqb.png') no-repeat
        background-size: 51px 144px

      &-wdqbm
        background: url('~assets/img/btn/btn_wdqb.png') no-repeat
        background-size: 51px 144px
      &-ckkb
        background: url('~assets/img/btn/btn_ckkb.png') no-repeat
        background-size: 51px 144px
      &-ckkbm
        background: url('~assets/img/btn/btn_ckkbm.png') no-repeat
        background-size: 51px 144px
</style>
