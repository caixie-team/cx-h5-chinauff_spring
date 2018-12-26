<template>
  <div
    :class="typeClass">
    <div class="wrapper">
      <section
        v-show="desc"
        class="desc">
        <slot name="desc">{{ desc }}</slot>
      </section>
      <main class="page-content">
        <slot name="content">{{ content }}</slot>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    },
    computed: {
      typeClass () {
        return [
          'c-page',
          this.type
        ]
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .c-page
    position: absolute
    z-index: 10
    top: 0
    left: 0
    width: 100%
    height: 100%
    //background: #efeff4
    overflow: hidden

    &.bg1
      background: url('~assets/img/bg/page_bgr.jpg')
      background-size: 640px 1136px;

    &.bg2
      background: url('~assets/img/bg/page_bgm.jpg')
      background-size: 640px 1136px;

    &.bg3
      background: url('~assets/img/bg/page_bg3.png')
      background-size: 640px 1136px;

    > .wrapper
      // height: calc(100% - 44px)
      overflow-x: hidden
      overflow-y: auto
      // -webkit-overflow-scrolling: touch

      .desc
        padding: 10px
        margin: 10px 0
        line-height: 20px
        font-size: 14px
</style>


