/* eslint-disable */
import objectToFormData from 'object-to-formdata'
import Cookies from './cookies'

const config = {
  urlPrefix: 'https://weixin.chinauff.com/spring/server/api',
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

const ahoy = window.ahoy || window.Ahoy || {}

ahoy.configure = function(options) {
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      config[key] = options[key]
    }
  }
}

// legacy
ahoy.configure(ahoy)

const $ = window.jQuery || window.Zepto || window.$
let track, visitId, visitorId
const visitTtl = 4 * 60 // 4 hours
const visitorTtl = 2 * 365 * 24 * 60 // 2 years
let isReady = false
const queue = []
const canStringify = typeof (JSON) !== 'undefined' && typeof (JSON.stringify) !== 'undefined'
let eventQueue = []

function visitsUrl () {
  return config.urlPrefix + config.visitsUrl
}

function eventsUrl () {
  return config.urlPrefix + config.eventsUrl
}

function canTrackNow () {
  return (config.useBeacon || config.trackNow) && canStringify && typeof (window.navigator.sendBeacon) !== 'undefined'
}

// cookies

function setCookie (name, value, ttl) {
  Cookies.set(name, value, ttl, config.cookieDomain || config.domain)
}

function getCookie (name) {
  return Cookies.get(name)
}

function destroyCookie (name) {
  Cookies.set(name, '', -1)
}

function log (message) {
  if (getCookie('ahoy_debug')) {
    window.console.log(message)
  }
}

function setReady () {
  let callback
  while ((callback = queue.shift())) {
    callback()
  }
  isReady = true
}

function ready (callback) {
  if (isReady) {
    callback()
  } else {
    queue.push(callback)
  }
}

function matchesSelector (element, selector) {
  const matches = element.matches ||
    element.matchesSelector ||
    element.mozMatchesSelector ||
    element.msMatchesSelector ||
    element.oMatchesSelector ||
    element.webkitMatchesSelector

  if (matches) {
    // return Reflect.apply(element, [selector])
    return matches.apply(element, [selector])
  } else {
    log('Unable to match')
    return false
  }
}

function onEvent (eventName, selector, callback) {
  document.addEventListener(eventName, function(e) {
    if (matchesSelector(e.target, selector)) {
      callback(e)
    }
  })
}

// http://beeker.io/jquery-document-ready-equivalent-vanilla-javascript
function documentReady (callback) {
  document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback)
}

// https://stackoverflow.com/a/2117523/1177228
function generateId () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0; const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function saveEventQueue () {
  if (config.cookies && canStringify) {
    setCookie('ahoy_events', JSON.stringify(eventQueue), 1)
  }
}

// from rails-ujs

function csrfToken () {
  const meta = document.querySelector('meta[name=csrf-token]')
  return meta && meta.content
}

function csrfParam () {
  const meta = document.querySelector('meta[name=csrf-param]')
  return meta && meta.content
}

function CSRFProtection (xhr) {
  const token = csrfToken()
  if (token) xhr.setRequestHeader('X-CSRF-Token', token)
}

function sendRequest (url, data, success) {
  if (canStringify) {
    if ($) {
      $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        beforeSend: CSRFProtection,
        success: success
      })
    } else {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onload = function() {
        if (xhr.status === 200) {
          success()
        }
      }
      CSRFProtection(xhr)
      xhr.send(JSON.stringify(data))
    }
  }
}

function eventData (event) {
  const data = {
    events: [event]
  }
  if (config.cookies) {
    data.visit_token = event.visit_token
    data.visitor_token = event.visitor_token
  }
  // Reflect.deleteProperty(event, 'visit_token')
  // Reflect.deleteProperty(event, 'visitor_token')
  delete event.visit_token
  delete event.visitor_token
  return data
}

function trackEvent (event) {
  ready(function() {
    sendRequest(eventsUrl(), eventData(event), function() {
      // remove from queue
      for (let i = 0; i < eventQueue.length; i++) {
        if (eventQueue[i].id == event.id) {
          eventQueue.splice(i, 1)
          break
        }
      }
      saveEventQueue()
    })
  })
}

function trackEventNow (event) {
  ready(function() {
    const data = eventData(event)
    const param = csrfParam()
    const token = csrfToken()
    if (param && token) data[param] = token
    // stringify so we keep the type
    data.events_json = JSON.stringify(data.events)
    // Reflect.deleteProperty(data, 'events')
    delete data.events
    window.navigator.sendBeacon(eventsUrl(), objectToFormData(data))
  })
}

function page () {
  return config.page || window.location.pathname
}

function presence (str) {
  return (str && str.length > 0) ? str : null
}

function cleanObject (obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null) {
        // Reflect.deleteProperty(obj, key)
        delete obj[key]
      }
    }
  }
  return obj
}

