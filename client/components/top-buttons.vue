<template>
  <div class="topButtons">
    <a
      v-for="btn in buttons"
      :key="btn.name"
      :class="btn.class"
      class="btn"
      href="javascript:;"
      @click="show(btn.name)"/>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'main'
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
            name: 'wdhb',
            text: '我的红包',
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
    methods: {
      show (name) {
        if (name === 'hdjs') {
          this.showDialog('intro')
        } else {
          this.$router.push(`/${name}`)
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
    right: 30px
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

      &-wdhb
        background: url('~assets/img/btn/btn_wdfb.png') no-repeat
        background-size: 51px 144px
        margin-left: 10px
        margin-right: 10px

      &-wdfb
        background: url('~assets/img/btn/btn_wdfb.png') no-repeat
        background-size: 51px 144px
</style>
