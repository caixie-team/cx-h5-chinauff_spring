import objectToFormData from 'object-to-formdata'
import Cookies from './cookies'

// Source: http://stackoverflow.com/a/2117523/1177228
// With adaptions from: http://stackoverflow.com/a/24203297/123048
// 下面的这个是修改版本，为了便于理解 我们这里做的是逐位运算:
//
// 首先是a，位级别为11(截断到最后两个位，即%4)，
//
// 然后a或1000(设置1位，加8)。
// cookies

const config = {
  urlPrefix: '',
  visitsUrl: '/ahoy/visits',
  eventsUrl: '/ahoy/events',
  cookieDomain: null,
  page: null,
  platform: 'Web',
  useBeacon: true,
  startOnReady: true,
  trackVisits: true,
  cookies: true
}

const setCookie = (name, value, ttl) => {
  Cookies.set(name, value, ttl, config.cookieDomain || config.domain)
}

const getCookie = (name) => (Cookies.get(name))

const destroyCookie = (name) => {
  Cookies.set(name, '', -1)
}
const log = (message) => {
  if (getCookie('ahoy_debug')) {
    // window.console.log(message)
  }
}

const generateId = function() {
  const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

  return guid
    .replace(/x/g, () => (Math.random() * 16 || 0).toString(16))
    .replace(/y/, () => ((Math.random() * 4) + 8 || 0).toString(16))
}

const matchesSelector = function(element, selector) {
  const matches = element.matches ||
    element.matchesSelector ||
    element.mozMatchesSelector ||
    element.msMatchesSelector ||
    element.oMatchesSelector ||
    element.webkitMatchesSelector

  if (matches) {
    return matches.apply(element, [selector])
  } else {
    log('Unable to match')
    return false
  }
}