function eventProperties (e) {
  const target = e.target
  return cleanObject({
    tag: target.tagName.toLowerCase(),
    id: presence(target.id),
    'class': presence(target.className),
    page: page(),
    section: getClosestSection(target)
  })
}

function getClosestSection (element) {
  for (; element && element !== document; element = element.parentNode) {
    if (element.hasAttribute('data-section')) {
      return element.getAttribute('data-section')
    }
  }

  return null
}

function createVisit () {
  isReady = false

  visitId = ahoy.getVisitId()
  visitorId = ahoy.getVisitorId()
  track = getCookie('ahoy_track')

  if (config.cookies === false || config.trackVisits === false) {
    log('Visit tracking disabled')
    setReady()
  } else if (visitId && visitorId && !track) {
    // TODO keep visit alive?
    log('Active visit')
    setReady()
  } else {
    if (!visitId) {
      visitId = generateId()
      setCookie('ahoy_visit', visitId, visitTtl)
    }

    // make sure cookies are enabled
    if (getCookie('ahoy_visit')) {
      log('Visit started')

      if (!visitorId) {
        visitorId = generateId()
        setCookie('ahoy_visitor', visitorId, visitorTtl)
      }

      const data = {
        visit_token: visitId,
        visitor_token: visitorId,
        platform: config.platform,
        landing_page: window.location.href,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        js: true
      }

      // referrer
      if (document.referrer.length > 0) {
        data.referrer = document.referrer
      }

      log(data)

      sendRequest(visitsUrl(), data, function() {
        // wait until successful to destroy
        destroyCookie('ahoy_track')
        setReady()
      })
    } else {
      log('Cookies disabled')
      setReady()
    }
  }
}

ahoy.getVisitId = ahoy.getVisitToken = function() {
  return getCookie('ahoy_visit')
}

ahoy.getVisitorId = ahoy.getVisitorToken = function() {
  return getCookie('ahoy_visitor')
}

ahoy.reset = function() {
  destroyCookie('ahoy_visit')
  destroyCookie('ahoy_visitor')
  destroyCookie('ahoy_events')
  destroyCookie('ahoy_track')
  return true
}

ahoy.debug = function(enabled) {
  if (enabled === false) {
    destroyCookie('ahoy_debug')
  } else {
    setCookie('ahoy_debug', 't', 365 * 24 * 60) // 1 year
  }
  return true
}

ahoy.track = function(name, properties) {
  // generate unique id
  const event = {
    name: name,
    properties: properties || {},
    time: (new Date()).getTime() / 1000.0,
    id: generateId(),
    js: true
  }

  ready(function() {
    if (config.cookies && !ahoy.getVisitId()) {
      createVisit()
    }

    ready(function() {
      log(event)

      event.visit_token = ahoy.getVisitId()
      event.visitor_token = ahoy.getVisitorId()

      if (canTrackNow()) {
        trackEventNow(event)
      } else {
        eventQueue.push(event)
        saveEventQueue()

        // wait in case navigating to reduce duplicate events
        setTimeout(function() {
          trackEvent(event)
        }, 1000)
      }
    })
  })

  return true
}

ahoy.trackView = function(additionalProperties) {
  const properties = {
    url: window.location.href,
    title: document.title,
    page: page()
  }

  if (additionalProperties) {
    for (const propName in additionalProperties) {
      if (additionalProperties.hasOwnProperty(propName)) {
        properties[propName] = additionalProperties[propName]
      }
    }
  }
  ahoy.track('$view', properties)
}

ahoy.trackClicks = function() {
  onEvent('click', 'a, button, input[type=submit]', function(e) {
    const target = e.target
    const properties = eventProperties(e)
    properties.text = properties.tag == 'input' ? target.value : (target.textContent || target.innerText || target.innerHTML).replace(/[\s\r\n]+/g, ' ').trim()
    properties.href = target.href
    ahoy.track('$click', properties)
  })
}

ahoy.trackSubmits = function() {
  onEvent('submit', 'form', function(e) {
    const properties = eventProperties(e)
    ahoy.track('$submit', properties)
  })
}

ahoy.trackChanges = function() {
  onEvent('change', 'input, textarea, select', function(e) {
    const properties = eventProperties(e)
    ahoy.track('$change', properties)
  })
}

ahoy.trackAll = function() {
  ahoy.trackView()
  ahoy.trackClicks()
  ahoy.trackSubmits()
  ahoy.trackChanges()
}

// push events from queue
try {
  eventQueue = JSON.parse(getCookie('ahoy_events') || '[]')
} catch (e) {
  // do nothing
}

for (let i = 0; i < eventQueue.length; i++) {
  trackEvent(eventQueue[i])
}

ahoy.start = function() {
  createVisit()

  ahoy.start = function() {
  }
}

documentReady(function() {
  console.log('ahoy onready...')
  if (config.startOnReady) {
    ahoy.start()
  }
})

export default ahoy
