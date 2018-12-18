/* eslint-disable valid-jsdoc,no-undef,new-cap */
import defaultConfig from './config'
import Visit from './visit'
import generateId from './utils'
import Cookies from './cookies'
import objectToFormData from 'object-to-formdata'

import ahoy from '../ahoy'

/**
 * @param {Type}
 * @return {Type}
 */
class Ahoy {
  constructor (config) {
    this.config = Object.assign(defaultConfig, config)
    this.visit = new Visit(this.config)
    this.isReady = false
    this.queue = []
    this.canStringify = typeof (JSON) !== 'undefined' && typeof (JSON.stringify) !== 'undefined'
    this.eventQueue = []
  }

// cookies
  setCookie (name, value, ttl) {
    Cookies.set(name, value, ttl, this.config.cookieDomain || this.config.domain)
  }

  getCookie (name) {
    return Cookies.get(name)
  }

  destroyCookie (name) {
    Cookies.set(name, '', -1)
  }

  log (message) {
    if (getCookie('ahoy_debug')) {
      window.console.log(message)
    }
  }

  _visitsUrl () {
    return this.config.urlPrefix + this.config.visitsUrl
  }

  _eventsUrl () {
    return this.config.urlPrefix + this.config.eventsUrl
  }

  _page () {
    return this.config.apge || window.location.pathname
  }

  saveEventQueue () {
    if (this.config.cookies && this.canStringify) {
      Cookies.set('ahoy_events', JSON.stringify(this.eventQueue), 1)
    }
  }

  ready (callback) {
    if (this.isReady) {
      callback()
    } else {
      this.queue.push(callback)
    }
  }

  trackView (additionalProperties) {
    const properties = {
      url: window.local.href,
      title: document.title,
      page: this._page()
    }
  }

  eventData (event) {
    const data = {
      events: [event]
    }
    if (this.config.cookies) {
      data.visit_token = event.visit_token
      data.visitor_token = event.visitor_token
    }
    Reflect.deleteProperty(event, 'visit_token')
    Reflect.deleteProperty(event, 'visitor_token')
    // delete event.visit_token
    // delete event.visitor_token
    return data
  }

  /**
   * 事件跟踪
   * @param event
   */
  trackEvent (event) {
    this.ready(() => {
      this.sendRequest(this._eventsUrl(), this.eventData(event), () => {
        // remove from queue
        for (let i = 0; i < this.eventQueue.length; i++) {
          if (this.eventQueue[i].id === event.id) {
            this.eventQueue.splice(i, 1)
            break
          }
        }
        this.saveEventQueue()
      })
    })
  }

  trackEventNow (event) {
    this.ready(() => {
      const data = this.eventData(event)
      const param = this.csrfParam()
      const token = this.csrfToken()
      if (param && token) {
        data[param] = token
      }
      data.events_json = JSON.stringify(data.events)
      Reflect.deleteProperty(data, 'events')
      // http://newhtml.net/beacon-api/
      // Beacon API 的作用就是为了能让浏览器在类似unload这样的情况下成功发送请求，同时不影响下一个页面的载入
      window.navigator.sendBeacon(this._eventsUrl(), objectToFormData(data))
    })
  }

  /**
   * 跟踪
   * @param name
   * @param properties
   */
  track (name, properties) {
    // generate unique id
    const event = {
      name: name,
      properties: properties || {},
      time: (new Date()).getTime() / 1000.0,
      id: generateId(),
      js: true
    }
  }

// from rails-ujs
  csrfToken () {
    const meta = document.querySelector('meta[name=csrf-token]')
    return meta && meta.content
  }

  csrfParam () {
    const meta = document.querySelector('meta[name=csrf-param]')
    return meta && meta.content
  }

  CSRFProtection (xhr) {
    const token = this.csrfToken()
    if (token) xhr.setRequestHeader('X-CSRF-Token', token)
  }

  sendRequest (url, data, success) {
    if (this.canStringify) {
      if ($) {
        $.ajax({
          type: 'POST',
          url: url,
          data: JSON.stringify(data),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          beforeSend: this.CSRFProtection,
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
        this.CSRFProtection(xhr)
        xhr.send(JSON.stringify(data))
      }
    }
  }
}

export default Ahoy
