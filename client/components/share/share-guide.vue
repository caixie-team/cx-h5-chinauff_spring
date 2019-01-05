<template>
  <transition name="c-dialog-fade">
    <c-popup
      v-show="isVisible"
      :z-index="zIndex"
      :mask="true"
      :position="'top'"
      type="dialog"
      @mask-click="maskClick"
    >
      <div class="share guide">
        <img
          src="~assets/img/icon/icon_share.png"
          class="icon-share">
      </div>
    </c-popup>
  </transition>
</template>
<script>
  import CPopup from '../popup/popup.vue'
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'
  import EventBus from '~/utils/event-bus.js'

  // import localeMixin from '../../common/mixins/locale'
  export default {
    components: {
      CPopup,
    },
    mixins: [visibilityMixin, popupMixin],
    methods: {
      maskClick (e) {
        EventBus.$emit('share', false);
        this.hide()
        // this.$emit(EVENT_CLOSE, e)
        // this.maskClosable && this.cancel(e)
      },
      cancel (e) {
        // if (this._cancelBtn.disabled) {
        //   return
        // }
        // this.hide()
        // this.$emit(EVENT_CANCEL, e)
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .share.guide
    position: relative
    height: 100px
    width: 100%
    display: flex
    justify-content: flex-end
    .icon-share
      position: relative
      top: 10px
      right: 25px
      z-index: 1000
      width: 317px
      height: 92px
</style>
