<template>
  <div id="app">
    <header class="c-bar">
      <h1>老娘舅春节活动测试</h1>
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
            <div class="c-item border-bottom-1px" >
              <a
                v-if="component.blank === true"
                :href="component.path">
                {{ component.text }}
                <i class="cubeic-navigation"/>
              </a>
              <router-link
                v-else
                :to="component.path"
                class="link">
                {{ component.text }}
                <i class="cubeic-arrow"/>
              </router-link>
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
  import CView from '../components/c-view.vue'

  export default {
    components: {
      CView
    },
    data() {
      return {
        components: [
          {
            'name': '接口测试',
            'shortcut': 'Pages',
            'items': [
              {
                path: '/test/jssdk',
                text: '获取微信分享授权信息'
              },
              {
                path: 'http://demo.micvs.com/lnj-weixin/console/activity/weChat/openId?callback=http://weixin.chinauff.com/spring/test/callback',
                text: '获取 openid',
                blank: true
              },
              {
                path: '/test/userinfo',
                text: '获取用户信息'
              }
            ]
          },
          {
            'name': '功能页面',
            'shortcut': 'Pages',
            'items': [
              {
                path: '/',
                text: '0.0 活动预告页'
              },
              {
                path: '/home',
                text: '1.1 集福首页'
              },
              {
                path: '/page21',
                text: '2.1、AR界面：扫一扫操作'
              },
              {
                path: '/page22',
                text: '2.2、AR界面：扫描成功后动画，可跳过'
              },
              {
                path: '/page23',
                text: '2.3、扫描结果，需要点击查看'
              },
              {
                path: '/page241',
                text: '2.4.1、提示集到的字和券-有字'
              },
              {
                path: '/page242',
                text: '2.4.2、提示集到的字和券-无字'
              },
              {
                path: '/page25',
                text: '2.5、AR界面：领取成功弹窗提示'
              },
              {
                path: '/page261',
                text: '2.6.1、领取完成后页面-有字'
              },              {
                path: '/page262',
                text: '2.6.2、有福集满，则弹窗提示，动画效果'
              },
              {
                path: '/page263',
                text: '2.6.3、领取完成后页面-无字'
              },
              {
                path: '/page27',
                text: '2.7、选择分享途径'
              },
              {
                path: '/page311',
                text: '3.1.1、我的福包-满福-可预约'
              },
              {
                path: '/page312',
                text: '3.1.2、我的福包-满福-已预约可兑换'
              },
              {
                path: '/page313',
                text: '3.1.3、我的福包-满福-已兑换'
              },
              {
                path: '/page314',
                text: '3.1.4、我的福包-无满福'
              },              {
                path: '/page41',
                text: '4.1、预约兑换-未填入预约信息'
              },
              {
                path: '/page42',
                text: '4.2、预约兑换-未填入预约信息'
              },
              {
                path: '/page43',
                text: '4.3、选择预约门店'
              },
              {
                path: '/page44',
                text: '4.4、已填入预约信息'
              },
              {
                path: '/page45',
                text: '4.5、预约成功提'
              },
              {
                path: '/page51',
                text: '5.1、展示礼品兑换码'
              },
              {
                path: '/page52',
                text: '5.2、礼品兑换码已核销'
              },
              {
                path: '/page42',
                text: '4.2、预约兑换-未填入预约信息'
              },
              {
                path: '/page43',
                text: '4.3、选择预约门店'
              },
              {
                path: '/page44',
                text: '4.4、已填入预约信息'
              },
              {
                path: '/page61',
                text: '6.1、朋友收到助力邀请'
              },
              {
                path: '/page621',
                text: '6.2.1、助力者打开邀请助力链接'
              },
              {
                path: '/page622',
                text: '6.2.2、已完成助力者再次打开邀请助力链接'
              },
              {
                path: '/page623',
                text: '6.2.3、分享者自己打开邀请助力链接'
              },
              {
                path: '/page631',
                text: '6.3.1、助力者完成助力-助力成功'
              },
              {
                path: '/page632',
                text: '6.3.2、助力者完成助力-助力未成功'
              },
              {
                path: '/page64',
                text: '6.4、助力者领券成功'
              },
              {
                path: '/page65',
                text: '6.5、助力者已领取助力奖励'
              }
            ]
          },
          {
            'name': '弹窗',
            'shortcut': 'Popup',
            'items': [
              {
                path: '/popup',
                text: 'Popup'
              },
              {
                path: '/toast',
                text: 'Toast'
              },

              {
                path: '/picker',
                text: 'Picker'
              },
              {
                path: '/cascade-picker',
                text: 'CascadePicker'
              },
              {
                path: '/segment-picker',
                text: 'SegmentPicker'
              },
              {
                path: '/date-picker',
                text: 'DatePicker'
              },
              {
                path: '/time-picker',
                text: 'TimePicker'
              },
              {
                path: '/dialog',
                text: 'Dialog'
              },
              {
                path: '/action-sheet',
                text: 'ActionSheet'
              },
              {
                path: '/drawer',
                text: 'Drawer'
              },
              {
                path: '/image-preview',
                text: 'ImagePreview'
              }
            ]
          },
          {
            'name': 'Form 表单组件',
            'shortcut': 'Form',
            'items': [
              {
                path: '/checkbox',
                text: 'Checkbox'
              },
              {
                path: '/checkbox-group',
                text: 'CheckboxGroup'
              },
              {
                path: '/checker',
                text: 'Checker'
              },
              {
                path: '/radio',
                text: 'Radio'
              },
              {
                path: '/input',
                text: 'Input'
              },
              {
                path: '/textarea',
                text: 'Textarea'
              },
              {
                path: '/select',
                text: 'Select'
              },
              {
                path: '/switch',
                text: 'Switch'
              },
              {
                path: '/rate',
                text: 'Rate'
              },
              {
                path: '/validator',
                text: 'Validator'
              },
              {
                path: '/upload',
                text: 'Upload'
              },
              {
                path: '/form',
                text: 'Form'
              }
            ]
          },
          {
            'name': 'Scroll 滚动组件',
            'shortcut': 'Scroll',
            'items': [
              {
                path: '/scroll',
                text: 'Scroll'
              },
              {
                path: '/slide',
                text: 'Slide'
              },
              {
                path: '/index-list',
                text: 'IndexList'
              },
              {
                path: '/swipe',
                text: 'Swipe'
              },
              {
                path: '/sticky',
                text: 'Sticky'
              },
              {
                path: '/scroll-nav-bar',
                text: 'ScrollNavBar'
              },
              {
                path: '/scroll-nav',
                text: 'ScrollNav'
              },
              {
                path: '/recycle-list',
                text: 'RecycleList'
              }
            ]
          }
        ]
      }
    },
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
        box-shadow: 0 0 5px #80808047
        >ul
          >li
            padding: 8px 0
      .c-index-list-fixed
        font-size: 24px
</style>
