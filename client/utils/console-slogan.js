/**
 * @file console.solgan / ES module
 * @module utils/console-slogan
 */

import { isBrowser, isProdMode } from '~/environment'

export default () => {
  if (isBrowser && isProdMode) {
    console.clear()
    console.log('%cChinese New Year Chinauff activity %cbasil', 'color:#666;font-size:3em;', 'color:#666;font-size:13px;')
  }
}
