//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

import { data as sd } from 'sharify'
import { reportLoadTimeToVolley } from 'lib/volley'

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
    const pageType =
      window.sd.PAGE_TYPE || window.location.pathname.split('/')[1]
    if (sd.TRACK_PAGELOAD_PATHS.split('|').includes(pageType)) {
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
          pageType,
          'desktop'
        )
      }, 0)
    }
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
