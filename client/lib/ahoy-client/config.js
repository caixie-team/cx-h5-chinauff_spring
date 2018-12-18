// export default {
//   urlPrefix: '',
//   visitsUrl: '/ahoy/visits',
//   visitTtl: 4 * 60, // 4 hours
//   visitorTtl: 2 * 365 * 24 * 60, // 2 years
//   eventsUrl: '/ahoy/events',
//   cookieDomain: null,
//   page: null,
//   platform: 'Web',
//   useBeacon: false,
//   startOnReady: true,
// };

const config = {
  urlPrefix: '',
  visitsUrl: '/ahoy/visits',
  visitTtl: 4 * 60, // 4 hours
  visitorTtl: 2 * 365 * 24 * 60, // 2 years
  eventsUrl: '/ahoy/events',
  cookieDomain: null,
  page: null,
  platform: 'Web',
  useBeacon: true,
  startOnReady: true,
  trackVisits: true,
  cookies: true
}

export default config

