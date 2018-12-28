<template>
  <c-page type="bg1">
    <div
      slot="content"
      class="home">
      <top-buttons :actions="actions"/>
      <img
        src="~assets/images/home/bt.png"
        class="imgBt">
      <div class="footer">
        <div
          v-if="luckyTimes > 0"
          class="upload">
          <label for="theFile">
            <img src="~assets/img/btn/btn_sys.png">
          </label>
          <input
            id="theFile"
            ref="camera"
            type="file"
            class="file"
            capture="camera"
            @change="upload">
        </div>
        <div
          v-else
          class="upload"
          @click="showDialog('limit')">
          <label>
            <img src="~assets/img/btn/btn_sys.png">
          </label>
        </div>
      </div>
    </div>
    <!--<ai-scan class="scan"/>-->
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment'
  import TopButtons from '../components/top-buttons'
  import AiScan from '../components/ai-scan'
  import DialogScan from '../components/dialog/dialog-scan'
  import Exif from 'exif-js'
  // import apiConfig from '~/api.config'

  export default {
    transition: 'fade',
    name: 'Index',

    head () {
      return {
        title: '老娘舅新春集福瓜分18吨福米'
      }
    },
    components: {
      CPage,
      TopButtons,
      AiScan,
      DialogScan
    },
    // async asyncData ({$axios}) {
    //   const {data} = await $axios.get('/server/ai')
    // },
    data () {
      return {
        isScan: false,
        headerImage: '',
        picValue: '',
        actions: ['hdjs', 'wdfb']
      }
    },
    computed: {
      isChecking () {
        return this.$store.state.ai.posting
      },
      isMatching () {
        return this.$store.state.ai.data.score > 40
      },
      score () {
        return this.$store.state.ai.data.score
      },
      luckyTimes () {
        return this.$store.state.user.lucky.data.times
      },
      userInfo () {
        return this.$store.state.user.info.data
      }
    },
    watch: {
      score () {
        if (this.score > 40) {
          // 跳转到集福动画页
          setTimeout(() => {
            this.dialog.hide()
            this.$store.commit('ai/RESET_SCORE')
            this.$router.push('/page22')
          }, 3000)

        } else {
          setTimeout(() => {
            this.dialog.hide()
          }, 3000)
          this.picValue = ''
        }
      },
      isMatching () {
        setTimeout(() => this.dialog.hide(), 3000)
      }
    },
    mounted () {
      this.$store.commit('ai/RESET_SCORE')
      this.$store.dispatch('luckyTimes', {
        openId: this.userInfo.openId
      })
    },
    methods: {
      showAlert () {
        this.dialog = this.$createDialog({
          type: 'intro',
          showClose: true
        })
        this.dialog.show()
      },
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          ...option
        })
        this.dialog.show()
      },
      upload (e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.picValue = files[0]
        this.imgPreview(this.picValue)

      },
      imgPreview (file) {
        const self = this
        let Orientation
        // 去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function () {
          Orientation = Exif.getTag(this, 'Orientation')
        })
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return

        if (/^image/.test(file.type)) {
          // 创建一个reader
          const reader = new FileReader()
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file)
          // 读取成功后的回调
          reader.onloadend = function () {
            const result = this.result
            const img = new Image()
            img.src = result
            self.showDialog('scan', {
              imgsrc: img.src
            })
            // 判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              self.headerImage = this.result
              self.postImg()
            } else {
              img.onload = function () {
                const data = self.compress(img, Orientation)
                self.headerImage = data
                self.postImg()
              }
            }
          }
        }
      },
      async postImg () {
        // 这里写接口
        // console.log(this.headerImage)
        const imageData = this.headerImage.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
        await this.$store.dispatch('checkImage', {
          file: imageData
        })
        // const res = await this.$axios.$post(`${apiConfig.hostUrl}/api/ai`, {
        //   file: imageData
        // })
        // console.log(res.data.score)
      },
      rotateImg (img, direction, canvas) {
        // 最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0
        const max_step = 3
        if (img == null) return
        // img的高度和宽度不能在img元素隐藏后获取，否则会出错
        const height = img.height
        const width = img.width
        let step = 2
        // if (step == null) {
        //   step = min_step
        // }
        if (direction === 'right') {
          step++
          // 旋转到原位置，即超过最大值
          step > max_step && (step = min_step)
        } else {
          step--
          step < min_step && (step = max_step)
        }
        // 旋转角度以弧度值为参数
        const degree = step * 90 * Math.PI / 180
        const ctx = canvas.getContext('2d')
        switch (step) {
          case 0:
            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0)
            break
          case 1:
            canvas.width = height
            canvas.height = width
            ctx.rotate(degree)
            ctx.drawImage(img, 0, -height)
            break
          case 2:
            canvas.width = width
            canvas.height = height
            ctx.rotate(degree)
            ctx.drawImage(img, -width, -height)
            break
          case 3:
            canvas.width = height
            canvas.height = width
            ctx.rotate(degree)
            ctx.drawImage(img, -width, 0)
            break
          default:
            console.log('step')
        }
      },
      compress (img, Orientation) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // 瓦片canvas
        const tCanvas = document.createElement('canvas')
        const tctx = tCanvas.getContext('2d')
        const initSize = img.src.length
        let width = img.width
        let height = img.height
        // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio
        if ((ratio = width * height / 4000000) > 1) {
          console.log('大于400万像素')
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
        } else {
          ratio = 1
        }
        canvas.width = width
        canvas.height = height
        // 铺底色
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // 如果图片像素大于100万则使用瓦片绘制
        let count
        if ((count = width * height / 1000000) > 1) {
          console.log('超过100W像素')
          // 计算要分成多少块瓦片
          count = ~~(Math.sqrt(count) + 1)
          // 计算每块瓦片的宽和高
          const nw = ~~(width / count)
          const nh = ~~(height / count)
          tCanvas.width = nw
          tCanvas.height = nh
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height)
        }
        // 修复ios上传图片的时候 被旋转的问题
        if (Orientation !== '' && Orientation !== 1) {
          switch (Orientation) {
            case 6:
              // 需要顺时针（向左）90度旋转
              this.rotateImg(img, 'left', canvas)
              break
            case 8:
              // 需要逆时针（向右）90度旋转
              this.rotateImg(img, 'right', canvas)
              break
            case 3:
              // 需要180度旋转
              // 转两次
              this.rotateImg(img, 'right', canvas)
              this.rotateImg(img, 'right', canvas)
              break
            default:
              console.log('rotate')
          }
        }
        // 进行最小压缩
        const ndata = canvas.toDataURL('image/jpeg', 0.1)
        console.log('压缩前：' + initSize)
        console.log('压缩后：' + ndata.length)
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0

        return ndata
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .scan
    z-index: 100

  .c-dialog-content-def
    img
      width: 332px
      height: 108px

  .home
    color: #000
    display: flex
    align-items: center
    flex-direction: column
    justify-content: space-between
    min-height: 100vh
    /*position: absolute*/
    z-index: 1
    left: 0
    width: 100%
    height: 100%
    /*background: #ab2d2f;*/
    background-image: url('~assets/images/home/hn.png')
    background-size: 640px 1136px
    overflow: hidden

    .imgBt
      padding: 145px 112px 0 112px
      width: 444px
      height: 176px

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
      /*top: 200px*/
      /*position: relative*/
      /*flex: 1*/
      /*display: flex*/
      /*height: 300px*/
      /*flex-direction: column*/
      /*justify-content: flex-end;*/
      /*align-items: flex-end;*/
      margin-bottom: 2%
      color: #e6daa2;

      .upload
        width: 266px
        height: 100px

        label
          position: absolute

          img
            width: 266px
            height: 64px

        .file
          display: none

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
