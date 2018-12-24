/* eslint-disable func-style */
import { isBrowser, isServer } from '~/environment'
import Vue from 'vue'

import {
  /* eslint-disable no-unused-vars */
  // Style,
  // locale
  Locale,
  // basic
  // Button,
  // Loading,
  // Tip,
  // Toolbar,
  // TabBar,
  // TabPanels,
  // form
  // Checkbox,
  // CheckboxGroup,
  // Checker,
  // Radio,
  // RadioGroup,
  Input,
  // Textarea,
  // Select,
  // Switch,
  // Rate,
  // Validator,
  // Upload,
  // Form,
  // popup
  Popup,
  // Toast,
  Picker,
  CascadePicker,
  DatePicker,
  // TimePicker,
  // SegmentPicker,
  Dialog,
  // ActionSheet,
  // Drawer,
  // ImagePreview,
  // scroll
  Scroll,
  Slide,
  IndexList,
  // Swipe,
  // Sticky,
  // ScrollNav,
  // ScrollNavBar,
  // RecycleList,
  // module
  BetterScroll,
  createAPI
} from '../modules/module'
import { processComponentName } from '../common/helpers/util'

const components = [
  // locale
  Locale,
  // basic
  // Button,
  // Loading,
  // Tip,
  // Toolbar,
  // TabBar,
  // TabPanels,
  // form
  // Checkbox,
  // CheckboxGroup,
  // Checker,
  // Radio,
  // RadioGroup,
  Input,
  // Textarea,
  // Select,
  // Switch,
  // Rate,
  // Validator,
  // Upload,
  // Form,
  // popup
  Popup,
  // Toast,
  Picker,
  CascadePicker,
  DatePicker,
  // TimePicker,
  // SegmentPicker,
  Dialog,
  // ActionSheet,
  // Drawer,
  // ImagePreview,
  // scroll
  Scroll,
  Slide,
  IndexList,
  // Swipe,
  // Sticky,
  // ScrollNav,
  // ScrollNavBar,
  // RecycleList
]

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  components.forEach((Component) => {
    // ignore radio
    // if (Component === Radio) {
    //   return
    // }
    Component.install(Vue)
  })
}

const C = {
  /* eslint-disable no-undef */
  // version: __VERSION__,
  install,
  BScroll: BetterScroll,
  createAPI
}

components.forEach((Component) => {
  const name = processComponentName(Component, {
    firstUpperCase: true
  })
  C[name] = Component
})
if (isBrowser) {
  // if (typeof window !== 'undefined' && window.Vue) {
    Vue.use(install)
  // }
}
export default C

