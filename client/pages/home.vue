<template>
  <c-page>
    <div
      slot="content"
      class="home">
      <top-buttons/>
      <img
        src="~assets/images/home/bt.png"
        class="imgBt">
      <div class="footer">
        <a
          href="javascript:;"
          @click="showAlert">
          <img
            src="~assets/images/home/sys.png">
        </a>
        <!--<input-->
        <!--id="upload"-->
        <!--type="file"-->
        <!--accept="image/*"-->
        <!--capture="camera"-->
        <!--@change="upload">-->
        <!--<label for="upload">上传</label>-->
      </div>
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment'
  import TopButtons from '../components/top-buttons'

  export default {
    name: 'Index',
    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
      }
    },
    components: {
      CPage,
      TopButtons
    },
    data () {
      return {}
    },
    methods: {
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      },
      upload (e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        // this.picValue = files[0]
        // this.imgPreview(this.picValue)
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
