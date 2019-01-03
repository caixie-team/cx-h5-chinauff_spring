<template>
  <div class="preloader">
    <div
      class="container container1">
      <div class="circle"/>
      <div class="circle circle1"/>
      <div class="circle circle2"/>
      <div class="circle circle3"/>
    </div>
    <div
      class="container container2">
      <p class="msg">
        <span class="color1">AI 智能识别中...</span>
      </p>
    </div>
    <div
      class="container container3">
      <h1 class="msg">
        <span
          v-if="score === 100"
          class="color2">
          识别成功
        </span>
        <span v-else>
          识别失败
          <br><br>
          请重新 “扫一扫”
        </span>
        <!--<span class="color3">成功·</span>-->
      </h1>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      isChecking () {
        return this.$store.state.ai.posting
      },
      isMatching () {
        return this.$store.state.ai.data.score === 100
      },
      score () {
        return this.$store.state.ai.data.score
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .preloader
    display: flex
    flex-direction: column
    justify-content: center

    .container
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)

    .container1
      animation: fadeInUp 3s infinite

    .container2
      animation: fadeInDown 3s infinite

    .container3
      width: 100%
      text-align: center

  .circle
    position: absolute
    display: block
    border-radius: 50%
    border: 5px solid #ff3037
    transform-origin: 50% 50%
    transform-style: preserve-3d

  .circle1
    animation: rotate1 1s infinite linear
    border-color: #fdd32a
    height: 100px
    width: 100px
    margin: -50px

  .circle2
    animation: rotate2 1s infinite linear
    border-color: #ff3037
    height: 70px
    width: 70px
    margin: -35px

  .circle3
    animation: rotate3 1s infinite linear
    border-color: #fdd32a
    height: 10px
    width: 10px
    margin: -5px

  .color1
    color: #fdd32a

  .color2
    color: $color-white

  .color3
    color: $color-primary

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
    color: #fdd32a

  h1.msg
    padding-top: 50px
    font-size: 40px
    line-height: 40px
    animation: fadeInDown2 3s infinite
</style>
