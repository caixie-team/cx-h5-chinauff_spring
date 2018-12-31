<template>
  <form
    ref="form"
    :class="formClass"
    :action="action"
    class="c-form"
    @submit="submitHandler"
    @reset="resetHandler">
    <slot>
      <c-form-group
        v-for="(group, index) in groups"
        :fields="group.fields"
        :legend="group.legend"
        :key="index"/>
    </slot>
  </form>
</template>

<script>
  import {dispatchEvent} from '../../common/helpers/dom'
  import {cb2PromiseWithResolve} from '../../common/helpers/util'
  import CubeFormGroup from './form-group.vue'
  import LAYOUTS from './layouts'
  import mixin from './mixin'

  const COMPONENT_NAME = 'c-form'
  const EVENT_SUBMIT = 'submit'
  const EVENT_RESET = 'reset'
  const EVENT_VALIDATE = 'validate'
  const EVENT_VALID = 'valid'
  const EVENT_INVALID = 'invalid'

  export default {
    name: COMPONENT_NAME,
    components: {
      CubeFormGroup
    },
    mixins: [mixin],
    props: {
      action: {type: String, default: ''},
      model: {
        type: Object,
        default () {
          /* istanbul ignore next */
          return {}
        }
      },
      schema: {
        type: Object,
        default () {
          /* istanbul ignore next */
          return {}
        }
      },
      options: {
        type: Object,
        default () {
          return {
            scrollToInvalidField: false,
            layout: LAYOUTS.STANDARD
          }
        }
      },
      immediateValidate: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        validatedCount: 0,
        dirty: false,
        firstInvalidField: null,
        firstInvalidFieldIndex: -1
      }
    },
    computed: {
      groups () {
        const schema = this.schema
        const groups = schema.groups || []
        if (schema.fields) {
          groups.unshift({
            fields: schema.fields
          })
        }
        return groups
      },
      layout () {
        const options = this.options
        const layout = (options && options.layout) || LAYOUTS.STANDARD
        return layout
      },
      formClass () {
        const invalid = this.invalid
        const valid = this.valid
        const layout = this.layout
        return {
          'c-form_standard': layout === LAYOUTS.STANDARD,
          'c-form_groups': this.groups.length > 1,
          'c-form_validating': this.validating,
          'c-form_pending': this.pending,
          'c-form_valid': valid,
          'c-form_invalid': invalid,
          'c-form_classic': layout === LAYOUTS.CLASSIC,
          'c-form_fresh': layout === LAYOUTS.FRESH
        }
      }
    },
    watch: {
      validatedCount () {
        this.$emit(EVENT_VALIDATE, {
          validity: this.validity,
          valid: this.valid,
          invalid: this.invalid,
          dirty: this.dirty,
          firstInvalidFieldIndex: this.firstInvalidFieldIndex
        })
      }
    },
    beforeCreate () {
      this.form = this
      this.fields = []
      this.validity = {}
    },
    mounted () {
      if (this.immediateValidate) {
        this.validate()
      }
    },
    beforeDestroy () {
      this.form = null
      this.firstInvalidField = null
    },
    methods: {
      submit (skipValidate = false) {
        this.skipValidate = skipValidate
        dispatchEvent(this.$refs.form, 'submit')
        this.skipValidate = false
      },
      reset () {
        dispatchEvent(this.$refs.form, 'reset')
      },
      submitHandler (e) {
        if (this.skipValidate) {
          this.$emit(EVENT_SUBMIT, e, this.model)
          return
        }
        const submited = (submitResult) => {
          if (submitResult) {
            this.$emit(EVENT_VALID, this.validity)
            this.$emit(EVENT_SUBMIT, e, this.model)
          } else {
            e.preventDefault()
            this.$emit(EVENT_INVALID, this.validity)
          }
        }
        if (this.valid === undefined) {
          this._submit(submited)
          if (this.validating || this.pending) {
            // async validate
            e.preventDefault()
          }
        } else {
          submited(this.valid)
        }
      },
      resetHandler (e) {
        this._reset()
        this.$emit(EVENT_RESET, e)
      },
      _submit (cb) {
        this.validate(() => {
          if (this.invalid) {
            if (this.options.scrollToInvalidField && this.firstInvalidField) {
              this.firstInvalidField.$el.scrollIntoView()
            }
          }
          cb && cb(this.valid)
        })
      },
      _reset () {
        this.fields.forEach((fieldComponent) => {
          fieldComponent.reset()
        })
        this.setValidity()
        this.setValidating()
        this.setPending()
      },
      validate (cb) {
        const promise = cb2PromiseWithResolve(cb)
        if (promise) {
          cb = promise.resolve
        }
        let doneCount = 0
        const len = this.fields.length
        this.originValid = undefined
        this.fields.forEach((fieldComponent) => {
          fieldComponent.validate(() => {
            doneCount++
            if (doneCount === len) {
              // all done
              cb && cb(this.valid)
            }
          })
        })
        return promise
      },
      updateValidating () {
        const validating = this.fields.some((fieldComponent) => fieldComponent.validating)
        this.setValidating(validating)
      },
      updatePending () {
        const pending = this.fields.some((fieldComponent) => fieldComponent.pending)
        this.setPending(pending)
      },
      setValidating (validating = false) {
        this.validating = validating
      },
      setPending (pending = false) {
        this.pending = pending
      },
      updateValidity (modelKey, valid, result, dirty) {
        const curResult = this.validity[modelKey]
        if (curResult && curResult.valid === valid && curResult.result === result && curResult.dirty === dirty) {
          return
        }
        this.setValidity(modelKey, {
          valid,
          result,
          dirty
        })
      },
      setValidity (key, val) {
        const validity = {}
        if (key) {
          Object.assign(validity, this.validity)
          if (val === undefined) {
            delete validity[key]
          } else {
            validity[key] = val
          }
        }

        let dirty = false
        let invalid = false
        let valid = true
        let firstInvalidFieldKey = ''
        this.fields.forEach((fieldComponent) => {
          const modelKey = fieldComponent.fieldValue.modelKey
          if (modelKey) {
            const retVal = validity[modelKey]
            if (retVal) {
              if (retVal.dirty) {
                dirty = true
              }
              if (retVal.valid === false) {
                valid = false
              } else if (valid && !retVal.valid) {
                valid = retVal.valid
              }

              if (!invalid && retVal.valid === false) {
                // invalid
                invalid = true
                firstInvalidFieldKey = modelKey
              }
            } else if (fieldComponent.hasRules) {
              if (valid) {
                valid = undefined
              }
              validity[modelKey] = {
                valid: undefined,
                result: {},
                dirty: false
              }
            }
          }
        })
        this.validity = validity
        this.dirty = dirty
        this.originValid = valid
        this.setFirstInvalid(firstInvalidFieldKey)
        this.validatedCount++
      },
      setFirstInvalid (key) {
        if (!key) {
          this.firstInvalidField = null
          this.firstInvalidFieldIndex = -1
          return
        }
        this.fields.some(callback)

        const callback = function (fieldComponent, index) {
          if (fieldComponent.fieldValue.modelKey === key) {
            this.firstInvalidField = fieldComponent
            this.firstInvalidFieldIndex = index
            // return true
          }
        };
      },
      addField (fieldComponent) {
        this.fields.push(fieldComponent)
      },
      destroyField (fieldComponent) {
        const i = this.fields.indexOf(fieldComponent)
        this.fields.splice(i, 1)
        this.setValidity(fieldComponent.fieldValue.modelKey)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/

  .c-form
    position: relative
    font-size: $fontsize-large
    line-height: 1.429
    color: $form-color
    background-color: $form-bgc

  .c-form_groups
    .c-form-group-legend
      padding: 10px 15px

      &:empty
        padding-top: 5px
        padding-bottom: 5px

  .c-form_standard
    .c-form-item
      min-height: 46px

    .c-form-field
      flex: 1
      font-size: $fontsize-medium

    .c-validator
      display: flex
      align-items: center
      position: relative

    .c-validator_invalid
      color: $form-invalid-color

    .c-validator-content
      flex: 1

    .c-validator-msg-def
      font-size: 0

    .c-validator_invalid
      .c-validator-msg
        &::before
          content: "\e614"
          padding-left: 5px
          font-family: "c-icon" !important
          font-size: $fontsize-large-xx
          font-style: normal
          -webkit-font-smoothing: antialiased
          -webkit-text-stroke-width: 0.2px
          -moz-osx-font-smoothing: grayscale

    .c-form-label
      width: 100px
      padding-right: 10px

    .c-checkbox-group, .c-radio-group
      &::before, &::after
        display: none

    .c-input
      input
        padding: 13px 0
        background-color: transparent

      &::after
        display: none

    .c-textarea-wrapper
      padding: 13px 0
      height: 20px

      &.c-textarea_expanded
        height: 60px
        padding-bottom: 20px

        .c-textarea-indicator
          bottom: 2px

      .c-textarea
        padding: 0
        background-color: transparent

      &::after
        display: none

    .c-select
      padding-left: 0
      background-color: transparent

      &::after
        display: none

    .c-upload-def
      padding: 5px 0

      .c-upload-btn, .c-upload-file
        margin: 5px 10px 5px 0

  .c-form_classic
    .c-form-item
      display: block
      padding: 15px

      &:last-child
        padding-bottom: 30px

      &::after
        display: none

      .c-validator-msg
        position: absolute
        margin-top: 3px

        &::before
          display: none

      .c-validator-msg-def
        font-size: $fontsize-small

    .c-form-item_btn
      padding-top: 0
      padding-bottom: 0

      &:last-child
        padding-bottom: 0

    .c-form-label
      padding-bottom: 15px

  .c-form_fresh
    .c-form-item
      display: block
      padding: 2em 15px 10px

      &::after
        display: none

      .c-validator-msg
        position: absolute
        top: 1em
        right: 15px
        bottom: auto
        margin-top: -.4em
        font-size: $fontsize-small

        &::before
          display: none

      .c-validator-msg-def
        font-size: 100%

    .c-form-item_btn
      padding-top: 0
      padding-bottom: 0

      &:last-child
        padding-bottom: 0

    .c-form-label
      position: absolute
      top: 1em
      margin-top: -.4em
      font-size: $fontsize-small
</style>
