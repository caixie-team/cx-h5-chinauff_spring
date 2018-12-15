import ahoy from '~/lib/ahoy'
// ahoy.configure({
//   urlPrefix: 'http://backoffice.caixie.top',
//   visitsUrl: '/analytics/visits',
//   eventsUrl: '/analytics/events',
//   cookieDomain: null,
//   page: null,
//   platform: 'Web',
//   useBeacon: false,
//   startOnReady: true,
//   trackVisits: true
// })
import { isBrowser, isServer } from '~/environment'
// const apiConfig = require('/api.config')
import { baseUrl } from '~/api.config'

if (isBrowser) {
// ahoy.configure({
  // cookieDomain: 'ourdomain.com',
  // urlPrefix: '',
  // visitsUrl: baseUrl + '/analytics/visits',
  // eventsUrl: baseUrl + '/analytics/events',
  // cookieDomain: null,
  // page: null,
  // platform: 'Web',
  // useBeacon: false,
  // startOnReady: true,
  // trackVisits: true
// })

    // window.onNuxtReady((app) => {
      ahoy.trackAll()
    // })
}
