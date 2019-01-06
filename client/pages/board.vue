<template>
  <div>
    <h1>弹窗...</h1>
    <a
      class="link c-btn"
      @click="showDialog('intro')">
      活动介绍
    </a>
    <a
      class="link c-btn"
      @click="showDialog('limit', {showClose: true})">
      今日可参与次数已用完
    </a>
    <br>
    <a
      class="link c-btn"
      @click="showDialog('share')">
      分享给好友
    </a>
    <a
      class="link c-btn"
      @click="showDialog('prize', { word: 'kou', coupon: 'mianfei'})">
      恭喜你集到
    </a>
    <a
      class="link c-btn"
      @click="showDialog('jdfl')">
      2.6.2 弹窗(恭喜你集到福啦)
    </a>
    <a
      class="link c-btn"
      @click="showDialog('prize', {coupon: 'qizhe'})">
      未集到
    </a>
    <a
      class="link c-btn"
      @click="showDialog('success', {showClose: false})">
      领取成功
    </a>

    <h1>
      页面...
    </h1>
    <nuxt-link
      v-for="page in pages"
      :to="page.link"
      :key="page.id"
      class="link c-btn">
      {{ page.title }}
    </nuxt-link>
  </div>
</template>

<script>
  import titleImg from '~/assets/images/text/jifuyoli.png'
  import {has} from 'lodash'

  export default {

    data () {
      return {
        pages: [{
          id: '1.1',
          title: '集福首页',
          link: '/'
        }, {
          id: '2.1',
          title: '2.1、AR界面：扫一扫操作',
          link: ''
        }, {
          id: '2.2',
          title: '2.2、AR界面：扫描成功后动画，可跳过',
          link: ''
        }, {
          id: '2.3',
          title: '2.3、扫描结果，需要点击查看',
          link: ''
        }, {
          id: '2.4.1',
          title: '2.4.1、提示集到的字和券-有字',
          link: ''
        }, {
          id: '2.4.2',
          title: '2.4.2、提示集到的字和券-无字',
          link: ''
        }, {
          id: '2.5',
          title: '2.5、AR界面：领取成功弹窗提示',
          link: ''
        }, {
          id: '2.6.1',
          title: '2.6.1、领取完成后页面-有字',
          link: '/page261'
        }, {
          id: '2.6.2',
          title: '2.6.2、有福集满，则弹窗提示，动画效果',
          link: ''
        }, {
          id: '2.6.3',
          title: '2.6.3、领取完成后页面-无字',
          link: '/page263'
        }, {
          id: '2.7',
          title: '2.7、选择分享途径',
          link: ''
        }, {
          id: '3.1.1',
          title: '3.1.1、我的福包-满福-可预约',
          link: '/page311'
        }, {
          id: '3.1.2',
          title: '3.1.2、我的福包-满福-已预约可兑换',
          link: ''
        }, {
          id: '3.1.3',
          title: '3.1.3、我的福包-满福-已兑换',
          link: ''
        }, {
          id: '3.1.4',
          title: '3.1.4、我的福包-无满福',
          link: ''
        }, {
          id: '4.1',
          title: '4.1、预约兑换-未填入预约信息',
          link: ''
        }, {
          id: '4.2',
          title: '4.2、预约兑换-未填入预约信息',
          link: ''
        }, {
          id: '4.3',
          title: '4.3、选择预约门店',
          link: ''
        }, {
          id: '4.4',
          title: '4.4、已填入预约信息',
          link: ''
        }, {
          id: '4.5',
          title: '4.5、预约成功提示',
          link: ''
        }, {
          id: '5.1',
          title: '5.1、展示礼品兑换码',
          link: ''
        }, {
          id: '5.2',
          title: '5.2、礼品兑换码已核销',
          link: ''
        }, {
          id: '6.1',
          title: '6.1、朋友收到助力邀请',
          link: ''
        }, {
          id: '6.2.1',
          title: '6.2.1、助力者打开邀请助力链接',
          link: ''
        }, {
          id: '6.2.2',
          title: '6.2.2、已完成助力者再次打开邀请助力链接',
          link: ''
        }, {
          id: '6.2.3',
          title: '6.2.3、分享者自己打开邀请助力链接',
          link: ''
        }, {
          id: '6.3.1',
          title: '6.3.1、助力者完成助力-助力成功',
          link: ''
        }, {
          id: '6.3.2',
          title: '6.3.2、助力者完成助力-助力未成功',
          link: ''
        }, {
          id: '6.4',
          title: '6.4、助力者领券成功',
          link: ''
        }, {
          id: '6.5',
          title: '6.5、助力者已领取助力奖励',
          link: ''
        }]
      }
    },
    methods: {
      showDialog (type, option) {
        this.dialog = this.$createDialog({
          type: type,
          word: has(option, 'word') ? option.word : '',
          coupon: has(option, 'coupon') ? option.coupon : '',
          showClose: has(option, 'showClose') ? option.showClose : true
        })
        this.dialog.show()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .c-btn
    display: block
    padding: 17px 16px
    width: 100%
    margin: 10px
    text-align: center
    white-space: nowrap
    cursor: pointer
    font-size: $fontsize-large
    line-height: 1
    color: $btn-color
    background: $btn-bgc
    border-radius: 2px
    box-sizing: border-box
    -webkit-tap-highlight-color: transparent
    btn-active($btn-active-bgc)
</style>
