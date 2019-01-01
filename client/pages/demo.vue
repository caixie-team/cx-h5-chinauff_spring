<template>
  <div>
    <h1> 兑换页</h1>
    <a
      href="#"
      @click="clickHandler"/>
  </div>
</template>
<script>
  export default {
    head () {
      return {
        title: '兑换福利'
      }
    },
    methods: {
      clickHandler () {
        alert('点击事件')
      }
    }
  }
</script>
