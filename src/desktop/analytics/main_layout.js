//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

import { data as sd } from 'sharify'
import request from 'superagent'

// Track pageview
analytics.page(
  { path: location.pathname },
  { integrations: { Marketo: false } }
)

// Track pageload speed
if (
  window.performance &&
  window.performance.timing &&
  sd.TRACK_PAGELOAD_PATHS
) {
  window.addEventListener('load', function() {
    const topLevelPath = window.location.pathname.split('/')[1]
    _.each(sd.TRACK_PAGELOAD_PATHS.split('|'), path => {
      if (topLevelPath === path) {
        window.setTimeout(function() {
          const {
            requestStart,
            loadEventEnd,
            domComplete,
          } = window.performance.timing

          analytics.track('Page load time', {
            requestStart,
            loadEventEnd,
            domComplete,
            nonInteraction: 1,
          })

          if (sd.VOLLEY_ENDPOINT) {
            request
              .post(sd.VOLLEY_ENDPOINT)
              .send({
                serviceName: 'force',
                metrics: [
                  {
                    type: 'timing',
                    name: 'load-time',
                    timing: domComplete - requestStart,
                    tags: [
                      `page-type:${topLevelPath}`,
                      'device-type:desktop',
                      'mark:dom-complete',
                    ],
                  },
                  {
                    type: 'timing',
                    name: 'load-time',
                    timing: loadEventEnd - requestStart,
                    tags: [
                      `page-type:${topLevelPath}`,
                      'device-type:desktop',
                      'mark:load-event-end',
                    ],
                  },
                ],
              })
              .end()
          }
        }, 0)
      }
    })
  })
}

// Track 15 second bounce rate
setTimeout(function() {
  analytics.track('Time on page', {
    category: '15 Seconds',
    message: sd.CURRENT_PATH,
  })
}, 15000)

// Track 30 second bounce rate
setTimeout(function() {
  analytics.track('Time on page', {
    category: '30 Seconds',
    message: sd.CURRENT_PATH,
  })
}, 30000)

// Track 1 min bounce rate
setTimeout(function() {
  analytics.track('Time on page', {
    category: '1 Minute',
    message: sd.CURRENT_PATH,
  })
}, 60000)

// Track 3 Minute bounce rate
setTimeout(function() {
  analytics.track('Time on page', {
    category: '3 Minutes',
    message: sd.CURRENT_PATH,
  })
}, 180000)

// debug tracking calls
if (sd.SHOW_ANALYTICS_CALLS) {
  analytics.on('track', function() {
    console.info('TRACKED: ', arguments[0], JSON.stringify(arguments[1]))
  })
}

if (sd.SHOW_ANALYTICS_CALLS) {
  analyticsHooks.on('all', function(name, data) {
    console.info('ANALYTICS HOOK: ', name, data)
  })
}
