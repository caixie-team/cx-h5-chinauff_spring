<template>
  <transition name="c-picker-fade">
    <!-- Transition animation need use with v-show in the same template. -->
    <c-popup
      v-show="isVisible"
      :mask="true"
      :center="false"
      :z-index="zIndex"
      type="picker"
      @touchmove.prevent
      @mask-click="maskClick">
      <transition name="c-picker-move">
        <div
          v-show="isVisible"
          class="c-picker-panel c-safe-area-pb"
          @click.stop>
          <div class="c-picker-choose border-bottom-1px">
            <span
              class="c-picker-cancel"
              @click="cancel">{{ _cancelTxt }}</span>
            <span
              class="c-picker-confirm"
              @click="confirm">{{ _confirmTxt }}</span>
            <div class="c-picker-title-group">
              <h1
                class="c-picker-title"
                v-html="title"/>
              <h2
                v-if="subtitle"
                class="c-picker-subtitle"
                v-html="subtitle"/>
            </div>
          </div>

          <div class="c-picker-content">
            <i class="border-bottom-1px"/>
            <i class="border-top-1px"/>
            <div
              ref="wheelWrapper"
              class="c-picker-wheel-wrapper">
              <div
                v-for="(data,index) in finalData"
                :key="index">
                <!-- The class name of the ul and li need be configured to BetterScroll. -->
                <ul class="c-picker-wheel-scroll">
                  <li
                    v-for="(item,index) in data"
                    :key="index"
                    class="c-picker-wheel-item"
                    v-html="item[textKey]"/>
                </ul>
              </div>
            </div>
          </div>

          <div class="c-picker-footer"/>
        </div>
      </transition>
    </c-popup>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import CPopup from '../popup/popup.vue'
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'
  import basicPickerMixin from '../../common/mixins/basic-picker'
  import pickerMixin from '../../common/mixins/picker'
  import localeMixin from '../../common/mixins/locale'

  const COMPONENT_NAME = 'c-picker'

  const EVENT_SELECT = 'select'
  const EVENT_VALUE_CHANGE = 'value-change'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CHANGE = 'change'

  export default {
    name: COMPONENT_NAME,
    components: {
      CPopup
    },
    mixins: [visibilityMixin, popupMixin, basicPickerMixin, pickerMixin, localeMixin],
    props: {
      pending: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        finalData: this.data.slice()
      }
    },
    created() {
      this._values = []
      this._indexes = this.selectedIndex
    },
    beforeDestroy() {
      this.wheels && this.wheels.forEach((wheel) => {
        wheel.destroy()
      })
      this.wheels = null
    },
    methods: {
      confirm() {
        if (!this._canConfirm()) {
          return
        }
        this.hide()

        let changed = false
        const pickerSelectedText = []

        const length = this.finalData.length
        const oldLength = this._values.length

        // when column count has changed.
        if (oldLength !== length) {
          changed = true
          oldLength > length && (this._values.length = this._indexes.length = length)
        }

        for (let i = 0; i < length; i++) {
          const index = this.wheels[i].getSelectedIndex()
          this._indexes[i] = index

          let value = null
          let text = ''
          if (this.finalData[i].length) {
            value = this.finalData[i][index][this.valueKey]
            text = this.finalData[i][index][this.textKey]
          }
          if (this._values[i] !== value) {
            changed = true
          }
          this._values[i] = value
          pickerSelectedText[i] = text
        }

        this.$emit(EVENT_SELECT, this._values, this._indexes, pickerSelectedText)

        if (changed) {
          this.$emit(EVENT_VALUE_CHANGE, this._values, this._indexes, pickerSelectedText)
        }
      },
      maskClick() {
        this.maskClosable && this.cancel()
      },
      cancel() {
        this.hide()
        this.$emit(EVENT_CANCEL)
      },
      show() {
        if (this.isVisible) {
          return
        }

        this.isVisible = true
        if (!this.wheels || this.dirty) {
          this.$nextTick(() => {
            this.wheels = this.wheels || []
            const wheelWrapper = this.$refs.wheelWrapper
            for (let i = 0; i < this.finalData.length; i++) {
              this._createWheel(wheelWrapper, i).enable()
              this.wheels[i].wheelTo(this._indexes[i])
            }
            this.dirty && this._destroyExtraWheels()
            this.dirty = false
          })
        } else {
          for (let i = 0; i < this.finalData.length; i++) {
            this.wheels[i].enable()
            this.wheels[i].wheelTo(this._indexes[i])
          }
        }
      },
      hide() {
        if (!this.isVisible) {
          return
        }
        this.isVisible = false

        for (let i = 0; i < this.finalData.length; i++) {
          this.wheels[i].disable()
        }
      },
      setData(data, selectedIndex) {
        this._indexes = selectedIndex ? [...selectedIndex] : []
        this.finalData = data.slice()
        if (this.isVisible) {
          this.$nextTick(() => {
            const wheelWrapper = this.$refs.wheelWrapper
            this.finalData.forEach((item, i) => {
              this._createWheel(wheelWrapper, i)
              this.wheels[i].wheelTo(this._indexes[i])
            })
            this._destroyExtraWheels()
          })
        } else {
          this.dirty = true
        }
      },
      refill(datas) {
        const ret = []
        if (!datas.length) {
          return ret
        }
        datas.forEach((data, index) => {
          ret[index] = this.refillColumn(index, data)
        })
        return ret
      },
      refillColumn(index, data) {
        const wheelWrapper = this.$refs.wheelWrapper
        const scroll = wheelWrapper.children[index].querySelector('.c-picker-wheel-scroll')
        let wheel = this.wheels ? this.wheels[index] : false
        let dist = 0
        if (scroll && wheel) {
          const oldData = this.finalData[index]
          this.$set(this.finalData, index, data)
          const selectedIndex = wheel.getSelectedIndex()
          if (oldData.length) {
            const oldValue = oldData[selectedIndex][this.valueKey]
            for (let i = 0; i < data.length; i++) {
              if (data[i][this.valueKey] === oldValue) {
                dist = i
                break
              }
            }
          }
          this._indexes[index] = dist
          this.$nextTick(() => {
            // recreate wheel so that the wrapperHeight will be correct.
            wheel = this._createWheel(wheelWrapper, index)
            wheel.wheelTo(dist)
          })
        }
        return dist
      },
      scrollTo(index, dist) {
        const wheel = this.wheels[index]
        this._indexes[index] = dist
        wheel.wheelTo(dist)
      },
      refresh() {
        this.$nextTick(() => {
          this.wheels.forEach((wheel) => {
            wheel.refresh()
          })
        })
      },
      _createWheel(wheelWrapper, i) {
        if (!this.wheels[i]) {
          const wheel = this.wheels[i] = new BScroll(wheelWrapper.children[i], {
            wheel: {
              selectedIndex: this._indexes[i] || 0,
              wheelWrapperClass: 'c-picker-wheel-scroll',
              wheelItemClass: 'c-picker-wheel-item'
            },
            swipeTime: this.swipeTime,
            observeDOM: false
          })
          wheel.on('scrollEnd', () => {
            this.$emit(EVENT_CHANGE, i, wheel.getSelectedIndex())
          })
        } else {
          this.wheels[i].refresh()
        }
        return this.wheels[i]
      },
      _destroyExtraWheels() {
        const dataLength = this.finalData.length
        if (this.wheels.length > dataLength) {
          const extraWheels = this.wheels.splice(dataLength)
          extraWheels.forEach((wheel) => {
            wheel.destroy()
          })
        }
      },
      _canConfirm() {
        return !this.pending && this.wheels.every((wheel) => {
          return !wheel.isInTransition
        })
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/mixin.styl"*/
  /*@require "../../common/stylus/variable.styl"*/

  $picker-lr-padding = 32px

  .c-picker-fade-enter, .c-picker-fade-leave-active
    opacity: 0

  .c-picker-fade-enter-active, .c-picker-fade-leave-active
    transition: all .3s ease-in-out

  .c-picker-panel
    height: 480px
    text-align: center
    font-size: $fontsize-large-xx
    background: $picker-bgc
    width: 100%
  .c-picker-move-enter, .c-picker-move-leave-active
    transform: translate3d(0, 100%, 0)

  .c-picker-move-enter-active, .c-picker-move-leave-active
    transition: all .3s ease-in-out

  .c-picker-choose
    position: relative
    height: 80px

  .c-picker-confirm, .c-picker-cancel
    font-size: $fontsize-large-xxx
    line-height: 80px
    padding: 0 $picker-lr-padding
    box-sizing: content-box

  .c-picker-confirm
    position: absolute
    right: 0
    color: $picker-confirm-btn-color
    &:active
      color: $picker-confirm-btn-active-color

  .c-picker-cancel
    position: absolute
    left: 0
    color: $picker-cancel-btn-color
    &:active
      color: $picker-cancel-btn-active-color

  .c-picker-title-group
    padding: 0 60px
    display: flex
    height: 100%
    flex-flow: column
    justify-content: center
    text-align: center

  .c-picker-title
    font-size: $fontsize-large-xxx
    line-height: 25px
    font-weight: normal
    color: $picker-title-color

  .c-picker-subtitle
    margin-top: 2px
    line-height: 16px
    font-size: $fontsize-medium
    color: $picker-subtitle-color

  .c-picker-content
    position: relative
    top: 40px
    > i
      position: absolute
      z-index: 10
      left: 0
      width: 100%
      height: 120px
      pointer-events: none
      transform: translateZ(0)
    > .border-bottom-1px
      top: 0
      background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8))
    > .border-top-1px
      bottom: 0
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8))

  .c-picker-wheel-wrapper
    display: flex
    padding: 0 $picker-lr-padding
    > div
      flex-fix()
      height: 290px
      overflow: hidden
      font-size: $fontsize-large-xxx

  .c-picker-wheel-scroll
    padding: 0
    margin-top: 128px
    line-height: 40px
    list-style: none

  .c-picker-wheel-item
    list-style: none
    height: 42px
    font-size: $fontsize-large-xxx
    overflow: hidden
    white-space: nowrap
    color: $picker-item-color

  .c-picker-footer
    height: 40px
</style>
