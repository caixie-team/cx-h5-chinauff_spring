import { isBrowser } from '~/environment_es'
import WechatJSSDK from 'wechat-jssdk/lib/client'

// export default WechatJSSDK
if (isBrowser) {
  window.WechatJSSDK = WechatJSSDK
}
