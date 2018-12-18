import Dialog from '../../components/dialog/dialog.vue'
// import Locale from '../../common/locale'
import Input from '../../components/input/input.vue'
import addDialog from './api'

console.log('add Diaglog...')
Dialog.install = function (Vue) {
  console.log('dialog install')
  Vue.component(Input.name, Input)
  Vue.component(Dialog.name, Dialog)
  // Locale.install(Vue)
  addDialog(Vue, Dialog)
}

Dialog.Input = Input

export default Dialog
