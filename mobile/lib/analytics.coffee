#
# Simple wrapper around mixpanel to simplify common analytics actions.
# This should also provide a central place to put analytics logic when/if other
# services like Google Analytics are integrated.
#

_ = require 'underscore'
sd = require('sharify').data
_s = require 'underscore.string'

module.exports = (options = {}) =>
  { @mixpanel, @ga, @location } = options
  @location ?= window?.location
  @ga? 'create', sd.GOOGLE_ANALYTICS_ID, 'artsy.net'
  @mixpanel?.init sd.MIXPANEL_ID

module.exports.trackPageview = =>
  # Don't send pageviews for admins
  return if sd.CURRENT_USER?.type == 'Admin'

  @ga? 'send', 'pageview'

  # Track 15 second bounce rate
  setTimeout =>
    @ga? 'send', 'event', '15 Seconds', 'time on page more than 15 seconds'
  , 15000

  # Track 3 Minute bounce rate
  setTimeout =>
    @ga? 'send', 'event', '3 Minutes', 'time on page more than 3 minutes'
  , 180000

module.exports.registerCurrentUser = ->
  # Don't track admins
  return if sd.CURRENT_USER?.type == 'Admin'

  userType = if sd.CURRENT_USER then "Logged In" else "Logged Out"

  ga?('set', 'dimension1', userType)
  mixpanel?.register "User Type": userType

# This basically just sets some defaults loosely based on the
# Analytics wrapper class from Gravity
categories =
  impression: 'Impressions'
  hover: 'UI Interactions'
  click: 'UI Interactions'
  funnel: 'Funnel Progressions'
  segment: 'UI A/B Test Segments'
  error: 'UI Errors'
  multi: 'Multi-object Events'
  other: 'Other Events'

module.exports.track =
  _.reduce(Object.keys(categories), (memo, kind) ->
    memo[kind] = (description, options={}) ->

      # Don't send pageviews for admins
      return if sd.CURRENT_USER?.type == 'Admin'

      # Send mixpanel event
      unless typeof mixpanel is 'undefined'
        options.category = categories[kind] || categories.other

        _.defaults options,
          page: window?.location.pathname
          noninteraction: true

        if sd.CURRENT_USER?.id
          options.user_id = sd.CURRENT_USER.id

        mixpanel.track? description, options

      # Send google analytics event
      ga? 'send', 'event', options.category, description, options.label
    memo
  , {})

module.exports.modelNameAndIdToLabel = (modelName, id) ->
  throw new Error('Requires modelName and id') unless modelName? and id?
  "#{_s.capitalize(modelName)}:#{id}"

module.exports.modelToLabel = (model) ->
  throw new Error('Requires a backbone model') unless typeof model == 'object' and model?.constructor.name? and model?.get?('id')?
  "#{_s.capitalize(model.constructor.name)}:#{model.get('id')}"

module.exports.track_links = (args...) ->
  unless typeof mixpanel is 'undefined'
    mixpanel.track_links args...
