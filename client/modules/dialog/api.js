import createAPI from '../../common/helpers/create-api'

export default function addDialog (Vue, Dialog) {
  console.log('create api dialog install')
  createAPI(Vue, Dialog, ['confirm', 'cancel', 'close', 'btn-click', 'link-click'], true)
}
