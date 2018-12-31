import CButton from '../button/button.vue'
import CCheckbox from '../checkbox/checkbox.vue'
import CCheckboxGroup from '../checkbox-group/checkbox-group.vue'
import CChecker from '../checker/checker.vue'
import CInput from '../input/input.vue'
import CRadio from '../radio/radio.vue'
import CRadioGroup from '../radio/radio-group.vue'
import CRate from '../rate/rate.vue'
import CSelect from '../select/select.vue'
import CSwitch from '../switch/switch.vue'
import CTextarea from '../textarea/textarea.vue'
import CUpload from '../upload/upload.vue'

const allComponents = [
  CButton,
  CCheckbox,
  CCheckboxGroup,
  CChecker,
  CInput,
  CRadio,
  CRadioGroup,
  CRate,
  CSelect,
  CSwitch,
  CTextarea,
  CUpload
]

const components = {}
allComponents.forEach((Component) => {
  components[Component.name] = Component
})

export default components
