<template>
  <div class="page-content">
    <slot/>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .page-content
    width: 412px
    height: 688px
    overflow: hidden
    background: url('~assets/img/bg/popup_bg_big.png') no-repeat
    background-size: 412px 688px
    display: flex
    flex-direction: column
    text-align: center
    align-items: center
</style>
