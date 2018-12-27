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
            class: this.type === 'main' ? 'btn-wdhbm' : 'btn-wdhb'
          },
          {
            name: 'wdjb',
            text: '我的劵包',
            class: this.type === 'main' ? 'btn-wdfbm' : 'btn-wdfb'
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
        console.log(name)
        if (name === 'hdjs') {
          this.showDialog('intro')
        } else if (name === 'dhff') {
          this.showDialog('dhff')
        } else if (name === 'wdfb') { // 我的福包页
          setTimeout(() => {
            // this.dialog.hide()
            // this.$store.commit('ai/RESET_SCORE')
            this.$router.push('/page311')
            // this.$router.push('/page22')
          }, 100)
        }
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

      &-hdjsm
        background: url('~assets/img/btn/btn_hdjsm.png') no-repeat
        background-size: 51px 144px

      &-dhffm
        background: url('~assets/img/btn/btn_dhffm.png') no-repeat
        background-size: 51px 144px

      &-wdhbm
        background: url('~assets/img/btn/btn_wdfbm.png') no-repeat
        background-size: 51px 144px
        margin-left: 10px
        margin-right: 10px

      &-wdfbm
        background: url('~assets/img/btn/btn_wdfbm.png') no-repeat
        background-size: 51px 144px

      &-hdjs
        background: url('~assets/img/btn/btn_hdjs.png') no-repeat
        background-size: 51px 144px

      &-dhff
        background: url('~assets/img/btn/btn_dhff.png') no-repeat
        background-size: 51px 144px

      &-wdhb
        background: url('~assets/img/btn/btn_wdfb.png') no-repeat
        background-size: 51px 144px
        margin-left: 10px
        margin-right: 10px

      &-wdfb
        background: url('~assets/img/btn/btn_wdfb.png') no-repeat
        background-size: 51px 144px
</style>
