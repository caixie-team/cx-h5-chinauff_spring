<template>
  <div>

    <div class="show">
      <div
        :style="'backgroundImage:url('+headerImage+')'"
        class="picture"/>
    </div>
    <div class="upload">
      <div class="box">
        <div class="wrap">
          <label
            for="theFile"
            class="select-btn">
            <img src="~assets/img/btn/btn_sys.png">
          </label>
          <input
            id="theFile"
            type="file"
            class="file"
            capture="camera"
            @change="upload">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Exif from 'exif-js'

  export default {
    data () {
      return {
        headerImage: '',
        picValue: ''
      }
    },
    methods: {
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

        // const res = await $.post('/ai/image', {
        //   file: imageData
        // })
        // console.log(res.data.data.score)
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

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .upload
    width: 200px
    height: 100px

    .box
      .wrap
        label
          position: absolute
          width: 266px
          height: 64px

        .select-btn
          width: 100%

        .file
          display: none

    .container1
      animation: fadeInUp 5s infinite

    .container2
      animation: fadeInDown 5s infinite

    .container3
      width: 100%
      text-align: center

    .circle
      position: absolute
      display: block
      border-radius: 50%
      border: 2px solid #C04CFD
      transform-origin: 50% 50%
      transform-style: preserve-3d

    .circle1
      animation: rotate1 1s infinite linear
      border-color: #A27035
      height: 100px
      width: 100px
      margin: -50px

    .circle2
      animation: rotate2 1s infinite linear
      border-color: #B88B4A
      height: 70px
      width: 70px
      margin: -35px

    .circle3
      animation: rotate3 1s infinite linear
      border-color: #DDCA7D
      height: 10px
      width: 10px
      margin: -5px

    .color1
      color: #A27035

    .color2
      color: #B88B4A

    .color3
      color: #DDCA7D

    @keyframes rotate1
      0%
        transform: rotateZ(20deg) rotateY(0deg)
      100%
        transform: rotateZ(100deg) rotateY(360deg)

    @keyframes rotate2
      0%
        transform: rotateZ(100deg) rotateX(0deg)
      100%
        transform: rotateZ(0deg) rotateX(360deg)

    @keyframes rotate3
      0%
        transform: rotateZ(100deg) rotateX(-360deg)
      100%
        transform: rotateZ(-360deg) rotateX(360deg)

    @keyframes fadeInUp
      0%
        opacity: 0;
        margin-top: 20px
      10%
        opacity: 1
        margin-top: 0px
      45%
        opacity: 1
        margin-top: 0px
      50%
        opacity: 0
        margin-top: 20px
      100%
        opacity: 0
        margin-top: 20px

    @keyframes fadeInDown
      0%
        opacity: 0
        margin-top: 0px
      10%
        opacity: 1
        margin-top: 20px
      45%
        opacity: 1
        margin-top: 20px
      50%
        opacity: 0
        margin-top: 0px
      100%
        opacity: 0
        margin-top: 0px

    @keyframes fadeInDown2
      0%
        opacity: 0
        margin-top: -100px
      55%
        opacity: 0
        margin-top: -100px
      60%
        opacity: 1
        margin-top: -50px
      90%
        opacity: 1
        margin-top: -50px
      100%
        opacity: 0
        margin-top: 0px

    .msg
      padding-top: 150px
      font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif
      color: #A27035

    h1.msg
      font-size: 5em
      animation: fadeInDown2 5s infinite
</style>

