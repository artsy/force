(function () {
  'use strict'

  analytics.trackLink($('.search-result'), 'Selected item from results page', { query: $('#main-layout-search-bar-input').val() })

  analyticsHooks.on('search:header', function (data) {
    analytics.track(data.message, { query: data.query })
  })

  analyticsHooks.on('search:focus', function () {
    analytics.track('Focused on search input')
  })

  analyticsHooks.on('search:empty-item:click search:item:click', function (data) {
    analytics.track('Selected item from search', data)
  })
})()
