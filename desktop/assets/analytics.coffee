require '../lib/analytics_hooks.coffee'
mediator = require '../lib/mediator.coffee'
setupSplitTests = require '../components/split_test/setup.coffee'
route = require '../lib/route_helpers.coffee'
window._ = require 'underscore'
window.Cookies = require 'cookies-js'

mediator.on 'all', (name, data) ->
  analyticsHooks.trigger "mediator:#{name}", data

require '../analytics/main_layout.js'
require '../analytics/before_ready.js'

$ -> analytics.ready ->
  if sd.CURRENT_USER?.id
    whitelist = ['collector_level', 'default_profile_id', 'email', 'id', 'name', 'phone', 'type'];
    traits = _.extend _.pick(sd.CURRENT_USER, whitelist), session_id: sd.SESSION_ID
    analytics.identify sd.CURRENT_USER.id, traits
    # clear analytics cache when user logs out
    analyticsHooks.on 'auth:logged-out', -> analytics.reset()

  setupSplitTests()

  require '../analytics/global.js'
  require '../analytics/impressions.js'
  require '../analytics/articles.js'
  require '../analytics/article_impressions.js'
  require '../analytics/partner_application.js'
  require '../analytics/artworks_filter.js'
  require '../analytics/artist_page.js'
  require '../analytics/home.js'
  require '../analytics/contact.js'
  require '../analytics/show_page.js'
  require '../analytics/account_creation.js'
  require '../analytics/account_login.js'
  require '../analytics/bidding.js'
  require '../analytics/collect.js'
  require '../analytics/criteo.js'
  require '../analytics/notifications.js'
  require '../analytics/artists.js'
  require '../analytics/artwork.js'
  require '../analytics/artwork_purchase.js'
  require '../analytics/fair.js'
  require '../analytics/following.js'
  require '../analytics/follow_widget.js'
  require '../analytics/genes.js'
  require '../analytics/partner.js'
  require '../analytics/checkout.js'
  require '../analytics/personalize.js'
  require '../analytics/search.js'
  require '../analytics/auth.js'
  require '../analytics/layered_search.js'
  require '../analytics/artwork_rail.js'
  require '../analytics/galleries.js'
  require '../analytics/pro_buyer.js'
  require '../analytics/recently_viewed_artworks.js'
  require '../analytics/save.js'
  require '../analytics/eoy_2016.js'
  require '../analytics/embedded_inquiry.js'
  require '../analytics/inquiry_questionnaire.js'
  require '../analytics/editorial_features.js'
  require '../analytics/collect_art.js'
