<template>
  <div id="app">
    <header class="c-bar">
      <h1>发劵测试 {{ callback.msg }}:{{ callback.data }}</h1>
    </header>

    <section
      ref="mfct"
      class="c-content">
      <c-index-list
        :data="components"
        class="c-list">
        <c-index-list-group
          v-for="(group, index) in components"
          :key="index"
          :group="group">
          <c-index-list-item
            v-for="(component, index) in group.items"
            :key="index"
            :item="component">
            <div class="c-item border-bottom-1px">
              <a @click="sendCouponAction(component.code)">
                {{ component.text }}
                <!--<i class="cubeic-good"/>-->
              </a>
            </div>
          </c-index-list-item>
        </c-index-list-group>
        <span
          slot="nav-item"
          slot-scope="props"
          class="custom-nav-item">{{ props.item }}</span>
      </c-index-list>
    </section>
    <c-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import CView from '../../components/c-view.vue'

  export default {
    components: {
      CView
    },
    data () {
      return {
        callback: {
          msg: '',
          data: ''
        },
        components: [
          {
            'name': '发劵测试',
            'shortcut': 'Coupon',
            'items': [
              {
                code: 3409,
                text: '3409 鱼肉狮子头套餐免费吃券'
              },
              {
                code: 3410,
                text: '3410 4元代金券（29起用，全天）'
              },
              {
                code: 3411,
                text: '3411 8元代金券（35起用）'
              },
              {
                code: 3412,
                text: '3412 蜜汁鸡翅5折券'
              },
              {
                code: 3413,
                text: '3413 橙汁5折券'
              },
              {
                code: 3414,
                text: '3414 红豆养生汤5折券'
              },
              {
                code: 3415,
                text: '3415 红枣银耳汤5折券'
              },
              {
                code: 3416,
                text: '3416 冰镇黄桃5折券'
              },
              {
                code: 3417,
                text: '3417 茶树菇老鸭单品5折券'
              },
              {
                code: 3418,
                text: '3418 咖喱牛肉单品5折券'
              },
              {
                code: 3419,
                text: '3419 梅干菜扣肉单品5折券'
              },
              {
                code: 3420,
                text: '3420 冰镇黄桃6折券'
              },
              {
                code: 3421,
                text: '3421 茶树菇老鸭单品6折券'
              },
              {
                code: 3422,
                text: '3422 茶树菇老鸭套餐6折券'
              },
              {
                code: 3423,
                text: '3423 杨梅汁6折券'
              },
              {
                code: 3424,
                text: '3424 红豆养生汤6折券'
              },
              {
                code: 3425,
                text: '3425 红枣银耳汤6折券'
              },
              {
                code: 3426,
                text: '3426 新千张包6折券'
              },
              {
                code: 3427,
                text: '3427 鱼香肉丝单品6折券'
              },
              {
                code: 3428,
                text: '3428 鱼香肉丝套餐6折券'
              },
              {
                code: 3429,
                text: '3429 剁椒芋艿单品7折券'
              },
              {
                code: 3430,
                text: '3430 剁椒芋艿套餐7折券'
              },
              {
                code: 3431,
                text: '冰镇黄桃7折券'
              },
              {
                code: 3432,
                text: '3432 茶树菇老鸭单品7折券'
              },
              {
                code: 3433,
                text: '3433 茶树菇老鸭套餐7折券'
              },
              {
                code: 3434,
                text: '3434 红豆养生汤7折券'
              },
              {
                code: 3435,
                text: '3435 红枣银耳汤7折券'
              },
              {
                code: 3436,
                text: '3436 剁椒芋艿单品8折券'
              },
              {
                code: 3437,
                text: '3437 剁椒芋艿套餐8折券'
              },
              {
                code: 3438,
                text: '3438 梅干菜扣肉单品8折券'
              },
              {
                code: 3439,
                text: '3439 梅干菜扣肉套餐8折券'
              },
              {
                code: 3440,
                text: '3440 茶树菇老鸭单品8折券'
              },
              {
                code: 3441,
                text: '3441 茶树菇老鸭套餐8折券'
              },
              {
                code: 3442,
                text: '3442 麻辣土豆仔鸡单品8折券'
              },
              {
                code: 3443,
                text: '3443 麻辣土豆仔鸡套餐8折券'
              },
              {
                code: 3444,
                text: '3444 鱼香肉丝单品8折券'
              },
              {
                code: 3445,
                text: '3445 鱼香肉丝套餐8折券'
              }
            ]
          }
        ]
      }
    },
    methods: {
      async sendCouponAction (code) {
        this.callback = await this.$store.dispatch('testSendCoupon', {
          code
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  html, body, #app
    height: 100%

  body
    background-color: #fff
    overflow: hidden

  .c-bar
    z-index: 10
    position: absolute
    right: 0
    left: 0
    height: 64px
    line-height: 64px
    text-align: center
    background-color: #C20E23
    color: #E4CA7D
    box-shadow: 0 2px 1px #e9eaea
    -webkit-backface-visibility: hidden
    backface-visibility: hidden

    h1
      font-size: 24px
      font-weight: 500

  .c-content
    position: absolute
    top: 64px
    left: 0
    right: 0
    bottom: 0
    overflow: scroll
    -webkit-overflow-scrolling: touch

    .c-list
      padding-left: 10px
      z-index: 1

      .c-index-list-group
        .c-index-list-anchor
          font-size: 24px

        ul
          .c-item
            height: 60px
            line-height: 60px
            padding-left: 16px

            .link
              font-size: 24px
              display: block
              position: relative
              width: 100%
              color: #333
              text-decoration: none
              outline: 0

              .cubeic-arrow
                position: absolute
                right: 0
                padding: 0 5px
                color: #ccc

      .c-index-list-nav
        margin-right: 0px
        padding: 8px 5px
        border-radius: 3px 0 0 3px
        background: #f7f7f7
        box-shadow: 0 0 5px #808080 47

        > ul
          > li
            padding: 8px 0

      .c-index-list-fixed
        font-size: 24px
</style>
