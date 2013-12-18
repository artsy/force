#
# Simple wrapper around mixpanel to simplify common analytics actions.
# This should also provide a central place to put analytics logic when/if other
# services like Google Analytics are integrated.
#

_   = require 'underscore'
sd  = require('sharify').data

_.mixin(require 'underscore.string')

module.exports = (options) =>
  { @mixpanel, @ga, @location } = options
  @location ?= window?.location
  @ga? 'create', sd.GOOGLE_ANALYTICS_ID, 'artsy.net'
  @mixpanel?.init sd.MIXPANEL_ID

module.exports.trackPageview = =>
  @ga? 'send', 'pageview'
  @mixpanel?.track? 'Viewed page', { path: @location.pathname }

# This basically just sets some defaults loosely based on the
# Analytics wrapper class from Gravity
categories =
  impression: 'Impressions'
  hover:      'UI Interactions'
  click:      'UI Interactions'
  funnel:     'Funnel Progressions'
  segment:    'UI A/B Test Segments'
  error:      'UI Errors'
  multi:      'Multi-object Events'
  other:      'Other Events'

module.exports.track =
  _.reduce(Object.keys(categories), (memo, kind) ->
    memo[kind] = (description, options) ->

      # Send mixpanel event
      unless typeof mixpanel is 'undefined'
        options.category  = categories[kind] || categories.other

        _.defaults options,
          page: window?.location.pathname
          noninteraction: true

        mixpanel.track description, options

      # Send google analytics event
      ga? 'send', 'event', options.category, description, options.label

    memo
  , {})

module.exports.track_links = (args...) ->
  unless typeof mixpanel is 'undefined'
    mixpanel.track_links args...
