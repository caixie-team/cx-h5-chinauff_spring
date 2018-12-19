<template>
  <div>
    <a
      href="javascript:;"
      @click="showme">测试单击事件</a>
  </div>
</template>
<script>
  export default {
    methods: {
      showme() {
        alert('who am i...')
        console.log('who ami .....')
      }

    }
  }
</script>
