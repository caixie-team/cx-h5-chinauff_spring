import { isBrowser } from '~/environment'
import WechatJSSDK from 'wechat-jssdk/lib/client'

// export default WechatJSSDK
if (isBrowser) {
  window.WechatJSSDK = WechatJSSDK
}
