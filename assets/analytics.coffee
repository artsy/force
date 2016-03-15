require '../lib/analytics_hooks.coffee'
mediator = require '../lib/mediator.coffee'
setupSplitTests = require '../components/split_test/setup.coffee'
route = require '../lib/route_helpers.coffee'
window._ = require 'underscore'

mediator.on 'all', (name, data) ->
  analyticsHooks.trigger "mediator:#{name}", data

require '../analytics/main_layout.js'
require '../analytics/before_ready.js'

$ -> analytics.ready ->
  setupSplitTests()

  whitelist = ['collector_level', 'default_profile_id', 'email', 'id', 'name', 'phone', 'type']
  traits = _.extend _.pick(sd.CURRENT_USER, whitelist), session_id: sd.SESSION_ID

  analytics.identify null, traits

  require '../analytics/global.js'
  require '../analytics/impressions.js'
  require '../analytics/articles.js'
  require '../analytics/partner_application.js'
  require '../analytics/artworks_filter.js'
  require '../analytics/artist_page.js'
  require '../analytics/home.js'
  require '../analytics/show_page.js'
  require '../analytics/account_creation.js'
  require '../analytics/account_login.js'
  require '../analytics/bidding.js'
  require '../analytics/notifications.js'
  require '../analytics/artists.js'
  require '../analytics/artwork.js'
  require '../analytics/fair.js'
  require '../analytics/following.js'
  require '../analytics/partner.js'
  require '../analytics/checkout.js'
  require '../analytics/personalize.js'
  require '../analytics/search.js'
  require '../analytics/auth.js'
  require '../analytics/layered_search.js'
  require '../analytics/artwork_rail.js'
  require '../analytics/commercial_filtering.js'

  if route.test(/^\/inquiry\/.*/) or route.test(/^\/artwork\/.*/)
    require '../analytics/embedded_inquiry.js'
    require '../analytics/inquiry_questionnaire.js'
