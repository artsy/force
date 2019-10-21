require '../lib/analytics_hooks.coffee'
mediator = require '../lib/mediator.coffee'
setupSplitTests = require '../components/split_test/setup.coffee'
window._ = require 'underscore'
window.Cookies = require 'cookies-js'
Events = require('@artsy/reaction/dist/Utils/Events.js').default

# All Force mediator events can be hooked into for tracking purposes
mediator.on 'all', (name, data) ->
  analyticsHooks.trigger "mediator:#{name}", data

# All Reaction events are sent directly to Segment
Events.onEvent (data) =>
  # TODO: This is old schema
  if data.action
    # Send Reaction's read more as a page view
    if data.action is 'Clicked read more'
      pathname = data.pathname || location.pathname
      href = sd.APP_URL + '/' + pathname
      analytics.page(
        { path: pathname },
        { integrations: { Marketo: false }}
      )
      if window.PARSELY
        window.PARSELY.beacon.trackPageView
          url: href,
          js: 1,
          action_name: 'infinite'
      if window.Sailthru
        window.Sailthru.track
          domain: 'horizon.artsy.net',
          spider: true,
          track_url: true,
          url: href,
          use_stored_tags: true

      # Return early because we don't want to make a Segment call for read more
      return

    analytics.track data.action, _.omit data, 'action'
  else if data.action_type
    # New analytics schema
    analytics.track data.action_type, _.omit data, 'action_type'
  else
    console.error("Unknown analytics schema being used: #{JSON.stringify(data)}")

require '../analytics/main_layout.js'

$ -> analytics.ready ->

  if sd.CURRENT_USER?.id
    allowedlist = ['collector_level', 'default_profile_id', 'email', 'id', 'name', 'phone', 'type']
    traits = _.extend _.pick(sd.CURRENT_USER, allowedlist), session_id: sd.SESSION_ID
    analytics.identify sd.CURRENT_USER.id, traits, integrations: { 'Marketo': false }
    # clear analytics cache when user logs out
    analyticsHooks.on 'auth:logged-out', -> analytics.reset()

  setupSplitTests()

  require '../analytics/global.js'
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
  require '../analytics/consignments.js'
  require '../analytics/notifications.js'
  require '../analytics/artists.js'
  require '../analytics/artwork.js'
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
  require '../analytics/recently_viewed_artworks.js'
  require '../analytics/save.js'
  require '../analytics/eoy_2016.js'
  require '../analytics/embedded_inquiry.js'
  require '../analytics/inquiry_questionnaire.js'
  require '../analytics/editorial_features.js'
  require '../analytics/gallery_partnerships.js'
