//
// Analytics code that needs to run before page load and analytics.ready
//

import { data as sd } from 'sharify'
import request from 'superagent'

// Disable Parsely firing on non-article/section pages
if (!location.pathname.match(/^\/article/)) {
  window.PARSELY = { autotrack: false }
}

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
                      'device-type:mobile',
                      'mark:dom-complete',
                    ],
                  },
                  {
                    type: 'timing',
                    name: 'load-time',
                    timing: loadEventEnd - requestStart,
                    tags: [
                      `page-type:${topLevelPath}`,
                      'device-type:mobile',
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
