/* eslint-disable no-undef */
import EventBus from '../utils/event-bus.js'
// import axios from 'axios'

class Tracker {
  constructor () {
    this.isTracking = true
    this.isLogging = false
    this.observe()
  }

  send (data = {}) {
    if (this.isTracking) {
      window.dataLayer = window.dataLayer || []
      dataLayer.push(data)
      // 发送数据到后台。。。。。
      // axios.post('http://backoffice.caixie.top', data)
      //   .then(response => {})
      //   .catch(err => {
      //   })
    }

    if (this.isLogging) {
      // console.log('Tracking.send()', data)
    }
  }

  observe () {
    // GENERAL PAGE LOAD
    EventBus.$on('page-view', (e) => {
      this.send({
        'event': 'pv',
        'pagePath': e.path,
        'tileText': null,
        'eventCategory': null,
        'eventAction': null,
        'eventLabel': null,
        'tilePosition': null
      })
    })

    // INTRO EXAMPLE
    EventBus.$on('intro-example', (e) => {
      this.send({
        'event': 'virtualPageload',
        'pagePath': `/intro/example/${e.index + 1}`,
        'tileText': null,
        'eventCategory': null,
        'eventAction': null,
        'eventLabel': null,
        'tilePosition': null
      })
    })

    // INTRO STEP
    EventBus.$on('intro-step', (e) => {
      this.send({
        'event': 'virtualPageload',
        'pagePath': `/intro/step/${e.index + 1}`,
        'tileText': null,
        'eventCategory': null,
        'eventAction': null,
        'eventLabel': null,
        'tilePosition': null
      })
    })

    // INTRO SKIP
    EventBus.$on('intro-skip', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': `/intro/step/${e.index + 1}`,
        'tileText': null,
        'eventCategory': 'intro step animation',
        'eventAction': 'click',
        'eventLabel': 'skip',
        'tilePosition': null
      })
    })

    // PAGE APPLET
    EventBus.$on('page-applet', (e) => {
      this.send({
        'event': 'virtualPageload',
        'pagePath': '/applet',
        'tileText': null,
        'eventCategory': null,
        'eventAction': null,
        'eventLabel': null,
        'tilePosition': null
      })
    })

    // APPLET CUSTOMIZE
    EventBus.$on('applet-customize', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/applet',
        'tileText': null,
        'eventCategory': 'intro step animation',
        'eventAction': 'click',
        'eventLabel': 'customize this applet on IFTTT.com',
        'tilePosition': null
      })
    })

    // CLICK TO START BROWSING
    EventBus.$on('click-to-start-browsing', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/applet',
        'tileText': null,
        'eventCategory': 'intro step animation',
        'eventAction': 'click',
        'eventLabel': 'click to start browsing',
        'tilePosition': null
      })
    })

    // LOGO CLICK
    EventBus.$on('logo-click', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'dominos logo',
        'tilePosition': null
      })
    })

    // NAV OPEN
    EventBus.$on('nav-open', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'open nav',
        'tilePosition': null
      })
    })

    // NAV CLOSE
    EventBus.$on('nav-close', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'close nav',
        'tilePosition': null
      })
    })

    // NAV CLICK TUTORIAL
    EventBus.$on('nav-click-tutorial', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'tutorial',
        'tilePosition': null
      })
    })

    // NAV CLICK BROWSE APPLETS
    EventBus.$on('nav-click-browse-applets', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'browse applets',
        'tilePosition': null
      })
    })

    // NAV CLICK FAQS
    EventBus.$on('nav-click-faqs', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'faqs',
        'tilePosition': null
      })
    })

    // NAV CLICK CREATE
    EventBus.$on('nav-click-create', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'create your own applet on IFTTT.com',
        'tilePosition': null
      })
    })

    // NAV CLICK HUNGRY
    EventBus.$on('nav-click-hungry', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'Hungry? Order at Dominos.com',
        'tilePosition': null
      })
    })

    // NAV CLICK IFTTT
    EventBus.$on('nav-click-ifttt', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': window.app.getCurrentPath(),
        'tileText': null,
        'eventCategory': 'nav menu',
        'eventAction': 'click',
        'eventLabel': 'powered by IFTTT.com',
        'tilePosition': null
      })
    })

    // PAGE BROWSE
    EventBus.$on('page-browse', (e) => {
      this.send({
        'event': 'virtualPageload',
        'pagePath': '/browse',
        'tileText': null,
        'eventCategory': null,
        'eventAction': null,
        'eventLabel': null,
        'tilePosition': null
      })
    })

    // BROWSE CLICK APPLET
    EventBus.$on('browse-click-applet', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': e.text,
        'eventCategory': 'tile',
        'eventAction': 'click',
        'eventLabel': 'open',
        'tilePosition': null
      })
    })

    // BROWSE CLICK SET UP APPLET
    EventBus.$on('browse-click-set-up-applet', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': e.text,
        'eventCategory': 'tile',
        'eventAction': 'click',
        'eventLabel': 'set up this applet on IFTTT.com',
        'tilePosition': null
      })
    })

    // BROWSE CLICK CLOSE APPLET
    EventBus.$on('browse-click-close-applet', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': e.text,
        'eventCategory': 'tile',
        'eventAction': 'click',
        'eventLabel': 'close',
        'tilePosition': null
      })
    })

    // BROWSE CLICK SEARCH BAR
    EventBus.$on('browse-click-search-bar', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': null,
        'eventCategory': 'applet browse page',
        'eventAction': 'click',
        'eventLabel': 'search bar',
        'tilePosition': null
      })
    })

    // BROWSE SUBMIT SEARCH
    EventBus.$on('browse-submit-search', (e) => {
      this.send({
        'event': 'searchSubmit',
        'pagePath': '/browse',
        'tileText': null,
        'eventCategory': 'applet browse page',
        'eventAction': 'submit',
        'eventLabel': 'submit search',
        'searchTerm': e.text,
        'tilePosition': null
      })
    })

    // BROWSE CLICK BACK
    EventBus.$on('browse-click-back', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': null,
        'eventCategory': 'applet search results',
        'eventAction': 'click',
        'eventLabel': 'back to browse',
        'tilePosition': null
      })
    })

    // BROWSE CLICK CREATE
    EventBus.$on('browse-click-create', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': null,
        'eventCategory': 'center',
        'eventAction': 'click',
        'eventLabel': 'create your own on IFTTT.com',
        'tilePosition': null
      })
    })

    // BROWSE CLICK SET UP
    EventBus.$on('browse-click-set-up', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': null,
        'eventCategory': 'center',
        'eventAction': 'click',
        'eventLabel': 'set up your dominos easy order',
        'tilePosition': null
      })
    })

    // BROWSE EMPTY CLICK CREATE
    EventBus.$on('browse-empty-click-create', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': null,
        'eventCategory': 'search results page',
        'eventAction': 'click',
        'eventLabel': 'create your own on IFTTT.com',
        'tilePosition': null
      })
    })

    // BROWSE EMPTY CLICK SET UP
    EventBus.$on('browse-empty-click-set-up', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/browse',
        'tileText': null,
        'eventCategory': 'search results page',
        'eventAction': 'click',
        'eventLabel': 'set up your dominos easy order',
        'tilePosition': null
      })
    })

    // PAGE FAQS
    EventBus.$on('page-faqs', (e) => {
      this.send({
        'event': 'virtualPageload',
        'pagePath': '/faqs',
        'tileText': null,
        'eventCategory': null,
        'eventAction': null,
        'eventLabel': null,
        'tilePosition': null
      })
    })

    // FAQS CLICK QUESTION
    EventBus.$on('faqs-click-question', (e) => {
      this.send({
        'event': 'customEvent',
        'pagePath': '/faqs',
        'tileText': null,
        'eventCategory': 'faqs',
        'eventAction': 'click',
        'eventLabel': e.text,
        'tilePosition': null
      })
    })

  }
}

export default new Tracker()

