//
// Analytics code that needs to run before page load and analytics.ready
//

import { data as sd } from 'sharify'

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
    _.each(sd.TRACK_PAGELOAD_PATHS.split('|'), path => {
      if (window.location.pathname.split('/')[1] === path) {
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
        }, 0)
      }
    })
  })
}
