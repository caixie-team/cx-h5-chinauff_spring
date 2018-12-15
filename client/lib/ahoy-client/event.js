class Event {

  eventData (event) {
    const data = {
      events: [event]
    }
    if (config.cookies) {
      data.visit_token = event.visit_token
      data.visitor_token = event.visitor_token
    }

    delete event.visit_token
    delete event.visitor_token
    return data
  }

  trackEvent (event) {
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

  trackEventNow (event) {
    ready(function() {
      const data = eventData(event)
      const param = csrfParam()
      const token = csrfToken()
      if (param && token) data[param] = token
      // stringify so we keep the type
      data.events_json = JSON.stringify(data.events)
      delete data.events
      window.navigator.sendBeacon(eventsUrl(), objectToFormData(data))
    })
  }
}
