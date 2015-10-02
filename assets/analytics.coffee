require '../lib/analytics_hooks.coffee'
mediator = require '../lib/mediator.coffee'
setupSplitTests = require '../components/split_test/setup.coffee'
route = require '../lib/route_helpers.coffee'
window._ = require 'underscore'

mediator.on 'all', -> analyticsHooks.trigger arguments...
require '../analytics/main_layout.js'
require '../analytics/before_ready.js'
$ -> analytics.ready ->
  setupSplitTests()

  require '../analytics/global.js'
  require '../analytics/impressions.js'
  require '../analytics/articles.js'
  require '../analytics/gallery_partnerships.js'
  require '../analytics/artworks_filter.js'
  require '../analytics/artist_page.js'
  require '../analytics/home.js'
  require '../analytics/show_page.js'
  require '../analytics/account_creation.js'

  if route.test(/^\/dev/) or route.test(/^\/artwork\/.*/)
    require '../analytics/embedded_inquiry.js'
    require '../analytics/inquiry_questionnaire.js'
