//
// Analytics code that needs to run before page load and analytics.ready
//

import { data as sd } from 'sharify'
import { reportLoadTimeToVolley } from 'lib/volley'

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

          reportLoadTimeToVolley(
            requestStart,
            loadEventEnd,
            domComplete,
            topLevelPath,
            'mobile'
          )
        }, 0)
      }
    })
  })
}
