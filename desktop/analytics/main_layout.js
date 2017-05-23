//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

// Track pageview
analytics.page({path: location.pathname}, {integrations: {'Marketo': false}})

// Track 15 second bounce rate
setTimeout(function () {
  analytics.track('time on page more than 15 seconds', { category: '15 Seconds', message: sd.CURRENT_PATH })
}, 15000)

// Track 3 Minute bounce rate
setTimeout(function () {
  analytics.track('time on page more than 3 minutes', { category: '3 Minutes', message: sd.CURRENT_PATH })
}, 180000)

// debug tracking calls in development
if (sd.NODE_ENV !== 'production') {
  analytics.on('track', function () {
    console.debug('TRACKED: ', arguments[0], JSON.stringify(arguments[1]))
  })
}
if (sd.NODE_ENV === 'development') {
  analyticsHooks.on('all', function (name, data) {
    console.info('ANALYTICS HOOK: ', name, data)
  })
}
